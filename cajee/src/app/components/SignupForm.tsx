import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { trackFormSubmission } from "./GoogleAnalytics";

interface SignupFormProps {
  onSuccess?: () => void;
}

export function SignupForm({ onSuccess }: SignupFormProps = {}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const services = [
    "Prosthetics",
    "Custom Orthotics",
    "Off-the-Shelf Orthotics",
    "Medical Compression",
    "Mobility Aids",
    "Breast and Silicone Prosthetics",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.service) {
      setError("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/signups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
      });

      if (onSuccess) {
        onSuccess();
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

      // Track form submission
      trackFormSubmission("assessment_request", {
        service: formData.service,
        has_phone: !!formData.phone,
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[var(--text-dark)] mb-1"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--text-dark)]/20 focus:border-[var(--accent-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]/20 transition-colors bg-white"
          placeholder="Enter your full name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--text-dark)] mb-1"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--text-dark)]/20 focus:border-[var(--accent-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]/20 transition-colors bg-white"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[var(--text-dark)] mb-1"
        >
          Phone Number <span className="text-sm text-[var(--text-muted)]">(Optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--text-dark)]/20 focus:border-[var(--accent-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]/20 transition-colors bg-white"
          placeholder="064 123 4567"
        />
      </div>

      {/* Service Dropdown */}
      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-[var(--text-dark)] mb-1"
        >
          Service Required <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--text-dark)]/20 focus:border-[var(--accent-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]/20 transition-colors bg-white appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1.5rem",
          }}
        >
          <option value="">Select a service...</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {submitted && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700 font-medium">
            Thank you! We'll be in touch soon.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/90 text-white rounded-full px-8 py-5 text-base font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Request Assessment"}
      </Button>

      <p className="text-xs text-center text-[var(--text-muted)] mt-2">
        By submitting this form, you agree to be contacted regarding your request.
      </p>
    </form>
  );
}