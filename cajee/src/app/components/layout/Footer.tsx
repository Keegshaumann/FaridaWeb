import { Link } from "react-router";
import { Phone, Mail, MapPin, Instagram, Facebook, Star } from "lucide-react";
import { trackButtonClick } from "../GoogleAnalytics";

export function Footer() {
  const handleReviewClick = () => {
    trackButtonClick('google_review', 'footer');
  };

  return (
    <footer className="relative bg-gradient-to-br from-[var(--purple-soft)] via-[var(--purple-medium)] to-[var(--mauve)] overflow-hidden">
      {/* Blur transition at top */}
      
      
      <div className="relative z-0 container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 bg-[#bf00ff0f]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-xl font-semibold text-[var(--text-dark)]">
                Cajee Botes
              </span>
              <span className="text-sm text-[var(--text-dark)]/70">
                Orthotist & Prosthetist
              </span>
            </div>
            <p className="text-[var(--text-dark)]/80 text-sm leading-relaxed mb-4">
              Providing individualised, assessment-led care for people living with injury, illness, or physical impairment.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/cajeebotes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/90 flex items-center justify-center transition-all hover:scale-110 shadow-md"
                aria-label="Visit our Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://www.facebook.com/Cajeebotes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/90 flex items-center justify-center transition-all hover:scale-110 shadow-md"
                aria-label="Visit our Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[var(--text-dark)] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[var(--text-dark)]/80 hover:text-[var(--text-dark)] text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[var(--text-dark)]/80 hover:text-[var(--text-dark)] text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[var(--text-dark)]/80 hover:text-[var(--text-dark)] text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[var(--text-dark)]/80 hover:text-[var(--text-dark)] text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-[var(--text-dark)]/80 hover:text-[var(--text-dark)] text-sm transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-[var(--text-dark)]/80 hover:text-[var(--text-dark)] text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[var(--text-dark)] mb-4">Contact Us</h3>
            <ul className="space-y-3 bg-[#00000000]">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[var(--text-dark)] flex-shrink-0 mt-0.5" />
                <a
                  href="tel:0646520684"
                  className="text-[var(--text-dark)]/80 hover:text-[var(--text-dark)] text-sm transition-colors text-[#5e3362] font-bold"
                >
                  064 652 0684
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[var(--text-dark)] flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:care@cajeebotes.com"
                  className="text-[var(--text-dark)]/80 hover:text-[var(--text-dark)] text-sm transition-colors text-[#5e3362] font-bold"
                >
                  care@cajeebotes.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--text-dark)] flex-shrink-0 mt-0.5" />
                <div className="text-[var(--text-dark)]/80 text-sm">
                  <p>Centurion, Gauteng</p>
                  <p>South Africa</p>
                  <p className="mt-1 text-xs italic">Home Visits Available</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Leave a Review */}
          <div>
            <h3 className="font-semibold text-[var(--text-dark)] mb-4">Reviews</h3>
            <a
              href="https://g.page/r/CRVd5g59XrdmEAI/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] hover:shadow-lg text-white px-4 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
              onClick={handleReviewClick}
            >
              <Star className="h-4 w-4 fill-current" />
              Leave a Review
            </a>
            <p className="text-[var(--text-dark)]/70 text-xs mt-3 leading-relaxed">
              Share your experience to help others find the care they need.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--text-dark)]/20">
          <p className="text-center text-[var(--text-dark)]/70 text-sm">
            © {new Date().getFullYear()} Cajee Botes Orthotist Prosthetist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}