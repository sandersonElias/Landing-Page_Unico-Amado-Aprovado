import { useEffect, useRef } from "react";
// Caminho onde o shadcn instalou o componente. Ajuste se for diferente.
import Asciify from "../components/ui/asciify-react";
import { useMediaQuery } from "../hooks";
import { content } from "../content";
import Stickers from "../components/Stickers";

// Adesivos presos aos cantos de cada foto, para nunca cair em cima do texto
const FOTO_ADESIVOS = [
  [{ name: "deus", top: "-5%", left: "58%", size: 104, rot: -6, speed: 0.08 }],
  [
    {
      name: "coracao-vermelho",
      top: "-6%",
      left: "80%",
      size: 58,
      rot: 12,
      speed: 0.1,
    },
    { name: "cruz", top: "82%", left: "-6%", size: 58, rot: -8, speed: 0.12 },
  ],
];

export default function Sobre() {
  const ref = useRef<HTMLElement>(null);
  const mobile = useMediaQuery("(max-width: 700px)");

  // O fundo fica atrás do conteúdo e não recebe o mouse, então repassamos o ponteiro da section para ele.
  useEffect(() => {
    const section = ref.current;
    const fundo = section?.querySelector(".sobre-fundo");
    if (!section || !fundo) return;
    const repassar = (tipo: string) => (e: PointerEvent) =>
      fundo.dispatchEvent(
        new PointerEvent(tipo, { clientX: e.clientX, clientY: e.clientY }),
      );
    const mover = repassar("pointermove");
    const sair = repassar("pointerleave");
    section.addEventListener("pointermove", mover);
    section.addEventListener("pointerleave", sair);
    return () => {
      section.removeEventListener("pointermove", mover);
      section.removeEventListener("pointerleave", sair);
    };
  }, [mobile]);

  return (
    <section className="sobre" ref={ref}>
      {!mobile && (
        <Asciify
          className="sobre-fundo"
          style={{ position: "absolute", inset: 0 }}
          radius={0.3}
          scale={2}
          spacing={1}
          charset="ascii"
          background="auto"
          brightness={0.35}
          glow={0.4}
          aberration={0.4}
        >
          <div className="sobre-fundo-texto" aria-hidden="true">
            <span>Único</span>
            <span>amado</span>
            <span>aprovado</span>
          </div>
        </Asciify>
      )}
      <div className="sobre-conteudo">
        {content.sobre.map((item, i) => (
          <article
            key={item.title}
            className={`sobre-item ${i % 2 ? "invertido" : ""}`}
          >
            <div className="sobre-foto">
              <img src={item.img} alt={item.alt} loading="lazy" />
              <Stickers items={FOTO_ADESIVOS[i % FOTO_ADESIVOS.length]} />
            </div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
