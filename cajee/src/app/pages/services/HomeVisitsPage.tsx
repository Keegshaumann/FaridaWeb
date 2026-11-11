import { Phone, MessageCircle, Check } from "lucide-react";
import { ServicePageTemplate } from "../../components/ServicePageTemplate";
import type { Faq } from "../../components/FaqSection";

// T-29: the home and hospital visits service page. Every line here restates
// something the site already said before this page existed (the home visits
// article, the service FAQs, the contact page, the footer and the terms), and
// the owner confirmed on 11 Nov 2026 that she still does home and hospital
// visits. Nothing on this page is new: no travel area, price, response time,
// equipment or clinical outcome that the site did not already state. Fees and
// call-out times are deliberately absent: Farida has not given them.

const homeVisitsFaqs: Faq[] = [
  {
    q: "Do you do home visits for orthotics and prosthetics?",
    a: "Yes. Farida Cajee-Botes travels for home and hospital visits across Johannesburg, Sandton, Midrand, Centurion and Pretoria. Assessment, measuring, casting or scanning, most off-the-shelf fittings, compression fitting, mobility aid set-up and reviews can all be done where you are. Visits are by prior arrangement: call or WhatsApp 079 998 2203 to arrange one.",
  },
  {
    q: "Can you see a patient in hospital before discharge?",
    a: "Yes. At the bedside the work is organised around the discharge date. The referral usually comes from the treating surgeon, physiotherapist, occupational therapist or hospital case manager, and the aim is that whatever the patient needs to leave safely, such as a brace, a compression garment, a walking aid, a wheelchair or a plan for a future prosthesis, is measured before discharge rather than chased for weeks afterwards. We work around ward rounds and therapy sessions, and send our findings to the treating team.",
  },
  {
    q: "What can't be done at home?",
    a: "Making a custom device. Custom sockets and braces need workshop ovens, vacuum equipment and grinding, so a custom device usually means two visits: assessment and casting first, then fitting once it has been made off site. Prosthetic alignment work is also faster at the rooms, where the bench and tools already are.",
  },
  {
    q: "Do you have consulting rooms in Centurion or Pretoria?",
    a: "No. The consulting rooms are at Orthocast Morningside, 173 Rivonia Road, Rochester Place, Block F, Ground Floor, Sandton, by appointment (011 883 9100). In Centurion and Pretoria, care is a mobile visit to your home, a hospital ward or a care facility.",
  },
  {
    q: "How long does a home visit take?",
    a: "A first assessment takes noticeably longer than a follow-up review, because it includes the history, examination and measuring, and casting adds time because plaster has to set. We give a realistic estimate when you book, so lifts, carers and transport can be arranged around it.",
  },
  {
    q: "Should a family member or carer be there?",
    a: "Yes, if they help day to day. If a spouse, an adult child or a carer will be putting on a compression stocking, a prosthesis or a brace, they need to learn it with their hands on the device, so ask them to be in the room for the visit.",
  },
];

const sectionHeading = "text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6";
const bodyText = "text-lg text-[var(--text-muted)] leading-relaxed";

const haveReady = [
  "A firm chair or the bed, enough floor space to kneel beside a leg, a clear stretch of passage to walk down, and good light.",
  "If casting is planned, an old sheet or towels and a basin of water, because plaster drips.",
  "Your ID and medical aid card, any referral or prescription, the discharge summary or operation notes, and a list of current medicines.",
  "Any braces, prostheses or stockings you already have, and the shoes you wear every day.",
];

