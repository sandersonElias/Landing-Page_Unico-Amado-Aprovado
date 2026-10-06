import { CHECKOUT_URL, content } from "../content";

export default function Comprar() {
  const c = content.comprar;
  return (
    <section id="comprar" className="comprar">
      <picture>
        <source
          media="(max-width: 900px)"
          srcSet="../../public/assets/banner-mobile.webp"
        />
        <img
          src="../../public/assets/banner.webp"
          alt=""
          className="comprar-bg"
          loading="lazy"
        />
      </picture>
      <div className="comprar-conteudo">
        <h2>{c.title}</h2>
        <p className="preco">{c.price}</p>
        {CHECKOUT_URL ? (
          <a href={CHECKOUT_URL} className="btn btn-sun">
            {content.cta}
          </a>
        ) : (
          <span className="btn btn-sun btn-off" aria-disabled="true">
            Link de compra em breve
          </span>
        )}
        <p className="nota">{c.note}</p>
      </div>
    </section>
  );
}
