interface PageHeroProps {
  title: string;
  subtitle?: string;
  bgColor?: "pink" | "purple" | "default";
}

export function PageHero({ title, subtitle, bgColor = "default" }: PageHeroProps) {
  const bgClass = 
    bgColor === "pink" 
      ? "bg-gradient-to-br from-[var(--pink-light)] to-[var(--pink-soft)]" 
      : bgColor === "purple"
      ? "bg-gradient-to-br from-[var(--purple-light)] to-[var(--purple-soft)]"
      : "bg-gradient-to-br from-[var(--pink-light)] via-white to-[var(--purple-light)]";

  return (
    null
  );
}