function VisitDetails() {
  return (
    <>
      <section>
        <h2 className={sectionHeading}>Where we visit</h2>
        <p className={bodyText}>
          Farida travels for home and hospital visits across Johannesburg, Sandton, Midrand,
          Centurion and Pretoria. The only consulting rooms are at Orthocast Morningside in
          Sandton, so in Centurion and Pretoria care is a mobile visit to your home, a hospital
          ward or a care facility. Visits are by prior arrangement, subject to availability and
          travel area.
        </p>
      </section>

      <section>
        <h2 className={sectionHeading}>How to arrange a visit</h2>
        <p className={bodyText}>
          Call or WhatsApp the home visits line. Tell us where the patient is (at home, in a
          ward or in a care facility), what has happened, any discharge date, and any red or
          broken skin, so the right padding and offloading options come along.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <a
            href="tel:+27799982203"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 border-[var(--text-dark)] px-6 text-base font-medium text-[var(--text-dark)] hover:bg-white/60"
          >
            <Phone className="h-5 w-5" />
            Call 079 998 2203
          </a>
          <a
            href="https://wa.me/27799982203"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BA5A] px-6 text-base font-semibold text-white"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp 079 998 2203
          </a>
        </div>
      </section>

      <section>
        <h2 className={sectionHeading}>What to have ready</h2>
        <ul className="space-y-3">
          {haveReady.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="h-6 w-6 text-[var(--accent-purple)] flex-shrink-0 mt-0.5" />
              <span className="text-base text-[var(--text-muted)] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className={`${bodyText} mt-6`}>
          There is no need to tidy up on our account: the loose rug and the awkward step are part
          of the assessment.
        </p>
      </section>
    </>
  );
}

export function HomeVisitsPage() {
  return (
    <ServicePageTemplate
      faqs={homeVisitsFaqs}
      relatedSlugs={["orthotist-home-visits-gauteng", "how-long-after-amputation-prosthetic-leg", "referral-orthotist-prosthetist-first-visit"]}
      title="Orthotist Home and Hospital Visits in Gauteng"
      subtitle="When getting to the rooms is the hard part: orthotic, prosthetic and compression assessment and fitting at your home or hospital bedside"
      whatIsIt="A home or hospital visit is the same assessment you would have at the rooms, carried out where you already are: your home, a hospital ward or a care facility. The history, examination, measuring, casting or scanning, and most fittings can all be done there. Making a custom device cannot, so a custom device usually means two visits, with the making done off site in between."
      benefits={[
        "No trip to the rooms when travel is the obstacle: after an operation or an amputation, after a stroke, or when you are bed-bound or chair-bound",
        "Your device is chosen against your real doorways, bed height, bathroom and stairs",
        "In hospital, the aim is to measure what you need to go home before discharge, not weeks afterwards",
        "The person who helps you every day can be in the room and be taught with their hands on the device",
        "Compression measuring and fitting booked early in the day",
        "Breast form fittings in private, in your own room, with your own bras to try against",
      ]}
      availableServices={[
        "Assessment and measuring",
        "Plaster casting or scanning for custom devices",
        "Most off-the-shelf brace fittings",
        "Compression measuring and fitting",
        "Mobility aid and wheelchair set-up",
        "Breast prosthesis fitting",
        "Reviews, strap and padding adjustments, and skin checks",
        "Training for family and carers",
      ]}
      additionalSections={<VisitDetails />}
      clinicalApproach="A home or hospital visit earns its place when travel is genuinely the obstacle, when a device has to be judged against a real staircase or bathroom door, or when a discharge date is coming. If you can be driven to Sandton comfortably, a rooms appointment is often the better choice: there is more stock to try, and prosthetic alignment work is faster where the bench and tools already are. Tell us the situation and we will say which makes more sense."
      seoTitle="Home and Hospital Visits"
      seoFullTitle="Orthotist Home Visits Across Gauteng | Farida Cajee-Botes"
      seoDescription="Can't get to the rooms? Orthotist and prosthetist visits at home or in hospital across Johannesburg, Sandton, Midrand, Centurion and Pretoria."
      seoKeywords="orthotist home visits, prosthetist home visits, mobile orthotist Gauteng, orthotist hospital visits, home visit prosthetist Johannesburg, orthotist Pretoria, orthotist Centurion, orthotist Midrand"
    />
  );
}
