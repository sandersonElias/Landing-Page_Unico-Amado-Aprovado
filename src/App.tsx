import Nav from './sections/Nav';
import Hero from './sections/Hero';
import SkylineSection from './sections/SkylineSection';
import Sobre from './sections/Sobre';
import Autores from './sections/Autores';
import Comprar from './sections/Comprar';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SkylineSection />
        <Sobre />
        <Autores />
        <Comprar />
      </main>
      <footer className="footer">© {new Date().getFullYear()} Único, amado e aprovado</footer>
    </>
  );
}
