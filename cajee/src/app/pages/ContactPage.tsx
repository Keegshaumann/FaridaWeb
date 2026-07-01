import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Star, FileText } from "lucide-react";
import { TestimonialsColumn } from "../components/ui/testimonials-columns-1";
import { SignupForm } from "../components/SignupForm";
import { trackButtonClick } from "../components/GoogleAnalytics";

export function ContactPage() {
  const handleReviewClick = () => {
    trackButtonClick('google_review', 'contact_page');
  };

  const handleBrochureClick = () => {
    trackButtonClick('brochure_download', 'contact_page');
  };

  // Testimonials data
  const testimonials = [
    {
      text: "The home visit service made such a difference during my recovery. Cajee's professional yet compassionate approach helped me regain my independence.",
      image: "/external/photo-1758686254563.jpg",
      name: "Margaret Thompson",
      role: "Prosthetic Patient",
    },
    {
      text: "Professional, knowledgeable, and truly caring. The custom orthotic device has improved my mobility and quality of life significantly.",
      image: "/external/photo-1764084051438.jpg",
      name: "David Chen",
      role: "Orthotic Patient",
    },
    {
      text: "The assessment was thorough and respectful. I felt heard and understood throughout the entire process of getting my compression garments.",
      image: "/external/photo-1676552055618.jpg",
      name: "Linda Botha",
      role: "Compression Patient",
    },
    {
      text: "Excellent service from start to finish. The mobility aids recommended were perfect for my needs and delivered with expert guidance.",
      image: "/external/photo-1758686253859.jpg",
      name: "James Williams",
      role: "Mobility Aid User",
    },
    {
      text: "As a caregiver, I appreciated the clear communication and education provided. It made supporting my mother's recovery much easier.",
      image: "/external/photo-1710452772856.jpg",
      name: "Sarah Patel",
      role: "Family Caregiver",
    },
    {
      text: "The hospital bedside fitting was incredibly convenient and professional. Highly recommend for anyone needing orthotic or prosthetic care.",
      image: "/external/photo-1577202214328.jpg",
      name: "Peter van der Merwe",
      role: "Hospital Patient",
    },
    {
      text: "Compassionate, dignified care that made a difficult time much easier. The breast prosthetic fitting was handled with such sensitivity and professionalism.",
      image: "/external/photo-1765896387387.jpg",
      name: "Elizabeth Johnson",
      role: "Breast Prosthetic Patient",
    },
    {
      text: "The custom insoles have made such a difference to my daily comfort. Professional service with genuine care for patient outcomes.",
      image: "/external/photo-1770058428154.jpg",
      name: "Amanda Naidoo",
      role: "Custom Orthotic Patient",
    },
  ];

  // Split testimonials into columns
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 8);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#F5E8F3] bg-[#ffffff00] px-[0px] pt-[90px] pb-[10px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
              Contact Us
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

                  {/* Location */}
                  <div className="bg-gradient-to-br from-[var(--pink-light)] to-[var(--pink-soft)] rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#FDF1FF] flex items-center justify-center mx-auto mb-3 shadow-md">
                      <MapPin className="h-7 w-7 text-[var(--accent-purple)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-1">Location</h3>
                    <p className="text-base text-[var(--text-muted)]">
                      Centurion, Gauteng<br />
                      South Africa
                    </p>
                    <p className="text-sm text-[var(--accent-purple)] mt-2 italic font-medium">
                      Home Visits Available
                    </p>
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
                      href="https://www.instagram.com/cajeebotes/"
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
                    href="https://g.page/r/CRVd5g59XrdmEAI/review"
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

      {/* Testimonials Section */}
      
    </>
  );
}