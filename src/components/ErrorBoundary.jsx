import React from 'react';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';

/**
 * Traditional South Indian Error Boundary
 * Catches any unexpected rendering errors gracefully and shows an auspicious fallback
 * without exposing technical stack traces to wedding/housewarming guests.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Gruhapravesam application error caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] bg-cream bg-muggu-pattern flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-cream-light border-2 border-turmeric/80 rounded-3xl p-8 shadow-royal">
            <div className="text-sm font-telugu text-maroon font-bold mb-2">
              || ఓం నమో వేంకటేశాయ ||
            </div>
            <div className="w-14 h-14 rounded-full bg-maroon/10 border border-maroon/30 text-maroon flex items-center justify-center mx-auto mb-4">
              <Home className="w-7 h-7 text-maroon" />
            </div>
            <h2 className="text-xl font-cinzel font-bold text-maroon mb-1">
              Gruhapravesam Ceremony Invitation
            </h2>
            <h3 className="text-sm font-telugu font-semibold text-turmeric-dark mb-3">
              క్షమించండి, పేజీని లోడ్ చేయడంలో చిన్న అంతరాయం ఏర్పడింది.
            </h3>
            <p className="text-xs font-poppins text-gray-600 mb-6 leading-relaxed">
              We encountered a temporary interruption while loading this section. Please reload the page to continue viewing the invitation.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-maroon to-templeRed hover:from-maroon-dark hover:to-maroon text-cream font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-turmeric" />
              <span>Reload Invitation (పేజీని రీలోడ్ చేయండి)</span>
            </button>

            {this.state.error && (
              <details className="mt-4 text-left border border-turmeric/30 rounded-lg p-2 bg-cream text-[11px] text-maroon/70">
                <summary className="cursor-pointer font-medium font-cinzel text-maroon select-none">
                  Technical Diagnostics
                </summary>
                <p className="mt-2 font-mono text-[10px] text-red-700 break-words whitespace-pre-wrap">
                  {this.state.error.message || String(this.state.error)}
                </p>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
