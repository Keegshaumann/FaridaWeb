import { Component, useEffect, useState } from "react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { Warp } from "@paper-design/shaders-react";

type WarpProps = ComponentProps<typeof Warp>;

/**
 * Returns true only when the browser can actually create a WebGL context.
 * Headless crawlers (and some browsers/devices) have no WebGL, in which case
 * @paper-design/shaders throws "WebGL is not supported in this browser".
 */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** Build a CSS gradient from the shader's colour list so the fallback matches. */
function gradientFromColors(colors?: readonly string[]): string {
  const c = colors && colors.length ? [...colors] : ["hsl(310, 35%, 72%)", "hsl(300, 30%, 68%)"];
  if (c.length === 1) c.push(c[0]);
  const stops = c
    .map((color, i) => `${color} ${Math.round((i / (c.length - 1)) * 100)}%`)
    .join(", ");
  return `linear-gradient(135deg, ${stops})`;
}

class ShaderErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Swallow any shader/WebGL error; the CSS gradient fallback is shown instead.
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/**
 * Drop-in replacement for @paper-design's <Warp> that degrades gracefully.
 * It renders a matching CSS gradient when WebGL is unavailable or the shader
 * throws, so pages never crash (and audit crawlers report no JS errors).
 */
export function SafeWarp(props: WarpProps) {
  const [webglReady, setWebglReady] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglReady(hasWebGL());
  }, []);

  const fallback = (
    <div
      aria-hidden="true"
      style={{
        ...(props.style as CSSProperties),
        background: gradientFromColors(props.colors as string[] | undefined),
      }}
    />
  );

  // Before detection resolves, or when WebGL is unavailable, show the gradient.
  if (webglReady !== true) return fallback;

  return <ShaderErrorBoundary fallback={fallback}>{<Warp {...props} />}</ShaderErrorBoundary>;
}
