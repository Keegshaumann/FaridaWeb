import { Link } from "react-router";
import { Phone, Mail, MapPin, Instagram, Facebook, Star, Home } from "lucide-react";
import { trackButtonClick } from "../GoogleAnalytics";

export function Footer() {
  const handleReviewClick = () => {
    trackButtonClick('google_review', 'footer');
  };

  return (
    <footer className="relative bg-gradient-to-br from-[var(--purple-soft)] via-[var(--purple-medium)] to-[var(--mauve)] overflow-hidden">
      {/* Full-width tint so the container doesn't render as a darker centre band */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#bf00ff0f] pointer-events-none" />

      <div className="relative z-0 container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <h2 className="sr-only">Site footer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-xl font-semibold text-white">
                Farida Cajee-Botes
              </span>
              <span className="text-sm text-white/70">
                Orthotist & Prosthetist
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Providing individualised, assessment-led orthotic, prosthetic and medical compression
              care for people living with injury, illness, or physical impairment.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/faridabotes/"
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
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-white text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-white/80 hover:text-white text-sm transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/80 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-white/80 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-white/80 hover:text-white text-sm transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/services/prosthetics" className="text-white/80 hover:text-white text-sm transition-colors">
                  Prosthetics
                </Link>
              </li>
              <li>
                <Link to="/services/custom-orthotics" className="text-white/80 hover:text-white text-sm transition-colors">
                  Custom Orthotics
                </Link>
              </li>
              <li>
                <Link to="/services/off-the-shelf-orthotics" className="text-white/80 hover:text-white text-sm transition-colors">
                  Braces and Supports
                </Link>
              </li>
              <li>
                <Link to="/services/compression" className="text-white/80 hover:text-white text-sm transition-colors">
                  Medical Compression
                </Link>
              </li>
              <li>
                <Link to="/services/mobility-aids" className="text-white/80 hover:text-white text-sm transition-colors">
                  Mobility Aids
                </Link>
              </li>
              <li>
                <Link to="/services/breast-prosthetics" className="text-white/80 hover:text-white text-sm transition-colors">
                  Breast Prostheses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact details</h3>
            <ul className="space-y-3 bg-[#00000000]">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <a
                  href="tel:0646520684"
                  className="text-white/90 hover:text-white text-sm transition-colors font-bold"
                >
                  064 652 0684
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:care@cajeebotes.com"
                  className="text-white/90 hover:text-white text-sm transition-colors font-bold"
                >
                  care@cajeebotes.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <div className="text-white/80 text-sm">
                  <p>Morningside, Sandton (by appointment)</p>
                  <p>Home visits across Gauteng</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Leave a Review */}
          <div>
            <h3 className="font-semibold text-white mb-4">Reviews</h3>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJ_Zc-eJJzlR4RaIWAjmCryqg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] hover:shadow-lg text-white px-4 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
              onClick={handleReviewClick}
            >
              <Star className="h-4 w-4 fill-current" />
              Leave a Review
            </a>
            <p className="text-white/70 text-xs mt-3 leading-relaxed">
              Share your experience to help others find the care they need.
            </p>
          </div>
        </div>

        {/* Where to find us: one physical practice, plus the home-visit service area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 pt-8 border-t border-white/20">
          <div>
            <h3 className="font-semibold text-white mb-5">Where to find us</h3>

            <div className="flex items-start gap-3 mb-6">
              <MapPin className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-semibold mb-1">
                  Consulting rooms in Morningside, Sandton
                </p>
                <address className="not-italic text-white/80 text-sm leading-relaxed">
                  Orthocast Morningside<br />
                  Block F, Ground Floor, Rochester Place<br />
                  173 Rivonia Road, Morningside, Sandton, 2196
                </address>
                <p className="text-white/70 text-xs mt-1.5 italic">
                  Assessments and fittings by appointment.
                </p>
                <a
                  href="https://maps.google.com/?cid=12162722174863443304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white/90 hover:text-white text-sm underline underline-offset-4 mt-2 transition-colors"
                >
                  Get directions
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-semibold mb-1">
                  Home visits across Centurion and greater Gauteng
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Mobile assessments and fittings in your own home or at the hospital bedside
                  across Centurion, Pretoria, Midrand, Sandton and Johannesburg.
                </p>
                <p className="text-white/70 text-xs mt-1.5 italic">
                  Home visits by arrangement. There are no consulting rooms in Centurion.
                </p>
              </div>
            </div>
          </div>

          <div>
            <iframe
              title="Map showing Orthocast Morningside, 173 Rivonia Road, Sandton"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.074890533255!2d28.0545417!3d-26.096473900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957392783e97fd%3A0xa8caab608e808568!2sOrthocast%20Morningside%20(Farida%20Cajee-Botes%20Orthotist%20and%20Prosthetist)!5e0!3m2!1sen!2sza!4v1788555592960!5m2!1sen!2sza"
              width="600"
              height="450"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-[260px] sm:h-[300px] lg:h-full lg:min-h-[280px] rounded-2xl border-0 shadow-lg"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-white/20">
          <p className="text-center text-white/70 text-sm">
            © {new Date().getFullYear()} Farida Cajee-Botes Orthotist Prosthetist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}