import { useEffect, useRef } from "react";
import { content } from "../content";
import Stickers from "../components/Stickers";

export default function Autores() {
  const ref = useRef<HTMLElement>(null);
  const a = content.autores;

  // Anima a entrada uma vez, quando a section aparece.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("vista");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="autores" ref={ref}>
      <div className="autores-texto">
        <h2>{a.heading}</h2>
        <ul className="autores-nomes">
          {a.nomes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p>{a.text}</p>
      </div>
      <div className="autores-arte">
        <span className="autores-sol" aria-hidden="true" />
        <img src={a.img} alt={a.alt} loading="lazy" />
        <Stickers
          items={[
            {
              name: "coracao-vermelho",
              top: "16%",
              left: "-4%",
              size: 58,
              rot: -10,
              speed: 0.12,
            },
            {
              name: "estrela",
              top: "4%",
              left: "86%",
              size: 52,
              rot: 12,
              speed: 0.18,
            },
            {
              name: "coroa-amarela",
              top: "58%",
              left: "88%",
              size: 60,
              rot: 10,
              speed: 0.1,
            },
          ]}
        />
      </div>
    </section>
  );
}
