import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Star, FileText, Home } from "lucide-react";
import { SEO } from "../components/SEO";
import { GoogleReviews } from "../components/GoogleReviews";
import { SignupForm } from "../components/SignupForm";
import { trackButtonClick } from "../components/GoogleAnalytics";

export function ContactPage() {
  const handleReviewClick = () => {
    trackButtonClick('google_review', 'contact_page');
  };

  const handleBrochureClick = () => {
    trackButtonClick('brochure_download', 'contact_page');
  };


  return (
    <>
      <SEO
        fullTitle="Orthotist & Prosthetist in Morningside, Sandton | Contact"
        title="Contact Us & Book an Assessment"
        description="Book an assessment at our Morningside consulting rooms in Sandton, or a home visit across Centurion, Pretoria, Midrand and Johannesburg. Call 064 652 0684."
        keywords="orthotist Morningside, prosthetist Sandton, orthotist Sandton, prosthetist Morningside, orthotist Rivonia Road, mobile orthotist Centurion, home visit prosthetist Centurion, book orthotist assessment Gauteng"
      />
      {/* Hero Section */}
      <section className="relative bg-[#F5E8F3] bg-[#ffffff00] px-[0px] pt-[90px] pb-[10px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
              Book an Assessment in Morningside, Sandton
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed">
              Get in touch to book an assessment or make an enquiry
            </p>
          </div>
        </div>
        {/* Blur transition to next section */}
        
      </section>

      {/* Contact Information Section */}
      <section className="relative py-16 md:py-24 bg-[#F5E8F3] bg-[#ffffff00]">
        {/* Blur transition from previous section */}
        
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Two Column Layout: Contact Info + Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column: Contact Information Blocks */}
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6">
                  Get in Touch
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {/* Phone */}
                  <div className="bg-gradient-to-br from-[var(--purple-light)] to-[var(--purple-soft)] rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#FDF1FF] flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Phone className="h-7 w-7 text-[var(--accent-purple)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-1">Phone</h3>
                    <a
                      href="tel:0646520684"
                      className="text-base text-[var(--text-muted)] hover:text-[var(--text-dark)] transition-colors"
                    >
                      064 652 0684
                    </a>
                  </div>

                  {/* Email */}
                  <div className="bg-gradient-to-br from-[var(--pink-light)] to-[var(--pink-soft)] rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#FDF1FF] flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Mail className="h-7 w-7 text-[var(--accent-purple)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-1">Email</h3>
                    <a
                      href="mailto:care@cajeebotes.com"
                      className="text-base text-[var(--text-muted)] hover:text-[var(--text-dark)] transition-colors break-all"
                    >
                      care@cajeebotes.com
                    </a>
                  </div>

                  {/* Consulting rooms */}
                  <div className="bg-gradient-to-br from-[var(--pink-light)] to-[var(--pink-soft)] rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#FDF1FF] flex items-center justify-center mx-auto mb-3 shadow-md">
                      <MapPin className="h-7 w-7 text-[var(--accent-purple)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-1">Consulting Rooms</h3>
                    <address className="not-italic text-base text-[var(--text-muted)] leading-relaxed">
                      Orthocast Morningside<br />
                      Block F, Ground Floor, Rochester Place<br />
                      173 Rivonia Road, Morningside<br />
                      Sandton, 2196
                    </address>
                    <p className="text-sm text-[var(--accent-purple)] mt-2 italic font-medium">
                      By appointment
                    </p>
                    <a
                      href="https://maps.google.com/?cid=12162722174863443304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-[var(--accent-purple)] underline underline-offset-4 mt-2 hover:opacity-80 transition-opacity"
                    >
                      Get directions
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="bg-gradient-to-br from-[var(--purple-light)] to-[var(--purple-soft)] rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#FDF1FF] flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Clock className="h-7 w-7 text-[var(--accent-purple)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-1">Hours</h3>
                    <p className="text-base text-[var(--text-muted)]">
                      By appointment<br />
                      Mobile service available
                    </p>
                  </div>

                  {/* Home-visit service area */}
                  <div className="bg-gradient-to-br from-[var(--pink-light)] to-[var(--pink-soft)] rounded-2xl p-6 text-center sm:col-span-2">
                    <div className="w-14 h-14 rounded-full bg-[#FDF1FF] flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Home className="h-7 w-7 text-[var(--accent-purple)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-1">Home Visits</h3>
                    <p className="text-base text-[var(--text-muted)] leading-relaxed">
                      Assessments and fittings in your own home or at the hospital bedside across
                      Centurion, Pretoria, Midrand, Sandton and Johannesburg.
                    </p>
                    <p className="text-sm text-[var(--accent-purple)] mt-2 italic font-medium">
                      By arrangement. No consulting rooms in Centurion
                    </p>
                  </div>
                </div>

                {/* Mobile Service Highlight */}
                <div className="bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)] rounded-2xl p-6 text-center shadow-lg mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Mobile Service Available
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed text-[#656565e6]">
                    We bring professional orthotic and prosthetic care to your home or hospital bedside. Experience compassionate care in the comfort of your own space.
                  </p>
                </div>

                {/* Social Media & Reviews */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4 text-center">
                    Connect With Us
                  </h3>
                  
                  {/* Social Media Icons */}
                  <div className="flex justify-center gap-4 mb-5">
                    <a
                      href="https://www.instagram.com/faridabotes/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)] hover:shadow-lg flex items-center justify-center transition-all hover:scale-110"
                      aria-label="Visit our Instagram"
                    >
                      <Instagram className="h-6 w-6 text-white" />
                    </a>
                    <a
                      href="https://www.facebook.com/Cajeebotes/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)] hover:shadow-lg flex items-center justify-center transition-all hover:scale-110"
                      aria-label="Visit our Facebook"
                    >
                      <Facebook className="h-6 w-6 text-white" />
                    </a>
                  </div>

                  {/* Review Button */}
                  <a
                    href="https://search.google.com/local/writereview?placeid=ChIJ_Zc-eJJzlR4RaIWAjmCryqg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] hover:shadow-lg text-white px-4 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 mb-3"
                    onClick={handleReviewClick}
                  >
                    <Star className="h-4 w-4 fill-current" />
                    Leave a Google Review
                  </a>

                  {/* Brochure Download Button */}
                  <a
                    href="https://drive.google.com/file/d/1QUXbNrNWFkF7sk_d9Q2pJQ9c6XdGozsW/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-white border-2 border-[var(--accent-purple)] text-[var(--accent-purple)] hover:bg-[#FDF1FF] px-4 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    onClick={handleBrochureClick}
                  >
                    <FileText className="h-4 w-4" />
                    View Our Brochure
                  </a>
                </div>
              </div>

              {/* Right Column: Signup Form */}
              <div id="book" className="lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-2">
                      Request an Assessment
                    </h2>
                    <p className="text-base text-[var(--text-muted)]">
                      Fill out the form and we'll be in touch soon.
                    </p>
                  </div>
                  
                  <SignupForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blur transition to next section */}
        
      </section>

      {/* Real patient reviews from the practice's Google profile */}
      <GoogleReviews />
    </>
  );
}