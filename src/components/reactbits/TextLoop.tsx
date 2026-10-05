// Versão provisória com as mesmas props do TextLoop do ReactBits (formas: "wave" e "straight").
// Quando quiser, substitua este arquivo pelo original: o import continua igual.
import { useEffect, useId, useRef, useState } from "react";

type Props = {
  text: string;
  shape?: string;
  speed?: number;
  direction?: string;
  separator?: string;
  curviness?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  uppercase?: boolean;
  color?: string;
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  pauseOnHover?: boolean;
};

export default function TextLoop({
  text,
  shape = "wave",
  speed = 80,
  direction = "forward",
  separator = "✦",
  curviness = 20,
  fontSize = 40,
  fontWeight = 700,
  letterSpacing = 0,
  uppercase = false,
  color = "#fff",
  ribbon = false,
  ribbonColor = "#000",
  ribbonWidth = 80,
  pauseOnHover = false,
}: Props) {
  const id = useId().replace(/:/g, "");
  const wrap = useRef<HTMLDivElement>(null);
  const measure = useRef<SVGTextElement>(null);
  const tp = useRef<SVGTextPathElement>(null);
  const paused = useRef(false);
  const [w, setW] = useState(1200);
  const [unit, setUnit] = useState(0);

  const gap = "\u00A0\u00A0";
  const label = (uppercase ? text.toUpperCase() : text) + gap + separator + gap;
  const amp = shape === "wave" ? curviness : 0;
  const h = (ribbon ? ribbonWidth : fontSize * 1.6) + amp * 2;
  const cy = h / 2;
  const font = {
    fontFamily: "var(--display)",
    fontSize,
    fontWeight,
    letterSpacing,
  } as const;

  // Largura do container
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setW(Math.max(1, e.contentRect.width)),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Comprimento de uma repetição do texto (medido depois que a fonte carrega)
  useEffect(() => {
    const m = () => setUnit(measure.current?.getComputedTextLength() ?? 0);
    m();
    document.fonts?.ready.then(m);
  }, [label, fontSize, fontWeight, letterSpacing]);

  // Animação: desliza o texto ao longo do caminho, em loop sem emenda
  useEffect(() => {
    if (!unit || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let raf = 0;
    let last = performance.now();
    let off = 0;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused.current) off = (off + speed * dt) % unit;
      tp.current?.setAttribute(
        "startOffset",
        String(direction === "backward" ? off : unit - off),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [unit, speed, direction]);

  // Caminho (reto ou ondulado) com folga de uma repetição de cada lado
  const q = 150;
  const start = -unit;
  const span = w + unit * 2;
  const segs = Math.ceil(span / (2 * q)) + 1;
  let d = `M ${start} ${cy}`;
  if (amp) {
    d += ` Q ${start + q} ${cy - amp * 2} ${start + 2 * q} ${cy}`;
    for (let i = 2; i <= segs; i++) d += ` T ${start + i * 2 * q} ${cy}`;
  } else {
    d += ` L ${start + segs * 2 * q} ${cy}`;
  }
  const repeats = unit ? Math.ceil((span + unit) / unit) + 1 : 1;

  return (
    <div
      ref={wrap}
      onPointerEnter={() => {
        if (pauseOnHover) paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
    >
      <svg
        width="100%"
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ display: "block", overflow: "hidden" }}
        role="presentation"
      >
        <defs>
          <path id={id} d={d} />
        </defs>
        {ribbon && (
          <use
            href={`#${id}`}
            stroke={ribbonColor}
            strokeWidth={ribbonWidth}
            fill="none"
          />
        )}
        <text ref={measure} style={font} visibility="hidden">
          {label}
        </text>
        <text style={font} fill={color} dy={fontSize * 0.35}>
          <textPath ref={tp} href={`#${id}`} startOffset={unit}>
            {label.repeat(repeats)}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
