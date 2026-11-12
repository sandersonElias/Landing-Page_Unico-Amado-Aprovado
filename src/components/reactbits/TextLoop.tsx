// Versão provisória com as mesmas props do TextLoop do ReactBits (formas: "wave" e "straight").
// Extra: dentro de `text` e `separator` dá para usar ícones SVG com {heart}, {crown}, {cross} e {sparkle}.
// Quando quiser, substitua este arquivo pelo original (os ícones {…} só existem nesta versão).
import { useEffect, useId, useMemo, useRef, useState } from "react";

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

// Ícones desenhados numa grade 24 × 24
const ICONS: Record<string, string> = {
  heart:
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  crown:
    "M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z",
  cross: "M10 2h4v6h6v4h-6v10h-4V12H4V8h6z",
  sparkle:
    "M12 1Q12.8 11.2 23 12Q12.8 12.8 12 23Q11.2 12.8 1 12Q11.2 11.2 12 1Z",
};
const SLOT = "\u2003"; // espaço largo que reserva o lugar do ícone dentro do texto
type Part = { t: "text"; v: string } | { t: "icon"; n: string };
const parse = (s: string): Part[] =>
  s
    .split(/(\{\w+\})/)
    .filter(Boolean)
    .map((p): Part => {
      const m = /^\{(\w+)\}$/.exec(p);
      return m && ICONS[m[1]] ? { t: "icon", n: m[1] } : { t: "text", v: p };
    });

export default function TextLoop({
  text,
  shape = "wave",
  speed = 80,
  direction = "forward",
  separator = "{sparkle}",
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
  const icons = useRef<(SVGGElement | null)[]>([]);
  const paused = useRef(false);
  const [w, setW] = useState(1200);
  const [unit, setUnit] = useState(0);

  // Uma "volta" do texto: palavras + ícones (como espaços reservados) + separador
  const { label, slots } = useMemo(() => {
    const gap = "\u00A0\u00A0";
    const parts: Part[] = [
      ...parse(text),
      { t: "text", v: gap },
      ...parse(separator),
      { t: "text", v: gap },
    ];
    let out = "";
    const found: { idx: number; name: string }[] = [];
    for (const p of parts) {
      if (p.t === "icon") {
        found.push({ idx: out.length, name: p.n });
        out += SLOT;
      } else out += uppercase ? p.v.toUpperCase() : p.v;
    }
    return { label: out, slots: found };
  }, [text, separator, uppercase]);

  const amp = shape === "wave" ? curviness : 0;
  const h = (ribbon ? ribbonWidth : fontSize * 1.6) + amp * 2;
  const cy = h / 2;
  const font = {
    fontFamily: "var(--display)",
    fontSize,
    fontWeight,
    letterSpacing,
  } as const;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setW(Math.max(1, e.contentRect.width)),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const m = () => setUnit(measure.current?.getComputedTextLength() ?? 0);
    m();
    document.fonts?.ready.then(m);
  }, [label, fontSize, fontWeight, letterSpacing]);

  // Caminho (reto ou ondulado) com folga de uma volta de cada lado
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

  // Animação: desliza o texto no caminho e posiciona cada ícone sobre o seu espaço reservado
  useEffect(() => {
    if (!unit) return;
    const size = fontSize * 1.05;
    const place = () => {
      const el = tp.current;
      if (!el) return;
      for (let r = 0; r < repeats; r++) {
        slots.forEach((s, k) => {
          const g = icons.current[r * slots.length + k];
          if (!g) return;
          const ci = r * label.length + s.idx;
          try {
            const p = el.getStartPositionOfChar(ci);
            const rot = el.getRotationOfChar(ci);
            const adv = el.getExtentOfChar(ci).width;
            if (p.x < -size || p.x > w + size) {
              g.style.display = "none";
              return;
            }
            g.style.display = "";
            g.setAttribute(
              "transform",
              `translate(${p.x} ${p.y}) rotate(${rot}) translate(${adv / 2 - size / 2} ${-fontSize * 0.35 - size / 2}) scale(${size / 24})`,
            );
          } catch {
            g.style.display = "none";
          }
        });
      }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tp.current?.setAttribute("startOffset", String(unit));
      place();
      return;
    }
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
      place();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [unit, speed, direction, w, repeats, slots, label, fontSize]);

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
        {Array.from({ length: repeats }).flatMap((_, r) =>
          slots.map((s, k) => (
            <g
              key={`${r}-${k}`}
              ref={(el) => {
                icons.current[r * slots.length + k] = el;
              }}
              fill={color}
              style={{ display: "none" }}
            >
              <path d={ICONS[s.name]} />
            </g>
          )),
        )}
      </svg>
    </div>
  );
}
