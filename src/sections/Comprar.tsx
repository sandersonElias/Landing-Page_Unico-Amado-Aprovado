import { BUY_URL, content } from '../content';

export default function Comprar() {
  const c = content.comprar;
  return (
    <section id="comprar" className="comprar">
      <h2>{c.title}</h2>
      <p className="preco">{c.price}</p>
      <a href={BUY_URL} className="btn btn-sun">{content.cta}</a>
      <p className="nota">{c.note}</p>
    </section>
  );
}
