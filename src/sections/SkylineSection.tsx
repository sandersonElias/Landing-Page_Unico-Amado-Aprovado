import type { CSSProperties } from "react";
import ScrollExpand from "../components/reactbits/ScrollExpand";
import { useMediaQuery } from "../hooks";
import { content } from "../content";

const BASE = "/assets"; // pasta dos adesivos

// Adesivos que "pipocam" nos cantos conforme a cidade se abre
const ADESIVOS = [
  { name: "coroa-amarela", top: "9%", left: "7%", r: -12 },
  { name: "estrela", top: "14%", left: "84%", r: 14 },
  { name: "coracao-vermelho", top: "70%", left: "6%", r: 10 },
  { name: "cruz", top: "66%", left: "86%", r: -6 },
];

export default function SkylineSection() {
  const mobile = useMediaQuery("(max-width: 700px)");
  const s = content.skyline;
  return (
    <ScrollExpand
      src="/assets/Skyline_desktop.png"
      alt="Cidade em preto e branco, no estilo de quadrinhos"
      title={s.title}
      scrollHint={s.hint}
      useWindowScroll
      startWidth={mobile ? 82 : 42}
      startHeight={mobile ? 40 : 58}
      startRadius={24}
      endRadius={0}
      mediaZoom={1.35}
      scrollDistance={1.2}
      holdDistance={0.35}
      smoothing={0.1}
      overlayScrim={0.3}
      overlay={
        <>
          <div className="sky-cor" />
          <div className="sky-sol" />
          {ADESIVOS.map((a) => (
            <img
              key={a.name}
              src={`${BASE}/${a.name}.png`}
              alt=""
              className="sky-sticker"
              style={
                {
                  top: a.top,
                  left: a.left,
                  "--r": `${a.r}deg`,
                } as CSSProperties
              }
            />
          ))}
        </>
      }
    >
      <h2>{s.h2}</h2>
      <p>{s.p}</p>
    </ScrollExpand>
  );
}
