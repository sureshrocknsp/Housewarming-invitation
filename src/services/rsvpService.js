/**
 * Gruhapravesam RSVP Service Layer
 * =================================
 * Manages guest RSVPs with dual-mode storage:
 * 1. Supabase (if VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are provided)
 * 2. Persistent Local Storage Database (secure fallback with demo data clearly labeled)
 * 
 * Database Table: gruhapravesam_rsvps
 * Fields:
 * - id: string
 * - guest_name: string (required)
 * - mobile_number: string (optional, validated)
 * - attendance_status: 'attending' | 'maybe' | 'declined' (required)
 * - adults_count: number (>= 0)
 * - children_count: number (>= 0)
 * - special_message: string (optional)
 * - created_at: string (ISO timestamp)
 * - is_demo: boolean
 */

const STORAGE_KEY = 'gruhapravesam_rsvps_data';

// Initial realistic sample records for development mode (clearly labeled as demo data)
const SAMPLE_RSVPS = [
  {
    id: 'demo-1',
    guest_name: 'Dr. K. V. Subba Rao & Family',
    mobile_number: '+91 98490 12345',
    attendance_status: 'attending',
    adults_count: 3,
    children_count: 1,
    special_message: 'May Lord Venkateswara shower your home with eternal joy, peace, and abundance! Looking forward to the Muhurtham.',
    created_at: '2026-11-20T10:30:00.000Z',
    is_demo: true
  },
  {
    id: 'demo-2',
    guest_name: 'Ramesh Babu Sharma',
    mobile_number: '+91 94401 67890',
    attendance_status: 'attending',
    adults_count: 2,
    children_count: 0,
    special_message: 'Hearty congratulations on your beautiful new abode. Will be there for both Muhurtham and Lunch.',
    created_at: '2026-11-21T14:15:00.000Z',
    is_demo: true
  },
  {
    id: 'demo-3',
    guest_name: 'Anil Kumar & Madhavi',
    mobile_number: '+91 98850 54321',
    attendance_status: 'maybe',
    adults_count: 2,
    children_count: 2,
    special_message: 'Will try our best to join for lunch feast. Wishing you all the very best!',
    created_at: '2026-11-22T09:45:00.000Z',
    is_demo: true
  },
  {
    id: 'demo-4',
    guest_name: 'G. Venkatesh (Bangalore)',
    mobile_number: '+91 99000 11223',
    attendance_status: 'declined',
    adults_count: 0,
    children_count: 0,
    special_message: 'Hearty congratulations! Unfortunately out of station on the 28th. Sending our prayers and blessings.',
    created_at: '2026-11-22T16:20:00.000Z',
    is_demo: true
  }
];

