import { Link } from "react-router";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

interface ServiceCardPremiumProps {
  index: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  link: string;
}

export function ServiceCardPremium({
  index,
  title,
  description,
  image,
  features,
  link,
}: ServiceCardPremiumProps) {
  const indexFormatted = index.toString().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      {/* Card Container */}
      <div className="relative h-full bg-[var(--text-dark)] rounded-3xl p-6 pt-24 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-visible">
        {/* Floating Image - Sticking out the top left */}
        <div className="absolute -top-32 -left-4 w-[400px] h-80 transition-transform duration-300 z-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[var(--accent-purple)] rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            {/* Image */}
            <img
              src={image}
              alt={title}
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Index Number */}
        <div className="absolute top-6 right-6 text-5xl font-bold text-[var(--accent-purple)] opacity-20 select-none">
          {indexFormatted}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow relative z-20">
          {/* Title */}
          <h3 className="text-2xl font-bold text-[#FDF1FF] mb-4 pr-12">
            {title}
          </h3>

          {/* Description */}
          <p className="text-[#FDF1FF]/80 leading-relaxed mb-6 text-sm">
            {description}
          </p>

          {/* Features List */}
          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent-purple)]/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-[var(--accent-purple)]" />
                </div>
                <span className="text-[#FDF1FF]/70 text-sm leading-snug">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link to={link} className="mt-auto">
            <Button className="w-full bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/90 text-white rounded-full py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
              Learn More
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}