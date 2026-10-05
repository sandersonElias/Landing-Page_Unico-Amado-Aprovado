import { content } from '../content';
import Stickers from '../components/Stickers';

export default function ParaQuem() {
  const p = content.paraQuem;
  return (
    <section className="paraquem">
      <div className="paraquem-img">
        <img src="/img/personagens.webp" alt="Os dois personagens da capa, sorrindo" loading="lazy" />
        <Stickers items={[
          { name: 'coroa-azul', top: '2%', left: '4%', size: 70, rot: -10, speed: 0.15 },
          { name: 'coracao-preto', top: '10%', left: '82%', size: 64, rot: 10, speed: 0.1 },
          { name: 'seta', top: '84%', left: '76%', size: 74, rot: -4, speed: 0.18 },
        ]} />
      </div>
      <div>
        <h2>{p.title}</h2>
        <p>{p.text}</p>
        <ul className="lista">
          {p.itens.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </div>
    </section>
  );
}
