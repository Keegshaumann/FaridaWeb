import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Array<{
    text: string;
    image: string;
    name: string;
    role: string;
  }>;
  duration?: number;
}) => {
  // Duplicate the testimonials array for infinite scroll effect
  const duplicatedTestimonials = [...props.testimonials, ...props.testimonials];

  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background bg-[#ffffff1c]"
      >
        {duplicatedTestimonials.map(({ text, image, name, role }, index) => (
          <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full bg-[#F5E8F3]" key={index}>
            <div className="text-[var(--text-muted)] leading-relaxed">{text}</div>
            <div className="flex items-center gap-2 mt-5">
              <img
                width={40}
                height={40}
                src={image}
                alt={name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="font-medium tracking-tight leading-5 text-[var(--text-dark)]">{name}</div>
                <div className="leading-5 opacity-60 tracking-tight text-[var(--text-muted)] text-sm">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};