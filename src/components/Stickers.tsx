import { useEffect, useRef, type CSSProperties } from 'react';

export type StickerItem = { name: string; top: string; left: string; size: number; rot?: number; speed?: number };

// Adesivos soltos com parallax leve. O elemento pai precisa ser position: relative.
export default function Stickers({ items }: { items: StickerItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => el.style.setProperty('--p', `${el.getBoundingClientRect().top}px`);
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="stickers" aria-hidden="true">
      {items.map((s, i) => (
        <img
          key={i}
          src={`/img/stickers/${s.name}.png`}
          alt=""
          className="sticker"
          loading="lazy"
          style={{ top: s.top, left: s.left, width: s.size, '--r': `${s.rot ?? 0}deg`, '--s': s.speed ?? 0.1 } as CSSProperties}
        />
      ))}
    </div>
  );
}
