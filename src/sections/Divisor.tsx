import type { CSSProperties } from "react";
import TextLoop from "../components/reactbits/TextLoop";
import { DIVISOR_TEXT } from "../config";

const BASE = "/assets"; // pasta dos adesivos (PNG transparente)

// size = largura em px, y = deslocamento vertical a partir do centro da faixa, rot = giro em graus
const FAIXA = [
  { name: "coracao-vermelho", size: 62, y: -46, rot: -12 },
  { name: "coroa-amarela", size: 70, y: 44, rot: 10 },
  { name: "deus", size: 118, y: -50, rot: -4 },
  { name: "estrela", size: 54, y: 46, rot: 14 },
  { name: "cruz", size: 62, y: -44, rot: 6 },
  { name: "seta", size: 100, y: 48, rot: -6 },
  { name: "coroa-azul", size: 66, y: -46, rot: -10 },
  { name: "coracao-preto", size: 56, y: 44, rot: 8 },
  { name: "segundo-coracao", size: 140, y: -52, rot: -3 },
];

// Faixa ondulada sobreposta ao fim da section de cima e ao começo da de baixo,
// com uma fila de adesivos deslizando por cima.
export default function Divisor() {
  const itens = [...FAIXA, ...FAIXA]; // duas voltas para o loop não ter emenda
  return (
    <div className="divisor" aria-hidden="true">
      <TextLoop
        text={DIVISOR_TEXT}
        shape="wave"
        speed={70}
        direction="forward"
        separator="✦"
        curviness={16}
        fontSize={30}
        fontWeight={700}
        letterSpacing={1}
        color="#f6f2ea"
        ribbon
        ribbonColor="#0f2233"
        ribbonWidth={70}
      />
      <div className="divisor-stickers">
        <ul className="divisor-faixa">
          {itens.map((s, i) => (
            <li
              key={i}
              style={
                {
                  width: s.size,
                  "--y": `${s.y}px`,
                  "--r": `${s.rot}deg`,
                } as CSSProperties
              }
            >
              <img src={`${BASE}/${s.name}.png`} alt="" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
