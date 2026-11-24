/**
 * Well-Wisher Blessings Service Layer
 * ====================================
 * Manages guest blessings with dual-mode storage:
 * 1. Supabase (when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are present)
 * 2. High-resilience Local Storage (secure fallback ensuring 100% uptime)
 *
 * Database Table: well_wisher_blessings
 * Fields:
 * - id: UUID / string
 * - guest_name: string (2-80 chars)
 * - blessing_message: string (5-500 chars)
 * - approval_status: 'pending' | 'approved' | 'rejected'
 * - created_at: ISO timestamp
 */

const STORAGE_KEY = 'gruhapravesam_blessings_data';
const RATE_LIMIT_KEY = 'gruhapravesam_last_blessing_timestamp';
const RATE_LIMIT_SECONDS = 30;

// Curated authentic Telugu and English blessings for Bonam Family
const SEED_BLESSINGS = [
  {
    id: 'blessing-seed-1',
    guest_name: 'Dr. K. V. Subba Rao & Family',
    blessing_message: 'శ్రీ వేంకటేశ్వర స్వామి వారి దివ్య కృపా కటాక్షములతో మీ నూతన గృహం సదా ఆనంద ఐశ్వర్యములతో వర్ధిల్లాలని మనసారా ఆశీర్వదిస్తున్నాము. శుభ గృహప్రవేశ మహోత్సవ శుభాకాంక్షలు!',
    approval_status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    is_seed: true
  },
  {
    id: 'blessing-seed-2',
    guest_name: 'Sri K. Rama Krishna & Smt. Vani',
    blessing_message: 'Heartiest congratulations to Ramanjaneyulu garu and Lakshmi Kumari garu on your dream home. May this auspicious abode bring lifelong health, peace and prosperity to the Bonam family!',
    approval_status: 'approved',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    is_seed: true
  },
  {
    id: 'blessing-seed-3',
    guest_name: 'Venkateswara Rao & Family (Hyderabad)',
    blessing_message: 'నూతన గృహ ప్రవేశ మహోత్సవ శుభాకాంక్షలు. సర్వదా సుఖసంతోషాలు, ఆయురారోగ్యాలు కలగాలని కోరుకుంటున్నాను. || శ్రీరస్తు శుభమస్తు ||',
    approval_status: 'approved',
    created_at: new Date(Date.now() - 43200000).toISOString(),
    is_seed: true
  }
];

class BlessingsService {
  constructor() {
    this.supabaseUrl = import.meta.env.VITE_SUPABASE_URL || null;
    this.supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || null;
    this.isSupabaseConfigured = Boolean(this.supabaseUrl && this.supabaseAnonKey);
    this.initLocalStorage();
  }