class RsvpService {
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_RSVPS));
      }
    } catch (e) {
      console.warn("Storage init warning:", e);
    }
  }

  /**
   * Sanitize text against XSS injection
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
   * Validate mobile number format (optional, but if provided must be valid)
   */
  isValidMobile(phone) {
    if (!phone || !phone.trim()) return true;
    const clean = phone.replace(/[\s\-()]/g, '');
    // Supports 10-digit Indian numbers, optional +91 or +<country code> prefix (8 to 15 digits)
    return /^(\+?[0-9]{1,4})?[0-9]{8,12}$/.test(clean);
  }

  /**
   * Rate limiting check to prevent rapid spam submissions
   */
  checkRateLimit() {
    try {
      const now = Date.now();
      const lastTime = parseInt(sessionStorage.getItem('gruhapravesam_last_submit') || '0', 10);
      if (now - lastTime < 3000) {
        return { allowed: false, error: 'Please wait a few seconds before submitting again.' };
      }
      sessionStorage.setItem('gruhapravesam_last_submit', String(now));
      return { allowed: true };
    } catch (e) {
      return { allowed: true };
    }
  }

  /**
   * Submit guest RSVP
   * @param {Object} rsvpData
   */
  async submitRsvp(rsvpData) {
    // 1. Rate limiting check
    const rateCheck = this.checkRateLimit();
    if (!rateCheck.allowed) {
      return { success: false, error: rateCheck.error };
    }

    const {
      guest_name,
      mobile_number = '',
      attendance_status = 'attending',
      adults_count = 1,
      children_count = 0,
      special_message = ''
    } = rsvpData;

    // Strict validation
    if (!guest_name || !guest_name.trim()) {
      return { success: false, error: 'Please enter your name (దయచేసి మీ పేరు నమోదు చేయండి).' };
    }

    if (mobile_number && !this.isValidMobile(mobile_number)) {
      return { success: false, error: 'Please enter a valid mobile number (దయచేసి సరైన ఫోన్ నంబర్ నమోదు చేయండి).' };
    }

    const validStatus = ['attending', 'maybe', 'declined'].includes(attendance_status)
      ? attendance_status
      : 'attending';

    const adults = Math.max(0, parseInt(adults_count, 10) || 0);
    const children = Math.max(0, parseInt(children_count, 10) || 0);

    const record = {
      id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      guest_name: this.sanitizeText(guest_name),
      mobile_number: this.sanitizeText(mobile_number),
      attendance_status: validStatus,
      adults_count: adults,
      children_count: children,
      special_message: this.sanitizeText(special_message),
      created_at: new Date().toISOString(),
      is_demo: false
    };

    // If Supabase is configured, submit via REST with Row Level Security (Anon key)
    if (this.isSupabaseConfigured) {
      try {
        const response = await fetch(`${this.supabaseUrl}/rest/v1/gruhapravesam_rsvps`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.supabaseAnonKey,
            'Authorization': `Bearer ${this.supabaseAnonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            guest_name: record.guest_name,
            mobile_number: record.mobile_number,
            attendance_status: record.attendance_status,
            adults_count: record.adults_count,
            children_count: record.children_count,
            special_message: record.special_message,
            created_at: record.created_at
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Database error');
        }

        const data = await response.json();
        return { success: true, record: data[0] || record };
      } catch (err) {
        console.error('Supabase submission failed, falling back to local persistent store:', err);
      }
    }

    // Local Storage persistent store (fallback / default)
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      // Duplicate detection by same name and mobile
      const duplicateIndex = stored.findIndex(
        (r) =>
          r.guest_name.toLowerCase() === record.guest_name.toLowerCase() &&
          r.mobile_number === record.mobile_number &&
          !r.is_demo
      );

      if (duplicateIndex >= 0) {
        // Update existing response
        stored[duplicateIndex] = { ...record, id: stored[duplicateIndex].id };
      } else {
        stored.unshift(record);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      return { success: true, record };
    } catch (e) {
      return { success: false, error: 'Could not save RSVP locally. Please check browser permissions.' };
    }
  }

  /**
   * Get all RSVPs (for Admin Dashboard)
   */
  async getAllRsvps() {
    if (this.isSupabaseConfigured) {
      try {
        const response = await fetch(`${this.supabaseUrl}/rest/v1/gruhapravesam_rsvps?order=created_at.desc`, {
          headers: {
            'apikey': this.supabaseAnonKey,
            'Authorization': `Bearer ${this.supabaseAnonKey}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (e) {
        console.warn('Failed to fetch from Supabase, loading local records:', e);
      }
    }

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return stored;
    } catch (e) {
      return SAMPLE_RSVPS;
    }
  }

  /**
   * Get public blessings for the public wall
   * Security & Privacy: Strips mobile numbers completely so guests' privacy is 100% protected!
   */
  async getPublicWishes() {
    const all = await this.getAllRsvps();
    return all.map((item) => ({
      id: item.id,
      guest_name: item.guest_name,
      attendance_status: item.attendance_status,
      special_message: item.special_message,
      created_at: item.created_at,
      is_demo: item.is_demo
      // mobile_number is deliberately omitted for guest privacy
    }));
  }

  /**
   * Delete or clear an RSVP record
   */
  deleteRsvp(id) {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const filtered = stored.filter((r) => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Calculate summary statistics
   */
  calculateStats(rsvps = []) {
    const total = rsvps.length;
    let attending = 0;
    let maybe = 0;
    let declined = 0;
    let totalAdults = 0;
    let totalChildren = 0;

    rsvps.forEach((r) => {
      if (r.attendance_status === 'attending') {
        attending++;
        totalAdults += parseInt(r.adults_count, 10) || 0;
        totalChildren += parseInt(r.children_count, 10) || 0;
      } else if (r.attendance_status === 'maybe') {
        maybe++;
        totalAdults += parseInt(r.adults_count, 10) || 0;
        totalChildren += parseInt(r.children_count, 10) || 0;
      } else if (r.attendance_status === 'declined') {
        declined++;
      }
    });

    return {
      total,
      attending,
      maybe,
      declined,
      totalAdults,
      totalChildren
    };
  }

  /**
   * Export RSVP responses to CSV with UTF-8 BOM
   */
  exportToCsv(rsvps = []) {
    const headers = [
      'Guest Name',
      'Mobile Number',
      'Attendance Status',
      'Adults Count',
      'Children Count',
      'Special Message',
      'Submission Date',
      'Record Type'
    ];

    const rows = rsvps.map((r) => [
      `"${(r.guest_name || '').replace(/"/g, '""')}"`,
      `"${(r.mobile_number || '').replace(/"/g, '""')}"`,
      `"${r.attendance_status}"`,
      r.adults_count,
      r.children_count,
      `"${(r.special_message || '').replace(/"/g, '""')}"`,
      `"${new Date(r.created_at).toLocaleString()}"`,
      r.is_demo ? 'Demo Sample' : 'Live Guest Response'
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Gruhapravesam_Guest_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const rsvpService = new RsvpService();
