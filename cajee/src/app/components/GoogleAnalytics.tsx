import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-87YWW84BMB';

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Check if Google Analytics is already loaded
    if (window.gtag) {
      return; // Already initialized, skip
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag with default consent mode
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      // Set default consent to 'denied' - will be updated when user accepts cookies
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'wait_for_update': 500
      });
      
      // Check if user has previously consented
      (function() {
        const hasConsent = localStorage.getItem('cookie-consent');
        if (hasConsent === 'accepted') {
          gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
          });
        }
      })();
      
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname + window.location.search
      });
    `;
    document.head.appendChild(script2);
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Helper function to track custom events
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
}

// Helper function to track form submissions
export function trackFormSubmission(formName: string, formData?: Record<string, any>) {
  trackEvent('form_submission', {
    form_name: formName,
    ...formData,
  });
}

// Helper function to track button clicks
export function trackButtonClick(buttonName: string, location?: string) {
  trackEvent('button_click', {
    button_name: buttonName,
    click_location: location,
  });
}

// Helper function to track WhatsApp clicks
export function trackWhatsAppClick() {
  trackEvent('whatsapp_click', {
    action: 'contact',
  });
}