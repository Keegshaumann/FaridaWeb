import { SEO } from "../components/SEO";

export function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        fullTitle="Privacy Policy | Cajee Botes"
        title="Privacy Policy"
        description="How Cajee Botes Orthotist & Prosthetist collects, uses and protects your personal information in line with POPIA."
      />
      {/* Hero Section */}
      <section className="relative bg-[#F5E8F3] bg-[#ffffff00] px-[0px] pt-[90px] pb-[10px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed">
              Your privacy and data protection
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="relative py-16 md:py-24 bg-[#F5E8F3] bg-[#ffffff00]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            
            <div className="prose prose-lg max-w-none">
              {/* Last Updated */}
              <p className="text-sm text-[var(--text-muted)] mb-8">
                <strong>Last Updated:</strong> March 25, 2026
              </p>

              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  1. Introduction
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  Cajee Botes Orthotist Prosthetist ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  By using our website and services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  2. Information We Collect
                </h2>
                
                <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">
                  2.1 Personal Information
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  When you book an assessment or contact us, we may collect:
                </p>
                <ul className="list-disc pl-6 mb-4 text-[var(--text-muted)] space-y-2">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Medical information relevant to your care</li>
                  <li>Address and location details</li>
                  <li>Any other information you voluntarily provide</li>
                </ul>

                <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">
                  2.2 Automatically Collected Information
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  We may automatically collect certain information about your device and usage:
                </p>
                <ul className="list-disc pl-6 mb-4 text-[var(--text-muted)] space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Device information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 mb-4 text-[var(--text-muted)] space-y-2">
                  <li>To provide and maintain our orthotic and prosthetic services</li>
                  <li>To schedule and manage appointments</li>
                  <li>To communicate with you about your care and services</li>
                  <li>To improve our website and user experience</li>
                  <li>To send you relevant information and updates (with your consent)</li>
                  <li>To comply with legal obligations and healthcare regulations</li>
                  <li>To analyze website traffic and usage patterns</li>
                </ul>
              </section>

              {/* Data Protection and Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  4. Data Protection and Security
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 mb-4 text-[var(--text-muted)] space-y-2">
                  <li>Secure server infrastructure</li>
                  <li>Encrypted data transmission (SSL/TLS)</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security assessments</li>
                  <li>Compliance with healthcare data protection standards</li>
                </ul>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security of your data.
                </p>
              </section>

              {/* Cookies and Tracking */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  5. Cookies and Tracking Technologies
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. We use:
                </p>
                <ul className="list-disc pl-6 mb-4 text-[var(--text-muted)] space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (Google Analytics)</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  You can manage your cookie preferences through the cookie consent banner on our website or through your browser settings.
                </p>
              </section>

              {/* Third-Party Services */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  6. Third-Party Services
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  We may use third-party service providers to help us operate our website and services:
                </p>
                <ul className="list-disc pl-6 mb-4 text-[var(--text-muted)] space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                  <li><strong>WhatsApp:</strong> For communication and customer support</li>
                  <li><strong>Email Service Providers:</strong> For sending communications</li>
                  <li><strong>Hosting Providers:</strong> For website hosting and data storage</li>
                </ul>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated to protect your information.
                </p>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  7. Your Rights
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  Under applicable data protection laws, including South Africa's Protection of Personal Information Act (POPIA), you have the right to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-[var(--text-muted)] space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Withdraw consent at any time</li>
                  <li>Request a copy of your data in a portable format</li>
                  <li>Lodge a complaint with the Information Regulator</li>
                </ul>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  To exercise these rights, please contact us using the contact information provided below.
                </p>
              </section>

              {/* Data Retention */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  8. Data Retention
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Medical records and patient information are retained in accordance with healthcare regulations and professional standards.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  9. Children's Privacy
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Our services may be provided to minors with parental or guardian consent. We do not knowingly collect personal information from children without appropriate consent. If you are a parent or guardian and believe we have collected information about a child without consent, please contact us immediately.
                </p>
              </section>

              {/* Changes to This Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  10. Changes to This Privacy Policy
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  11. Contact Us
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-[#FDF1FF] rounded-xl p-6 mb-4">
                  <p className="text-[var(--text-dark)] mb-2">
                    <strong>Cajee Botes Orthotist Prosthetist</strong>
                  </p>
                  <p className="text-[var(--text-muted)] mb-1">
                    <strong>Email:</strong> <a href="mailto:care@cajeebotes.com" className="text-[var(--accent-purple)] hover:underline">care@cajeebotes.com</a>
                  </p>
                  <p className="text-[var(--text-muted)] mb-1">
                    <strong>Phone:</strong> <a href="tel:0646520684" className="text-[var(--accent-purple)] hover:underline">064 652 0684</a>
                  </p>
                  <p className="text-[var(--text-muted)]">
                    <strong>Location:</strong> Centurion, Gauteng, South Africa
                  </p>
                </div>
              </section>

              {/* POPIA Compliance */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                  12. POPIA Compliance
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  We are committed to complying with South Africa's Protection of Personal Information Act (POPIA). We process personal information lawfully, fairly, and transparently, and only for the specific purposes for which it was collected. For more information about POPIA and your rights, please visit the Information Regulator's website at <a href="https://www.justice.gov.za/inforeg/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-purple)] hover:underline">www.justice.gov.za/inforeg/</a>.
                </p>
              </section>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
