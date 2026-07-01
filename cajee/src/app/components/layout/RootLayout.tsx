import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToHash } from "../ScrollToHash";
import { WhatsAppWidget } from "../WhatsAppWidget";
import { GoogleAnalytics } from "../GoogleAnalytics";
import { CookieConsent } from "../CookieConsent";

export function RootLayout() {
  return (
    <>
      {/* Google Analytics Tracking */}
      <GoogleAnalytics />
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Full-page gradient background - Pink to Off-White to Purple */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[var(--pink-light)] via-[#fafafa] via-50% to-[var(--purple-light)]" />
      
      <div className="min-h-screen flex flex-col relative">
        <ScrollToHash />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* WhatsApp Widget - Available on all pages */}
      <WhatsAppWidget />
    </>
  );
}