import { useEffect, useRef } from "react";
import { PaperTexture } from "@paper-design/shaders-react";
import { BUY_URL, content } from "../content";
import { HERO_BG } from "../config";
import Stickers from "../components/Stickers";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Parallax: rolagem da página + mouse (só em dispositivos com mouse).
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
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.style.setProperty(
        "--mx",
        String((e.clientX / window.innerWidth - 0.5) * 2),
      );
      el.style.setProperty(
        "--my",
        String((e.clientY / window.innerHeight - 0.5) * 2),
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section id="topo" className="hero" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        <PaperTexture
          image={HERO_BG}
          colorBack="#f4efe6"
          colorFront="#d8d0bf"
          contrast={0.35}
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
          ]}
        />
      </div>
    </section>
  );
}
