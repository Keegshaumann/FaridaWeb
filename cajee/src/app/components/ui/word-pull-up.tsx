"use client";

import { Fragment } from "react";
import { motion, Variants } from "motion/react";

import { cn } from "./utils";

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
  style?: React.CSSProperties;
}

export function WordPullUp({
  words,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
  style,
}: WordPullUpProps) {
  return (
    <motion.h1
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
      style={style}
    >
      {words.split(" ").map((word, i, all) => (
        // A real space is emitted between words so the heading still reads as a
        // sentence to crawlers and screen readers, not one run-on string.
        // Size and colour are inherited from the heading so the caller's
        // responsive classes actually take effect.
        <Fragment key={i}>
          <motion.span variants={framerProps} style={{ display: "inline-block" }}>
            {word === "" ? <span>&nbsp;</span> : word}
          </motion.span>
          {i < all.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.h1>
  );
}