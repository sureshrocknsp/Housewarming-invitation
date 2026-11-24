import React, { useState, useEffect } from 'react';
import { gruhapravesamConfig } from '../../config/gruhapravesamConfig';
import { useLanguage } from '../../context/LanguageContext';
import { blessingsService } from '../../services/blessingsService';
import SectionHeader from '../ui/SectionHeader';
import { DecorativeDivider, MugguCorner, BrassLamp } from '../TraditionalMotifs';
import {
  Heart,
  Sparkles,
  Send,
  MessageCircleHeart,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Check,
  ShieldCheck,
  Home,
  Trash2,
  LogOut,
  KeyRound
} from 'lucide-react';

export default function BlessingsSection() {
  const { home, familyDetails } = gruhapravesamConfig;
  const { language } = useLanguage();
  const isTelugu = language === 'TE';

  // State
  const [blessings, setBlessings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ guest_name: '', blessing_message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Admin Authentication & Moderation State (Supabase Auth / Verified Host Session)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoggingIn, setAdminLoggingIn] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [allBlessings, setAllBlessings] = useState([]);

  useEffect(() => {
    loadBlessings();
  }, []);

  const loadBlessings = async () => {
    setLoading(true);
    try {
      const res = await blessingsService.getApprovedBlessings();
      setBlessings(res.data || []);
    } catch (e) {
      console.warn('Could not load blessings:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormErrors({});

    const res = await blessingsService.submitBlessing(formData);
    setSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      setSubmitMessage(res.message);
      setFormData({ guest_name: '', blessing_message: '' });
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsSubmitModalOpen(false);
      }, 3500);
    } else {
      if (res.validationErrors) {
        setFormErrors(res.validationErrors);
      } else {
        setFormErrors({ general: res.error || 'Submission failed' });
      }
    }
  };

  // Admin Authentication & Moderation Functions
  const handleUnlockAdmin = async (e) => {
    e.preventDefault();
    setAdminLoginError('');
    setAdminLoggingIn(true);

    try {
      const res = await blessingsService.loginAdmin(adminEmail, adminPassword);
      if (res.success) {
        setIsAdminUnlocked(true);
        const dataRes = await blessingsService.getAllBlessingsForAdmin();
        setAllBlessings(dataRes.data || []);
      } else {
        setAdminLoginError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setAdminLoginError('An error occurred during authentication.');
    } finally {
      setAdminLoggingIn(false);
    }
  };

  const handleLogoutAdmin = () => {
    blessingsService.logoutAdmin();
    setIsAdminUnlocked(false);
    setAdminPassword('');
    setAllBlessings([]);
    setAdminLoginError('');
  };

  const handleUpdateStatus = async (id, status) => {
    await blessingsService.setStatus(id, status);
    const res = await blessingsService.getAllBlessingsForAdmin();
    setAllBlessings(res.data || []);
    loadBlessings(); // Refresh public list
  };

  const handleDeleteBlessing = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this blessing?')) return;
    await blessingsService.deleteBlessing(id);
    const res = await blessingsService.getAllBlessingsForAdmin();
    setAllBlessings(res.data || []);
    loadBlessings(); // Refresh public list
  };

  return (
    <section id="blessings" className="relative py-16 sm:py-24 px-3 sm:px-6 bg-cream bg-muggu-pattern border-t-2 border-turmeric/40">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={Heart}
          badgeText={isTelugu ? 'శుభాకాంక్షలు & ఆశీస్సులు' : 'Blessings from Well-Wishers'}
          teluguHeading="శుభాకాంక్షలు & ఆశీర్వచనములు"
          englishSubtitle="Blessings from Well-Wishers"
          description="మా నూతన గృహప్రవేశ మహోత్సవంలో మీ పవిత్ర సాన్నిధ్యం మరియు ఆశీస్సులు మాకు ఎంతో ముఖ్యం."
        />

        {/* 1. Host Sacred Blessing Message Card (Preserved in Authentic Theme) */}
        <div className="card-parchment p-6 sm:p-10 md:p-12 shadow-royal backdrop-blur-xs relative overflow-hidden text-center mb-12 sm:mb-16">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turmeric via-templeRed to-turmeric"></div>
          
          <MugguCorner className="absolute top-2 left-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/35 pointer-events-none" />
          <MugguCorner className="absolute top-2 right-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/35 transform rotate-90 pointer-events-none" />

          {/* Sacred Sloka */}
          <div className="inline-block px-5 py-1.5 rounded-full bg-maroon text-turmeric-bright text-xs sm:text-sm font-telugu font-bold tracking-widest shadow-xs mb-4">
            || శ్రీరస్తు శుభమస్తు అవిఘ్నమస్తు ||
          </div>

          <div className="flex items-center justify-center gap-4 my-2">
            <div className="opacity-90 scale-75">
              <BrassLamp className="w-6 h-16" />
            </div>
            <div className="w-14 h-14 rounded-full bg-turmeric/20 border-2 border-turmeric flex items-center justify-center shadow-md">
              <Home className="w-7 h-7 text-maroon" />
            </div>
            <div className="opacity-90 scale-75">
              <BrassLamp className="w-6 h-16" />
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-4 space-y-3">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-telugu font-bold text-maroon leading-relaxed">
              మీ రాక కోసం ఎదురుచూస్తున్నాము
            </h3>

            <p className="text-xs sm:text-sm md:text-base font-cormorant italic text-maroon-dark leading-relaxed font-medium">
              "We eagerly look forward to welcoming you and your family into our new home, sharing this divine celebration, and seeking your cherished blessings for lifelong happiness, health, and prosperity."
            </p>

            <div className="pt-3">
              <span className="text-[10px] sm:text-xs font-cinzel uppercase tracking-widest text-turmeric-dark font-bold block">
                With Warm Love & Sincere Respect,
              </span>
              <div className="text-lg sm:text-xl font-bold font-telugu text-maroon mt-0.5">
                {familyDetails.hosts?.names || 'బోనం రామాంజనేయులు & లక్ష్మీ కుమారి'}
              </div>
              <div className="text-xs font-cinzel text-antiqueGold font-semibold">
                {familyDetails.familySurname} Family, Narsapuram
              </div>
            </div>

            {/* Action Call to Send Blessing */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="touch-target px-6 py-3 rounded-xl bg-gradient-to-r from-maroon to-templeRed hover:from-maroon-dark hover:to-maroon text-cream font-cinzel text-xs font-bold tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-turmeric/40 cursor-pointer"
              >
                <MessageCircleHeart className="w-4 h-4 text-turmeric" />
                <span>Send Your Blessings (ఆశీస్సులు తెలపండి)</span>
              </button>

              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="text-[11px] font-cinzel text-maroon/70 hover:text-maroon underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-colors"
                title="Family Admin Moderation"
              >
                <Lock className="w-3 h-3" />
                <span>Family Moderation</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Wall of Approved Blessings */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6 border-b border-turmeric/30 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-turmeric-dark" />
              <h4 className="text-sm sm:text-base font-cinzel font-bold tracking-wider text-maroon uppercase">
                {isTelugu ? 'ఆత్మీయుల ఆశీర్వచనములు' : 'Wishes from Cherished Guests'}
              </h4>
            </div>
            <span className="text-xs font-poppins text-gray-500 font-medium">
              {blessings.length} {blessings.length === 1 ? 'Blessing' : 'Blessings'}
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-maroon font-cinzel text-xs font-semibold">
              <Sparkles className="w-6 h-6 animate-spin text-turmeric mx-auto mb-2" />
              Loading sacred blessings...
            </div>
          ) : blessings.length === 0 ? (
            <div className="text-center py-12 bg-white/70 border border-turmeric/40 rounded-2xl p-6">
              <p className="text-sm font-telugu text-maroon font-semibold mb-2">
                మొదటి ఆశీర్వాదాన్ని మీరు అందించండి!
              </p>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-5 py-2 rounded-xl bg-maroon text-cream font-cinzel text-xs font-bold uppercase"
              >
                Send First Blessing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {blessings.map((b, idx) => (
                <div
                  key={b.id || idx}
                  className="bg-white/95 border border-turmeric/50 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-turmeric transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-turmeric to-maroon"></div>

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🪔</span>
                        <h5 className="text-sm sm:text-base font-bold font-poppins text-maroon">
                          {b.guest_name}
                        </h5>
                      </div>
                      <span className="text-[10px] font-cinzel uppercase px-2 py-0.5 rounded-full bg-turmeric/15 text-maroon-dark font-semibold">
                        Well Wisher
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-poppins text-maroon-dark/90 leading-relaxed italic pl-6 mt-1">
                      "{b.blessing_message}"
                    </p>
                  </div>

                  <div className="text-[10px] text-gray-400 font-poppins text-right mt-3 pt-2 border-t border-turmeric/20">
                    {b.created_at ? new Date(b.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Auspicious Wish'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal: Submit Blessing Form */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-lg bg-cream-light border-2 border-turmeric rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-maroon hover:bg-turmeric/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-lg">🪔</span>
                <h4 className="text-xl sm:text-2xl font-telugu font-bold text-maroon">
                  మీ శుభాకాంక్షలు & ఆశీస్సులు
                </h4>
                <p className="text-xs font-cinzel uppercase text-antiqueGold font-bold tracking-wider mt-0.5">
                  Send Your Sacred Blessing to the Bonam Family
                </p>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-leafGreen/20 text-leafGreen-dark flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h5 className="text-lg font-telugu font-bold text-maroon">
                    {submitMessage || 'ధన్యవాదాలు! మీ ఆశీస్సులు నమోదయ్యాయి.'}
                  </h5>
                  <p className="text-xs font-poppins text-gray-600">
                    Your blessing will be reviewed by the host family and published on this wall shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {formErrors.general && (
                    <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formErrors.general}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-maroon uppercase mb-1">
                      Your Name / మీ పేరు *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={formData.guest_name}
                      onChange={(e) => handleInputChange('guest_name', e.target.value)}
                      placeholder="e.g., K. Rama Krishna & Family"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        formErrors.guest_name ? 'border-red-500' : 'border-turmeric/60'
                      } text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-turmeric`}
                    />
                    {formErrors.guest_name && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.guest_name}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-cinzel font-bold text-maroon uppercase">
                        Blessing Message / ఆశీర్వచనం *
                      </label>
                      <span className="text-[10px] text-gray-500 font-poppins">
                        {formData.blessing_message.length}/500
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      maxLength={500}
                      value={formData.blessing_message}
                      onChange={(e) => handleInputChange('blessing_message', e.target.value)}
                      placeholder="మీ ఆశీర్వచనం ఇక్కడ వ్రాయండి... (e.g. May your new home be blessed with eternal health, wealth and joy!)"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        formErrors.blessing_message ? 'border-red-500' : 'border-turmeric/60'
                      } text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-turmeric leading-relaxed`}
                    />
                    {formErrors.blessing_message && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.blessing_message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="w-1/3 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-cinzel font-bold uppercase transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-2/3 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream text-xs font-cinzel font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin text-turmeric" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-turmeric" />
                          <span>Send Blessing</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Modal: Admin Moderation Workflow */}
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-white border-2 border-turmeric rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => {
                  setIsAdminModalOpen(false);
                  setIsAdminUnlocked(false);
                  setAdminPassword('');
                  setAdminLoginError('');
                }}
                className="absolute top-4 right-4 p-2 rounded-full text-maroon hover:bg-turmeric/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between text-maroon mb-4 pb-2 border-b border-turmeric/30">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-turmeric-dark" />
                  <h4 className="text-lg sm:text-xl font-cinzel font-bold uppercase tracking-wide">
                    Blessings Moderation Portal
                  </h4>
                </div>
                {isAdminUnlocked && (
                  <button
                    onClick={handleLogoutAdmin}
                    className="flex items-center gap-1.5 text-xs font-cinzel text-maroon hover:text-red-700 font-semibold px-2.5 py-1 rounded-lg border border-maroon/20 hover:border-red-400 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>

              {!isAdminUnlocked ? (
                <form onSubmit={handleUnlockAdmin} className="space-y-4 max-w-sm mx-auto text-left py-4">
                  <div className="w-12 h-12 rounded-full bg-maroon/10 text-maroon flex items-center justify-center mx-auto mb-2">
                    <Lock className="w-6 h-6 text-maroon" />
                  </div>
                  <p className="text-center text-xs font-poppins text-gray-600 mb-4">
                    Host & Administrator Authentication via Supabase Auth
                  </p>

                  {adminLoginError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center">
                      {adminLoginError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-gray-700 uppercase mb-1">
                      Admin Email:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramanji.bonam@gmail.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full text-sm font-poppins px-3.5 py-2 rounded-xl border border-turmeric focus:outline-none focus:ring-2 focus:ring-turmeric"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-gray-700 uppercase mb-1">
                      Password:
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Administrator Password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full text-sm font-poppins px-3.5 py-2 rounded-xl border border-turmeric focus:outline-none focus:ring-2 focus:ring-turmeric"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={adminLoggingIn}
                    className="w-full py-2.5 rounded-xl bg-maroon text-cream font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-maroon-dark transition-colors cursor-pointer"
                  >
                    {adminLoggingIn ? (
                      <Sparkles className="w-4 h-4 animate-spin text-turmeric" />
                    ) : (
                      <KeyRound className="w-4 h-4 text-turmeric" />
                    )}
                    <span>{adminLoggingIn ? 'Authenticating...' : 'Sign In as Administrator'}</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-cinzel text-gray-500 pb-2 border-b">
                    <span>Total Submitted: {allBlessings.length}</span>
                    <span className="text-leafGreen font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Session Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    {allBlessings.length === 0 ? (
                      <p className="text-center py-6 text-gray-500 text-xs">No blessings submitted yet.</p>
                    ) : (
                      allBlessings.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-maroon">{item.guest_name}</span>
                              <span
                                className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
                                  item.approval_status === 'approved'
                                    ? 'bg-green-100 text-green-800'
                                    : item.approval_status === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {item.approval_status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-700 mt-1 italic">"{item.blessing_message}"</p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.approval_status !== 'approved' && (
                              <button
                                onClick={() => handleUpdateStatus(item.id, 'approved')}
                                className="px-3 py-1.5 rounded-lg bg-leafGreen hover:bg-leafGreen-dark text-white text-[11px] font-cinzel font-bold uppercase transition-all flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Approve</span>
                              </button>
                            )}
                            {item.approval_status !== 'rejected' && (
                              <button
                                onClick={() => handleUpdateStatus(item.id, 'rejected')}
                                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-cinzel font-bold uppercase transition-all"
                              >
                                Reject
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteBlessing(item.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete blessing"
                              aria-label="Delete blessing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
