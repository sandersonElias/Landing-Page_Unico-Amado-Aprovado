import { content } from "../content";
import Stickers from "../components/Stickers";

const DESTAQUE = "único, amado e aprovado";

export default function Frase() {
  const f = content.frase;
  const i = f.toLowerCase().indexOf(DESTAQUE);
  return (
    <section className="frase">
      <blockquote className="frase-texto">
        {i < 0 ? (
          f
        ) : (
          <>
            {f.slice(0, i)}
            <mark>{f.slice(i, i + DESTAQUE.length)}</mark>
            {f.slice(i + DESTAQUE.length)}
          </>
        )}
      </blockquote>
      <Stickers
        items={[
          {
            name: "coroa-azul",
            top: "10%",
            left: "6%",
            size: 84,
            rot: -12,
            speed: 0.14,
          },
          {
            name: "coracao-vermelho",
            top: "14%",
            left: "88%",
            size: 70,
            rot: 12,
            speed: 0.2,
          },
          {
            name: "estrela",
            top: "72%",
            left: "9%",
            size: 62,
            rot: 10,
            speed: 0.1,
          },
          {
            name: "cruz",
            top: "70%",
            left: "86%",
            size: 72,
            rot: -6,
            speed: 0.16,
          },
        ]}
      />
    </section>
  );
}
