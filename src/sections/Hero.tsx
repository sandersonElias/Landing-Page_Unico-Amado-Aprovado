import { BUY_URL, content } from '../content';

export default function Hero() {
  return (
    <section id="topo" className="hero">
      <img src="/img/capa.webp" alt="Capa do livro Único, amado e aprovado" className="hero-cover" />
      <h1>{content.hero.title}</h1>
      <p className="hero-sub">{content.hero.sub}</p>
      <a href={BUY_URL} className="btn btn-sun">{content.cta}</a>
    </section>
  );
}
