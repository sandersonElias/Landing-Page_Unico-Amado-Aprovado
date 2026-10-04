// Versão provisória com a mesma API do Scroll Expand do ReactBits.
// Quando quiser, substitua este arquivo pelo original: o import continua igual.
import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  src: string; alt?: string; title?: string; scrollHint?: string; children?: ReactNode;
  startWidth?: number; startHeight?: number; startRadius?: number; endRadius?: number;
  mediaZoom?: number; scrollDistance?: number; holdDistance?: number;
  smoothing?: number; overlayScrim?: number; enabled?: boolean; useWindowScroll?: boolean;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ScrollExpand({
  src, alt = '', title, scrollHint, children,
  startWidth = 42, startHeight = 58, startRadius = 24, endRadius = 0,
  mediaZoom = 1.35, scrollDistance = 1.2, holdDistance = 0.35,
  smoothing = 0.1, overlayScrim = 0.45, enabled = true,
}: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const titleEl = useRef<HTMLDivElement>(null);
  const hintEl = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const active = enabled && !reduce;

  useEffect(() => {
    let cur = active ? 0 : 1;
    let raf = 0;
    const paint = (p: number) => {
      if (!frame.current || !img.current || !body.current) return;
      frame.current.style.width = `${lerp(startWidth, 100, p)}%`;
      frame.current.style.height = `${lerp(startHeight, 100, p)}%`;
      frame.current.style.borderRadius = `${lerp(startRadius, endRadius, p)}px`;
      img.current.style.transform = `scale(${lerp(mediaZoom, 1, p)})`;
      if (titleEl.current) titleEl.current.style.opacity = String(1 - clamp(p / 0.45));
      if (hintEl.current) hintEl.current.style.opacity = String(1 - clamp(p / 0.2));
      const o = clamp((p - 0.75) / 0.25);
      body.current.style.opacity = String(o);
      body.current.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
    };
    const tick = () => {
      let target = 1;
      if (active && outer.current) {
        target = clamp(-outer.current.getBoundingClientRect().top / (scrollDistance * window.innerHeight));
      }
      cur += (target - cur) * clamp(smoothing, 0.01, 1);
      if (Math.abs(target - cur) < 0.0005) cur = target;
      paint(cur);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [active, startWidth, startHeight, startRadius, endRadius, mediaZoom, scrollDistance, smoothing]);

  const height = active ? `${(1 + scrollDistance + holdDistance) * 100}svh` : '100svh';
  return (
    <div ref={outer} style={{ height }} className="se-outer">
      <div className="se-stage">
        <div ref={frame} className="se-frame">
          <img ref={img} src={src} alt={alt} className="se-img" />
          <div className="se-scrim" style={{ opacity: overlayScrim }} />
          {title && <div ref={titleEl} className="se-title"><h2>{title}</h2></div>}
          {scrollHint && <div ref={hintEl} className="se-hint">{scrollHint}</div>}
          <div ref={body} className="se-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
