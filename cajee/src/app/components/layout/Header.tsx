import image_4c69079a0a086c245294fb463bb6e821e7f346c9 from '@/assets/4c69079a0a086c245294fb463bb6e821e7f346c9.webp'
import image_1b89765aa02a5485b64ba3d7abb36c5813cdbf75 from '@/assets/1b89765aa02a5485b64ba3d7abb36c5813cdbf75.webp'
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import logoFallback from "@/assets/e101d3ed40c991ab187e673779af5c0942eb599a.webp";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setServicesOpen(false);
    };

    if (servicesOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [servicesOpen]);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Conditions", path: "/conditions" },
    { name: "Case Studies", path: "/case-studies" },
  ];

  const serviceLinks = [
    { name: "All Services", path: "/services" },
    { name: "Prosthetics", path: "/services/prosthetics" },
    { name: "Custom Orthotics", path: "/services/custom-orthotics" },
    { name: "Off-the-Shelf Orthotics", path: "/services/off-the-shelf-orthotics" },
    { name: "Medical Compression", path: "/services/compression" },
    { name: "Mobility Aids", path: "/services/mobility-aids" },
    { name: "Breast and Silicone Prosthetics", path: "/services/breast-prosthetics" },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled || mobileMenuOpen
        ? "border-b border-border/40 bg-[#F5E8F3]/95 backdrop-blur supports-[backdrop-filter]:bg-[#F5E8F3]/80 shadow-sm"
        : ""
    }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={image_4c69079a0a086c245294fb463bb6e821e7f346c9} 
              alt="Cajee Botes Logo" 
              className="h-14 w-14 object-contain"
              onError={(e) => {
                // Fallback to static logo image if GIF fails to load
                const target = e.target as HTMLImageElement;
                target.src = logoFallback;
                target.onerror = null; // Prevent infinite loop
              }}
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-[var(--text-dark)]">
                Cajee Botes
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Orthotist & Prosthetist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm hover:shadow-md active:scale-95 ${ isActive(link.path) ? "bg-[var(--pink-soft)] text-[var(--text-dark)] shadow-sm" : "text-[var(--text-muted)] hover:bg-[var(--purple-soft)] hover:text-[var(--text-dark)]" } text-[#000000]`}
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm hover:shadow-md active:scale-95 ${ isActive("/services") ? "bg-[var(--pink-soft)] text-[var(--text-dark)] shadow-sm" : "text-[var(--text-muted)] hover:bg-[var(--purple-soft)] hover:text-[var(--text-dark)]" } text-[#000000]`}
                onClick={(e) => {
                  e.stopPropagation();
                  setServicesOpen(!servicesOpen);
                }}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-[#FDF1FF] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-4 py-2 text-sm transition-all duration-200 hover:shadow-sm ${ isActive(link.path) ? "bg-[var(--pink-soft)] text-[var(--text-dark)]" : "text-[var(--text-muted)] hover:bg-[var(--purple-soft)] hover:text-[var(--text-dark)]" } text-[#000000]`}
                        onClick={() => setServicesOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/contact#book">
              <Button className="ml-3 bg-[#FDF1FF] hover:bg-[#FDF1FF]/90 text-[var(--text-dark)] rounded-full px-5 h-9 text-sm border-2 border-[var(--text-dark)] text-[#000000]">
                Book Assessment
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--purple-soft)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-[var(--text-dark)]" />
            ) : (
              <Menu className="h-5 w-5 text-[var(--text-dark)]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-[var(--pink-soft)] text-[var(--text-dark)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--purple-soft)] hover:text-[var(--text-dark)]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative">
                <button
                  className={`flex items-center gap-1 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                    isActive("/services")
                      ? "bg-[var(--pink-soft)] text-[var(--text-dark)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--purple-soft)] hover:text-[var(--text-dark)]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileServicesOpen(!mobileServicesOpen);
                  }}
                >
                  Services
                  <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-2 pl-4 flex flex-col space-y-1">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-4 py-2 text-sm rounded-lg ${ isActive(link.path) ? "bg-[var(--pink-soft)] text-[var(--text-dark)]" : "text-[var(--text-muted)] hover:bg-[var(--purple-soft)] hover:text-[var(--text-dark)]" } text-[#000000]`}
                        onClick={() => {
                          setMobileServicesOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/contact#book"
                onClick={() => setMobileMenuOpen(false)}
                className="pt-2"
              >
                <Button className="w-full bg-[#FDF1FF] hover:bg-[#FDF1FF]/90 text-[var(--text-dark)] rounded-full border-2 border-[var(--text-dark)]">
                  Book Assessment
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}