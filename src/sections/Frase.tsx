import { content } from "../content";

export default function Frase() {
  return (
    <section className="frase">
      <img src="" alt="" className="frase-bg" loading="lazy" />
      <blockquote className="frase-texto">{content.frase}</blockquote>
    </section>
  );
}
