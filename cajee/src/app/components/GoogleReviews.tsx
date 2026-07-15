import { Star, ExternalLink } from "lucide-react";
import { trackButtonClick } from "./GoogleAnalytics";

// Verbatim patient reviews from the practice's Google Business Profile
// (place ChIJF3_HdUqDCiURFV3mDn1et2Y, retrieved July 2026). Spellings are the
// reviewers' own. Do NOT edit quotes; update by re-pulling from Google.
const REVIEWS = [
  {
    name: "Nazren Patel",
    text: "Thank you Farida, my legs feel so much better since you fitted my compression stockings. Your consistent professional and caring service is commended. It was so convenient, fittment was done in the comfort of my home.",
  },
  {
    name: "Wayne Fakkel",
    text: "Farida assisted my wife with a knee brace for her knee. She did a house-call to do the measurements as she is working full day. She provided us with different options and pricing. It is refreshing to be assisted with someone that is passionate about their work.",
  },
  {
    name: "Ronell Du Toit",
    text: "Farida is the most kind Orthotist & Prosthetist any one could wish for! She is very knowledgeable, helpful, & patient and she absolutely takes her time to explain everything in detail to her patients! Farida I am truely so Blessed to have met you and be a patient of yours. May your practise go from strength to strength!",
  },
  {
    name: "Kattleen Govindasamy",
    text: "I had such a wonderful experience with my prosthetist, Farida! She did a cosmetic shaping for me and the results came out absolutely amazing. I truly can't compliment her enough on her time, precision, and attention to detail — it really shows in her work. What stood out the most was her patience and the way she takes the time to reassure and guide her clients throughout the process. Highly recommend Farida to anyone looking for exceptional skill, care, and professionalism!",
  },
];

const READ_REVIEWS_URL = "https://search.google.com/local/reviews?placeid=ChIJF3_HdUqDCiURFV3mDn1et2Y";
const LEAVE_REVIEW_URL = "https://g.page/r/CRVd5g59XrdmEAI/review";

const AVATAR_COLORS = ["bg-[var(--purple-medium)]", "bg-[var(--accent-purple)]", "bg-[var(--pink-medium)]", "bg-[var(--text-dark)]"];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#f5b301] text-[#f5b301]" />
      ))}
    </div>
  );
}

export function GoogleReviews() {
  return (
    <section className="relative py-16 md:py-24 bg-[#F5E8F3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-3">
            What Patients Say on Google
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Stars />
            <span className="text-sm font-semibold text-[var(--text-dark)]">5.0 on Google Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {REVIEWS.map((review, i) => (
            <figure key={review.name} className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[var(--purple-soft)]/50">
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                >
                  {review.name.charAt(0)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-[var(--text-dark)]">{review.name}</span>
                  <span className="text-xs text-[var(--text-muted)]">Google review</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={READ_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--text-dark)]/30 px-6 py-3 text-sm font-semibold text-[var(--text-dark)] transition-all hover:bg-white"
            onClick={() => trackButtonClick("read_google_reviews", "reviews_section")}
          >
            Read all reviews on Google
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={LEAVE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--text-dark)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--text-dark)]/90"
            onClick={() => trackButtonClick("google_review", "reviews_section")}
          >
            <Star className="h-4 w-4 fill-current" />
            Leave a review
          </a>
        </div>
      </div>
    </section>
  );
}
