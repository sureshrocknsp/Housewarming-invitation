import React, { useState, useEffect } from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { rsvpService } from '../services/rsvpService';
import {
  Lock,
  LogOut,
  ArrowLeft,
  Search,
  Download,
  Users,
  Baby,
  CheckCircle2,
  Clock,
  XCircle,
  MessageCircle,
  Trash2,
  RefreshCw,
  Home,
  ShieldCheck,
  Calendar,
  Sparkles,
  Phone
} from 'lucide-react';

export default function AdminRsvpDashboard({ onBack }) {
  const { adminPasscode = 'Gruham2026', familyDetails, home } = gruhapravesamConfig;

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('gruhapravesam_admin_session') === 'authenticated';
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');

  // RSVP Data state
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'attending', 'maybe', 'declined'

  // Load RSVPs upon auth
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await rsvpService.getAllRsvps();
      setRsvps(data);
    } catch (e) {
      console.error('Error fetching RSVPs:', e);
    } finally {
      setLoading(false);
    }
  };

  // Auth handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcodeInput.trim() === adminPasscode.trim()) {
      setIsAuthenticated(true);
      sessionStorage.setItem('gruhapravesam_admin_session', 'authenticated');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Please enter the valid admin passcode.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('gruhapravesam_admin_session');
    setPasscodeInput('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this RSVP entry?')) {
      rsvpService.deleteRsvp(id);
      loadData();
    }
  };

  const handleExportCsv = () => {
    rsvpService.exportToCsv(filteredRsvps);
  };

  // Filtered RSVPs based on search and status
  const filteredRsvps = rsvps.filter((item) => {
    const matchesStatus =
      statusFilter === 'all' ? true : item.attendance_status === statusFilter;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (item.guest_name && item.guest_name.toLowerCase().includes(query)) ||
      (item.mobile_number && item.mobile_number.includes(query)) ||
      (item.special_message && item.special_message.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  const stats = rsvpService.calculateStats(rsvps);

  // Return to website
  const handleReturnToSite = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
      window.location.pathname = '/';
    }
  };

  /* ================= 1. LOGIN SCREEN ================= */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream bg-muggu-pattern flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-cream-light border-2 border-turmeric/70 rounded-3xl p-8 shadow-royal relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-maroon text-turmeric mb-3 shadow-md border border-turmeric/50">
              <Lock className="w-6 h-6" />
            </div>
            <div className="text-xs font-telugu text-maroon font-bold">|| శ్రీ గణేశాయ నమః ||</div>
            <h1 className="text-2xl font-cinzel font-bold text-maroon tracking-wider mt-1">
              Admin RSVP Portal
            </h1>
            <p className="text-xs font-poppins text-gray-600 mt-1">
              {familyDetails.familySurname} Family • {home.name}
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs font-poppins text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-cinzel font-bold uppercase text-maroon tracking-wider mb-2">
                Enter Admin Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Passcode"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-turmeric/60 bg-white text-maroon-dark focus:outline-none focus:ring-2 focus:ring-turmeric text-sm font-poppins shadow-inner"
              />
              <p className="text-[11px] text-gray-500 mt-1.5 font-poppins">
                Default ceremony passcode: <span className="font-mono font-bold text-maroon">{adminPasscode}</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-maroon to-templeRed hover:from-maroon-dark hover:to-maroon text-cream font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-royal transition-all hover:scale-[1.01] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-turmeric" />
              <span>Unlock RSVP Dashboard</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-turmeric/30 text-center">
            <button
              type="button"
              onClick={handleReturnToSite}
              className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold text-maroon hover:text-templeRed transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Invitation Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= 2. AUTHENTICATED DASHBOARD ================= */
  return (
    <div className="min-h-screen bg-cream text-maroon-dark font-poppins pb-20">
      {/* Top Navigation Bar */}
      <header className="bg-maroon-deep text-cream border-b-2 border-turmeric px-4 py-4 sticky top-0 z-30 shadow-royal">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleReturnToSite}
              className="p-2 rounded-xl bg-white/10 hover:bg-turmeric text-cream hover:text-maroon transition-all"
              title="Return to Invitation Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-cinzel font-bold text-cream flex items-center gap-2">
                <span>🪔</span>
                <span>RSVP Admin Dashboard</span>
              </h1>
              <p className="text-[11px] text-turmeric font-telugu">
                {familyDetails.familySurnameTelugu} నూతన గృహప్రవేశం • {home.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cream transition-all flex items-center gap-1.5 text-xs font-cinzel"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleReturnToSite}
              className="px-3 py-2 rounded-xl bg-turmeric hover:bg-turmeric-light text-maroon font-cinzel text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">View Invitation</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-red-700/80 text-cream font-cinzel text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        {/* Supabase Setup Alert Banner when in Demo / Local mode */}
        {!rsvpService.isSupabaseConfigured && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <h4 className="text-xs sm:text-sm font-cinzel font-bold text-amber-900 uppercase">
                  Supabase Cloud Database Setup Notice
                </h4>
                <p className="text-xs text-amber-800 mt-0.5 font-poppins">
                  Currently viewing locally saved browser submissions and sample demo data. To collect live RSVPs from guests on all devices across the web, add <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-mono text-[11px]">VITE_SUPABASE_URL</code> and <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code> to your deployment environment.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-amber-200/80 text-amber-900 font-bold whitespace-nowrap">
              LOCAL STORAGE MODE
            </span>
          </div>
        )}

        {/* SUMMARY STATS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {/* Total RSVPs */}
          <div className="p-4 rounded-2xl bg-white border border-turmeric/40 shadow-xs">
            <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-gray-500 mb-1">
              Total RSVPs
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-poppins text-maroon">
              {stats.total}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">Guest responses</div>
          </div>

          {/* Attending */}
          <div className="p-4 rounded-2xl bg-leafGreen/10 border border-leafGreen/40 shadow-xs">
            <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-leafGreen-dark mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-leafGreen" />
              <span>Attending</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-poppins text-leafGreen-dark">
              {stats.attending}
            </div>
            <div className="text-[10px] text-leafGreen-dark/70 mt-0.5">Confirmed</div>
          </div>

          {/* Maybe */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 shadow-xs">
            <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Maybe</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-poppins text-amber-900">
              {stats.maybe}
            </div>
            <div className="text-[10px] text-amber-800/70 mt-0.5">Tentative</div>
          </div>

          {/* Declined */}
          <div className="p-4 rounded-2xl bg-templeRed/10 border border-templeRed/40 shadow-xs">
            <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-templeRed mb-1 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-templeRed" />
              <span>Declined</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-poppins text-templeRed">
              {stats.declined}
            </div>
            <div className="text-[10px] text-templeRed/70 mt-0.5">Unable to join</div>
          </div>

          {/* Total Adults */}
          <div className="p-4 rounded-2xl bg-white border border-turmeric/40 shadow-xs">
            <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-turmeric-dark" />
              <span>Total Adults</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-poppins text-maroon">
              {stats.totalAdults}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">Expected adults</div>
          </div>

          {/* Total Children */}
          <div className="p-4 rounded-2xl bg-white border border-turmeric/40 shadow-xs">
            <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
              <Baby className="w-3.5 h-3.5 text-turmeric-dark" />
              <span>Total Children</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-poppins text-maroon">
              {stats.totalChildren}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">Expected children</div>
          </div>
        </div>

        {/* CONTROLS & FILTER BAR */}
        <div className="bg-white border border-turmeric/50 rounded-2xl p-4 mb-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All Responses', count: rsvps.length },
              { id: 'attending', label: 'Attending', count: stats.attending },
              { id: 'maybe', label: 'Maybe', count: stats.maybe },
              { id: 'declined', label: 'Declined', count: stats.declined }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-maroon text-cream shadow-xs'
                    : 'bg-cream-light hover:bg-cream text-maroon-dark border border-turmeric/30'
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-black/10">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Export Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search guest or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-turmeric/50 bg-cream-light/60 text-xs font-poppins focus:outline-none focus:ring-2 focus:ring-turmeric text-maroon-dark"
              />
            </div>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCsv}
              className="px-4 py-2 rounded-xl bg-leafGreen hover:bg-leafGreen-dark text-white font-cinzel text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              title="Download guest list as CSV file (Excel compatible)"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* RESPONSIVE GUEST LIST (TABLE ON DESKTOP, CARDS ON MOBILE) */}
        <div className="bg-white border-2 border-turmeric/50 rounded-2xl shadow-royal overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-maroon-light/10 border-b border-turmeric/40 text-[11px] font-cinzel font-bold uppercase tracking-wider text-maroon">
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Adults</th>
                  <th className="py-3 px-4">Children</th>
                  <th className="py-3 px-4 max-w-xs">Message / Blessings</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-turmeric/20 text-xs font-poppins text-maroon-dark">
                {filteredRsvps.length > 0 ? (
                  filteredRsvps.map((rsvp) => {
                    const isAttending = rsvp.attendance_status === 'attending';
                    const isMaybe = rsvp.attendance_status === 'maybe';
                    return (
                      <tr key={rsvp.id} className="hover:bg-cream-light/60 transition-colors">
                        {/* Guest Name */}
                        <td className="py-3 px-4 font-semibold text-maroon">
                          <div className="flex items-center gap-1.5">
                            <span>{rsvp.guest_name}</span>
                            {rsvp.is_demo && (
                              <span className="text-[9px] font-cinzel font-bold px-1.5 py-0.5 rounded-full bg-turmeric/20 text-maroon border border-turmeric/50">
                                Sample
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Mobile Number */}
                        <td className="py-3 px-4 text-gray-600">
                          {rsvp.mobile_number ? (
                            <a
                              href={`https://wa.me/${rsvp.mobile_number.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-leafGreen-dark hover:underline"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                              <span>{rsvp.mobile_number}</span>
                            </a>
                          ) : (
                            <span className="text-gray-400 italic">Not provided</span>
                          )}
                        </td>

                        {/* Attendance Status */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                              isAttending
                                ? 'bg-leafGreen/15 text-leafGreen-dark border border-leafGreen/40'
                                : isMaybe
                                ? 'bg-amber-500/15 text-amber-800 border border-amber-500/40'
                                : 'bg-templeRed/15 text-templeRed border border-templeRed/40'
                            }`}
                          >
                            {isAttending ? (
                              <CheckCircle2 className="w-3 h-3 text-leafGreen" />
                            ) : isMaybe ? (
                              <Clock className="w-3 h-3 text-amber-600" />
                            ) : (
                              <XCircle className="w-3 h-3 text-templeRed" />
                            )}
                            <span>{rsvp.attendance_status}</span>
                          </span>
                        </td>

                        {/* Adults */}
                        <td className="py-3 px-4 font-medium">{rsvp.adults_count ?? '-'}</td>

                        {/* Children */}
                        <td className="py-3 px-4 font-medium">{rsvp.children_count ?? '-'}</td>

                        {/* Special Message */}
                        <td className="py-3 px-4 max-w-xs text-gray-700 italic truncate" title={rsvp.special_message}>
                          {rsvp.special_message || <span className="text-gray-400 not-italic">-</span>}
                        </td>

                        {/* Submission Date */}
                        <td className="py-3 px-4 text-gray-500 text-[11px]">
                          {rsvp.created_at ? new Date(rsvp.created_at).toLocaleDateString() : 'Recent'}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleDelete(rsvp.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-templeRed hover:bg-red-50 transition-colors"
                            title="Delete RSVP entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500 font-poppins">
                      No RSVP responses found matching your filter or search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-turmeric/20">
            {filteredRsvps.length > 0 ? (
              filteredRsvps.map((rsvp) => (
                <div key={rsvp.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-maroon flex items-center gap-1.5">
                        <span>{rsvp.guest_name}</span>
                        {rsvp.is_demo && (
                          <span className="text-[9px] font-cinzel font-bold px-1.5 py-0.2 rounded-full bg-turmeric/20 text-maroon">
                            Sample
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {rsvp.created_at ? new Date(rsvp.created_at).toLocaleString() : 'Recent'}
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                        rsvp.attendance_status === 'attending'
                          ? 'bg-leafGreen/15 text-leafGreen-dark border border-leafGreen/40'
                          : rsvp.attendance_status === 'maybe'
                          ? 'bg-amber-500/15 text-amber-800 border border-amber-500/40'
                          : 'bg-templeRed/15 text-templeRed border border-templeRed/40'
                      }`}
                    >
                      {rsvp.attendance_status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-700 pt-1">
                    <div>
                      <span className="font-semibold">Adults:</span> {rsvp.adults_count ?? 0}
                    </div>
                    <div>
                      <span className="font-semibold">Children:</span> {rsvp.children_count ?? 0}
                    </div>
                    {rsvp.mobile_number && (
                      <div className="truncate">
                        <a
                          href={`https://wa.me/${rsvp.mobile_number.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-leafGreen-dark flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-leafGreen" />
                          <span>{rsvp.mobile_number}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {rsvp.special_message && (
                    <div className="text-xs italic text-gray-700 bg-cream/70 p-2.5 rounded-xl border border-turmeric/30">
                      "{rsvp.special_message}"
                    </div>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleDelete(rsvp.id)}
                      className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500 font-poppins text-xs">
                No RSVP responses found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