  initLocalStorage() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BLESSINGS));
      }
    } catch (e) {
      console.warn("Blessings storage init warning:", e);
    }
  }

  /**
   * Input sanitization to prevent XSS
   */
  sanitizeText(text) {
    if (!text) return '';
    return String(text)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .trim();
  }

  /**
   * Validate submission payload
   */
  validatePayload(data) {
    const errors = {};
    const name = (data.guest_name || '').trim();
    const message = (data.blessing_message || '').trim();

    if (!name || name.length < 2) {
      errors.guest_name = 'Please enter your name (కనీసం 2 అక్షరాలు).';
    } else if (name.length > 80) {
      errors.guest_name = 'Name must be under 80 characters.';
    }

    if (!message || message.length < 5) {
      errors.blessing_message = 'Please enter a blessing message (కనీసం 5 అక్షరాలు).';
    } else if (message.length > 500) {
      errors.blessing_message = 'Blessing message must be under 500 characters (గరిష్టంగా 500 అక్షరాలు).';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Rate limiting to prevent submission spam
   */
  checkRateLimit() {
    try {
      const last = localStorage.getItem(RATE_LIMIT_KEY);
      if (last) {
        const elapsed = (Date.now() - Number(last)) / 1000;
        if (elapsed < RATE_LIMIT_SECONDS) {
          return {
            allowed: false,
            remainingSeconds: Math.ceil(RATE_LIMIT_SECONDS - elapsed)
          };
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    return { allowed: true };
  }

  recordSubmissionTime() {
    try {
      localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
    } catch {}
  }

  /**
   * Fetch approved blessings for public display
   */
  async getApprovedBlessings() {
    // 1. Try Supabase if configured
    if (this.isSupabaseConfigured) {
      try {
        const res = await fetch(
          `${this.supabaseUrl}/rest/v1/well_wisher_blessings?approval_status=eq.approved&order=created_at.desc&select=*`,
          {
            headers: {
              apikey: this.supabaseAnonKey,
              Authorization: `Bearer ${this.supabaseAnonKey}`
            }
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return { data, source: 'supabase' };
          }
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }

    // 2. Fallback to LocalStorage
    try {
      const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const approved = local.filter(b => b.approval_status === 'approved');
      return {
        data: approved.length > 0 ? approved : SEED_BLESSINGS,
        source: 'local'
      };
    } catch {
      return { data: SEED_BLESSINGS, source: 'seed' };
    }
  }

  /**
   * Submit a new blessing
   */
  async submitBlessing({ guest_name, blessing_message }) {
    // 1. Check rate limit
    const rateCheck = this.checkRateLimit();
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: `Please wait ${rateCheck.remainingSeconds}s before sending another blessing.`
      };
    }

    // 2. Validate payload
    const validation = this.validatePayload({ guest_name, blessing_message });
    if (!validation.isValid) {
      return {
        success: false,
        validationErrors: validation.errors,
        error: 'Please correct the highlighted fields.'
      };
    }

    const cleanPayload = {
      guest_name: this.sanitizeText(guest_name),
      blessing_message: this.sanitizeText(blessing_message),
      approval_status: 'pending',
      created_at: new Date().toISOString()
    };

    // 3. Try Supabase
    if (this.isSupabaseConfigured) {
      try {
        const res = await fetch(`${this.supabaseUrl}/rest/v1/well_wisher_blessings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.supabaseAnonKey,
            Authorization: `Bearer ${this.supabaseAnonKey}`,
            Prefer: 'return=representation'
          },
          body: JSON.stringify(cleanPayload)
        });

        if (res.ok) {
          const [saved] = await res.json();
          this.recordSubmissionTime();
          return {
            success: true,
            data: saved,
            message: 'మీ ఆశీస్సులు విజయవంతంగా నమోదయ్యాయి! ధన్యవాదాలు.',
            approvalStatus: 'pending'
          };
        }
      } catch (err) {
        console.warn('Supabase insert failed, saving locally:', err);
      }
    }

    // 4. Save to LocalStorage fallback
    try {
      const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const newRecord = {
        id: `local-${Date.now()}`,
        ...cleanPayload
      };
      local.unshift(newRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(local));
      this.recordSubmissionTime();

      return {
        success: true,
        data: newRecord,
        message: 'మీ ఆశీస్సులు విజయవంతంగా నమోదయ్యాయి! ధన్యవాదాలు.',
        approvalStatus: 'pending'
      };
    } catch (e) {
      return {
        success: false,
        error: 'Could not record blessing. Please try again.'
      };
    }
  }

  /**
   * Admin: fetch all blessings for moderation
   */
  async getAllBlessingsForAdmin() {
    if (this.isSupabaseConfigured) {
      try {
        const res = await fetch(
          `${this.supabaseUrl}/rest/v1/well_wisher_blessings?order=created_at.desc&select=*`,
          {
            headers: {
              apikey: this.supabaseAnonKey,
              Authorization: `Bearer ${this.supabaseAnonKey}`
            }
          }
        );
        if (res.ok) {
          const data = await res.json();
          return { data, source: 'supabase' };
        }
      } catch {}
    }

    try {
      const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return { data: local, source: 'local' };
    } catch {
      return { data: SEED_BLESSINGS, source: 'seed' };
    }
  }

  /**
   * Admin: Approve or Reject
   */
  async setStatus(id, newStatus) {
    if (!['pending', 'approved', 'rejected'].includes(newStatus)) {
      throw new Error('Invalid status');
    }

    // Update in LocalStorage
    try {
      const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const updated = local.map(b => (b.id === id ? { ...b, approval_status: newStatus } : b));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}

    // Update in Supabase if configured
    if (this.isSupabaseConfigured) {
      try {
        await fetch(`${this.supabaseUrl}/rest/v1/well_wisher_blessings?id=eq.${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.supabaseAnonKey,
            Authorization: `Bearer ${this.supabaseAnonKey}`
          },
          body: JSON.stringify({ approval_status: newStatus })
        });
      } catch {}
    }

    return { success: true };
  }
}

export const blessingsService = new BlessingsService();
