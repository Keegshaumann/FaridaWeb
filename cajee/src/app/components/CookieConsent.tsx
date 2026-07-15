import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    
    // Enable Google Analytics tracking after consent
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    
    // Disable Google Analytics tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div id="cookie-consent" className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)] flex items-center justify-center">
                <Cookie className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
                We Value Your Privacy
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                We use cookies and similar technologies to improve your experience on our website, 
                analyze site traffic, and personalize content. By clicking "Accept All", you consent 
                to our use of cookies for analytics and tracking. This helps us understand how 
                visitors use our site and improve our services.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={declineCookies}
                className="px-6 py-2.5 rounded-full border-2 border-gray-300 text-[var(--text-dark)] font-semibold hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] text-white font-semibold hover:shadow-lg transition-all whitespace-nowrap"
              >
                Accept All
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={declineCookies}
              className="absolute top-4 right-4 md:relative md:top-0 md:right-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close cookie consent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
