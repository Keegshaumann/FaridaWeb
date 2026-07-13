import { ServicePageTemplate } from "../../components/ServicePageTemplate";

export function CompressionPage() {
  return (
    <ServicePageTemplate
      serviceSlug="compression"
      title="Medical Compression Management"
      subtitle="Therapeutic compression for lymphatic and circulatory support"
      whatIsIt="Compression garments are therapeutic devices designed to apply graduated pressure to improve circulation, support the lymphatic system, and manage fluid build-up. They are medically prescribed and individually measured for optimal therapeutic effect."
      benefits={[
        "Reducing and preventing swelling",
        "Supporting lymphatic drainage",
        "Improving venous return",
        "Preventing fluid accumulation",
        "Supporting wound and ulcer healing",
        "Softening fibrotic tissue",
        "Managing post-operative oedema",
        "Reducing leg fatigue and discomfort",
        "Improving recovery after sport or travel",
      ]}
      availableServices={[
        "Flat-Knit Compression Garments",
        "Circular-Knit Compression Garments",
        "Night Compression Garments",
        "Adjustable Compression Wraps",
        "Custom Compression Prescription",
        "Garment Measurement and Fitting",
      ]}
      clinicalApproach="Compression therapy requires careful prescription. We conduct thorough assessment to determine the appropriate compression dosage (mmHg), stiffness, garment type, textile, and material. Garments are measured and fitted in practice, home, or hospital settings as needed."
      seoTitle="Medical Compression Garments | Lymphedema & Edema Treatment"
      seoFullTitle="Medical Compression Garments & Lymphoedema | Cajee Botes"
      seoDescription="Medical-grade compression garments for lymphoedema, oedema, scar and post-surgical care — individually measured and fitted in South Africa."
      seoKeywords="medical compression garments, lymphedema treatment, compression stockings, edema management, compression therapy, lymphedema specialist, compression garment fitting, medical compression South Africa"
      additionalSections={
        <>
          {/* Clinical Indications */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6">
              Clinical Indications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Lymphoedema",
                "Lipedema",
                "Chronic Venous Insufficiency",
                "Varicose Veins",
                "Deep Vein Thrombosis Risk",
                "Post-Surgical Swelling",
                "Pregnancy-Related Oedema",
                "Sports Recovery",
                "Travel-Related Swelling",
              ].map((indication, index) => (
                <div
                  key={index}
                  className="bg-[var(--pink-soft)] rounded-xl p-5 border border-[var(--pink-medium)]"
                >
                  <p className="text-[var(--text-dark)]">{indication}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Understanding Compression */}
          <section className="bg-[var(--purple-light)] rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6">
              Understanding Compression
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[var(--text-dark)] mb-2">
                  Compression Dosage (mmHg)
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Compression strength is measured in millimeters of mercury (mmHg). The appropriate dosage depends on your condition, tissue health, and treatment goals.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-dark)] mb-2">
                  Stiffness and Elasticity
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Garments vary in stiffness. Stiffer garments provide more support during movement, while elastic garments are easier to apply and suitable for maintenance therapy.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-dark)] mb-2">
                  Garment Types
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Flat-knit garments are custom-made for complex shapes. Circular-knit garments are ready-to-wear and suitable for mild to moderate swelling. Night garments and wraps offer alternative support options.
                </p>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}