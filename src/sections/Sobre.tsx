import { content } from '../content';

export default function Sobre() {
  return (
    <section className="sobre">
      {content.sobre.map((item, i) => (
        <article key={item.title} className={`sobre-item ${i % 2 ? 'invertido' : ''}`}>
          <img src={item.img} alt={item.alt} loading="lazy" />
          <div>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
