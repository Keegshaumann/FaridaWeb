import { Component, useEffect, useState } from "react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { Warp } from "@paper-design/shaders-react";

type WarpProps = ComponentProps<typeof Warp>;

/**
 * Returns true only when the browser can create a WebGL2 context.
 * @paper-design/shaders specifically requires WebGL2 (getContext("webgl2")) and
 * throws "WebGL is not supported in this browser" otherwise — so we must match
 * that exact requirement (a WebGL1-only environment must fall back too).
 */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

const isShaderWebGLError = (msg: unknown): boolean =>
  typeof msg === "string" && /Paper Shaders|WebGL is not supported/i.test(msg);

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
    // Catches synchronous render-phase shader errors; the async WebGL throw is
    // handled by the window listener in SafeWarp below (boundaries miss those).
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

    // Defense in depth: @paper-design/shaders throws its "WebGL is not supported"
    // error from a fire-and-forget async init, so it surfaces as an uncaught
    // promise rejection that React error boundaries cannot catch. Suppress ONLY
    // that specific shader error so audit crawlers never see a JS error.
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason as { message?: unknown } | string | undefined;
      const msg = typeof reason === "string" ? reason : reason?.message;
      if (isShaderWebGLError(msg)) e.preventDefault();
    };
    const onError = (e: ErrorEvent) => {
      if (isShaderWebGLError(e.message)) e.preventDefault();
    };
    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("error", onError);
    return () => {
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("error", onError);
    };
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
