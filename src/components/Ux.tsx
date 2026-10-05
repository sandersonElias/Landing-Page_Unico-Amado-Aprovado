import { useEffect, useRef, useState } from 'react';
import { BUY_URL, content } from '../content';

// Barra fina de progresso de leitura no topo.
export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div ref={ref} className="progresso" aria-hidden="true" />;
}

// Barra de compra fixa no celular: aparece depois da hero e some na seção de compra.
export function StickyCta() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let past = false;
    let buying = false;
    const update = () => setOn(past && !buying);
    const onScroll = () => { past = window.scrollY > window.innerHeight * 0.8; update(); };
    const io = new IntersectionObserver(([e]) => { buying = e.isIntersecting; update(); });
    const target = document.getElementById('comprar');
    if (target) io.observe(target);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);
  return (
    <div className={`cta-fixa ${on ? 'visivel' : ''}`}>
      <span>{content.comprar.price}</span>
      <a href={BUY_URL} className="btn btn-sun btn-sm">{content.cta}</a>
    </div>
  );
}
