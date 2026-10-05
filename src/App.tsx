import "./index.css";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Divisor from "./sections/Divisor";
import SkylineSection from "./sections/SkylineSection";
import ParaQuem from "./sections/ParaQuem";
import Frase from "./sections/Frase";
import Sobre from "./sections/Sobre";
import Autores from "./sections/Autores";
import Comprar from "./sections/Comprar";
import { ProgressBar, StickyCta } from "./components/Ux";

export default function App() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <Divisor />
        <SkylineSection />
        <ParaQuem />
        <Frase />
        <Sobre />
        <Autores />
        <Divisor />
        <Comprar />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} Único, amado e aprovado
      </footer>
      <StickyCta />
    </>
  );
}
