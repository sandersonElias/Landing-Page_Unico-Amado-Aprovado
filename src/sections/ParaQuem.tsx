import { content } from "../content";
import Stickers from "../components/Stickers";

const BASE = "/assets"; // pasta dos adesivos

export default function ParaQuem() {
  const p = content.paraQuem;
  return (
    <section className="paraquem">
      <div className="paraquem-img">
        <img src={p.img} alt={p.alt} loading="lazy" />
        <div className="paraquem-selo" aria-hidden="true">
          <strong>{p.stat.numero}</strong>
          <span>{p.stat.texto}</span>
        </div>
        <Stickers
          items={[
            {
              name: "coroa-azul",
              top: "4%",
              left: "-2%",
              size: 64,
              rot: -10,
              speed: 0.15,
            },
            {
              name: "seta",
              top: "88%",
              left: "70%",
              size: 84,
              rot: -4,
              speed: 0.18,
            },
          ]}
        />
      </div>
      <div className="paraquem-texto">
        <h2>{p.title}</h2>
        <p>{p.text}</p>
        <ul className="lista">
          {p.itens.map((i) => (
            <li key={i.texto}>
              <img src={`${BASE}/${i.icone}.png`} alt="" />
              <span>{i.texto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
