import { useEffect, useState } from "react";
import { BUY_URL, content } from "../content";

export default function Nav() {
  const [oculta, setOculta] = useState(false);

  // Some ao rolar para baixo e volta ao rolar para cima.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setOculta(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${oculta ? "oculta" : ""}`}>
      <a href="#topo" className="nav-brand">
        {content.brand}
      </a>
      <a href={BUY_URL} className="btn btn-sun btn-sm" aria-label={content.cta}>
        <span className="cta-longo">{content.cta}</span>
        <span className="cta-curto">Comprar</span>
      </a>
    </header>
  );
}
