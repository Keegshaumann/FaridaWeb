import type React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router";
import { Button } from "./button";
import { WordPullUp } from "./word-pull-up";
import compressionHand from "@/assets/77d6f8e28b13c674cd884a45561314f8bc9c3747.webp";
import prostheticHand from "@/assets/bc7cb1d93a78168a45badcfc409e4f0629d4e07d.webp";
import { Warp } from "@paper-design/shaders-react";

export function MedicalHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Warp Shader Background */}
      <div className="absolute inset-0 z-0">
        <Warp
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
            "hsl(310, 35%, 72%)",
            "hsl(300, 30%, 68%)",
            "hsl(305, 33%, 75%)",
            "hsl(302, 32%, 70%)",
          ]}
        />
      </div>

      {/* Overlapping Images - Desktop Only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-[1]">
        {/* Human Hand with Compression - Top Right */}
        <img
          src={compressionHand}
          alt="Compression orthotic device"
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
          className="absolute bottom-0 left-0 h-full w-auto object-cover animate-arm-left"
          style={{ 
            transform: 'translateX(0)',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.2))',
            minWidth: '50vw',
            objectPosition: 'left bottom'
          }}
        />
      </div>

      {/* Content - Title Bottom Left, Paragraph & Buttons Right */}
      <div ref={contentRef} className="relative z-10 h-full flex items-end px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20">
        <div className="container mx-auto max-w-7xl w-full flex flex-col lg:flex-row items-end justify-between gap-8">
          {/* Title - Bottom Left */}
          <div className="lg:max-w-xl">
            <WordPullUp
              words="Restoring Movement. Supporting Independence."
              className="text-left text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ mixBlendMode: 'difference', color: 'white' }}
            />
          </div>
          
          {/* Paragraph & Buttons - Right Side */}
          <div className="max-w-md text-left lg:text-right">
            <p className="mb-6 leading-relaxed text-sm lg:text-base" style={{ mixBlendMode: 'difference', color: 'white' }}>
              Care begins with understanding your condition, goals, and daily environment. We provide clinician-led, individualised support for people living with injury, illness, or physical impairment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-start lg:justify-end">
              <Link to="/contact#book">
                <Button size="lg" className="bg-[#F5E8F3] hover:bg-[#F5E8F3]/90 text-[var(--text-dark)] rounded-full px-6 h-11 shadow-lg border-2 border-[var(--text-dark)]">
                  Book an Assessment
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="rounded-full px-6 h-11 border-2 border-[var(--text-dark)] text-[var(--text-dark)] bg-[#F5E8F3] hover:bg-[#F5E8F3]/90">
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