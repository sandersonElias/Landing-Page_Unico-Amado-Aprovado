import { BUY_URL, content } from '../content';

export default function Nav() {
  return (
    <header className="nav">
      <a href="#topo" className="nav-brand">{content.brand}</a>
      <a href={BUY_URL} className="btn btn-sun btn-sm">{content.cta}</a>
    </header>
  );
}
