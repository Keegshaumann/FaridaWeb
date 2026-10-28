import type React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router";
import { Button } from "./button";
import { WordPullUp } from "./word-pull-up";
import compressionHand from "@/assets/77d6f8e28b13c674cd884a45561314f8bc9c3747.webp";
import prostheticHand from "@/assets/bc7cb1d93a78168a45badcfc409e4f0629d4e07d.webp";
import { SafeWarp } from "./safe-warp";
import { imageSize } from "../../data/image-sizes";

export function MedicalHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    // min-h rather than h: on a phone held sideways the text is taller than
    // the screen, and with a fixed height it ran up under the header. The
    // content block's pt-24 keeps it clear of the header; when the text fits,
    // nothing changes.
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Warp Shader Background */}
      <div className="absolute inset-0 z-0">
        <SafeWarp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={[
            "hsl(202, 45%, 72%)",
            "hsl(208, 42%, 66%)",
            "hsl(198, 48%, 75%)",
            "hsl(205, 44%, 69%)",
          ]}
        />
      </div>

      {/* Overlapping Images - Desktop Only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-[1]">
        {/* Human Hand with Compression - Top Right */}
        <img
          src={compressionHand}
          alt="Compression orthotic device"
          {...imageSize(compressionHand)}
          className="absolute top-0 right-0 h-full w-auto object-cover animate-arm-right"
          style={{ 
            transform: 'translateX(0)',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))',
            minWidth: '50vw',
            objectPosition: 'right top'
          }}
        />
        
        {/* Robot/Prosthetic Arm - Bottom Left */}
        <img
          src={prostheticHand}
          alt="Prosthetic device"
          {...imageSize(prostheticHand)}
          className="absolute bottom-0 left-0 h-full w-auto object-cover animate-arm-left"
          style={{ 
            transform: 'translateX(0)',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.2))',
            minWidth: '50vw',
            objectPosition: 'left bottom'
          }}
        />
      </div>

      {/* Content - Title Bottom Left, Paragraph & Buttons Right.
          lg:pb-40: on desktop the text block sits above the light fade at the
          bottom of the hero, and the buttons clear the fixed WhatsApp badge
          (its top is 136px off the bottom; the buttons now end 160px off it). */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex items-end px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pb-40">
        <div className="container mx-auto max-w-7xl w-full flex flex-col lg:flex-row items-end justify-between gap-8">
          {/* Title - Bottom Left. The scrim is a soft brand-navy shade behind the
              white text (see .hero-scrim in index.css): over the pale animated
              background the text measured about 2:1 without it. */}
          <div className="relative lg:max-w-2xl">
            <div aria-hidden="true" className="hero-scrim hero-scrim--title" />
            <WordPullUp
              words="Orthotics, Prosthetics and Medical Compression in Sandton"
              className="hero-text text-left text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: 'white' }}
            />
            <p
              className="hero-text mt-4 text-base md:text-lg lg:text-xl leading-relaxed"
              style={{ color: 'white' }}
            >
              Restoring movement through orthotics, prosthetics &amp; compression therapy
            </p>
          </div>
          
          {/* Paragraph & Buttons - Right Side */}
          <div className="max-w-md text-left lg:text-right">
            <div className="relative mb-6">
              <div aria-hidden="true" className="hero-scrim hero-scrim--copy" />
              <p className="hero-text leading-relaxed text-sm lg:text-base" style={{ color: 'white' }}>
                Care starts with understanding your condition, your goals and your daily surroundings. It's led by a clinician and planned around you, for people living with an injury, an illness or a physical impairment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-start lg:justify-end">
              <Link to="/contact#book">
                <Button size="lg" className="bg-[#E9F4FB] hover:bg-[#E9F4FB]/90 text-[var(--text-dark)] rounded-full px-6 h-11 shadow-lg border-2 border-[var(--text-dark)]">
                  Book an Assessment
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="rounded-full px-6 h-11 border-2 border-[var(--text-dark)] text-[var(--text-dark)] bg-[#E9F4FB] hover:bg-[#E9F4FB]/90">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}