import { useEffect, useRef } from "react";
import { PaperTexture } from "@paper-design/shaders-react";
import { BUY_URL, content } from "../content";
import { HERO_BG } from "../config";
import Stickers from "../components/Stickers";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Parallax de rolagem da página.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        el.style.setProperty(
          "--sy",
          String(Math.min(window.scrollY, window.innerHeight)),
        ),
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="topo" className="hero" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        <PaperTexture
          image={HERO_BG}
          colorBack="#f4efe6"
          roughness={0.45}
          fiber={0.35}
          crumples={0.25}
          folds={0.4}
          drops={0}
          fit="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="hero-text">
        <h1>
          Único,
          <br />
          amado e<br />
          aprovado
        </h1>
        <p className="hero-sub">{content.hero.sub}</p>
        <a href={BUY_URL} className="btn btn-sun">
          {content.cta}
        </a>
      </div>
      <div className="hero-visual">
        <div className="hero-cover-wrap">
          <img
            src="/assets/capa.png"
            alt="Capa do livro Único, amado e aprovado"
            className="hero-cover"
          />
        </div>
        <Stickers
          items={[
            {
              name: "coracao-vermelho",
              top: "4%",
              left: "-6%",
              size: 64,
              rot: -12,
              speed: 0.12,
            },
            {
              name: "coroa-amarela",
              top: "-2%",
              left: "78%",
              size: 72,
              rot: 14,
              speed: 0.2,
            },
            {
              name: "estrela",
              top: "80%",
              left: "-4%",
              size: 52,
              rot: -8,
              speed: 0.16,
            },
            {
              name: "segundo-coracao",
              top: "82%",
              left: "48%",
              size: 132,
              rot: -6,
              speed: 0.1,
            },
          ]}
        />
      </div>
    </section>
  );
}
