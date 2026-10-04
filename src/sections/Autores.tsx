import { content } from '../content';

export default function Autores() {
  const a = content.autores;
  return (
    <section className="autores">
      <div className="autores-texto">
        <h2>{a.title}</h2>
        <p>{a.text}</p>
      </div>
      <img src={a.img} alt={a.alt} loading="lazy" />
    </section>
  );
}
