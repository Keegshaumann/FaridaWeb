import type { BodyView } from "./anatomy-data";

/**
 * Anatomical figure for the body map — a clean render of the actual muscular
 * anatomy model (CC0). Front/back PNGs live in /public/anatomy and are swappable
 * without touching the map logic. The parent overlays hotspots by percentage,
 * so the image sits behind them at object-contain within a fixed aspect box.
 */
export function AnatomyFigure({ view }: { view: BodyView }) {
  return (
    <img
      src={`/anatomy/${view}.png`}
      alt={`Anatomical ${view} view of the human muscular system`}
      className="pointer-events-none h-full w-full select-none object-contain"
      draggable={false}
      loading="lazy"
    />
  );
}
