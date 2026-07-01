import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  bgColor: "pink" | "purple";
  index?: number;
}

export function ServiceCard({ title, description, image, link, bgColor, index = 0 }: ServiceCardProps) {
  const bgClass = bgColor === "pink" ? "bg-[var(--pink-soft)]" : "bg-[var(--purple-soft)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={link}
        className="group relative overflow-visible rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block"
      >
        <div className={`${bgClass} p-6 pb-8 rounded-2xl h-full flex flex-col min-h-[400px]`}>
          {/* Image container - allows image to "pop out" */}
          <div className="relative -mt-16 mb-6 mx-auto w-full max-w-[240px] aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-[#F5E8F3] rounded-full blur-2xl opacity-60"></div>
            <img
              src={image}
              alt={title}
              className="relative w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="mt-auto">
            <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">
              {title}
            </h3>
            <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-2 text-[var(--text-dark)] group-hover:gap-3 transition-all">
              <span className="text-sm font-medium">Learn more</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}