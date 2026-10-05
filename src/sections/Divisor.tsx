import TextLoop from "../components/reactbits/TextLoop";
import { DIVISOR_TEXT } from "../config";

// Faixa em loop entre sections (TextLoop do ReactBits).
export default function Divisor() {
  return (
    <div className="divisor" aria-hidden="true">
      <TextLoop
        text={DIVISOR_TEXT}
        shape="wave"
        speed={70}
        direction="forward"
        separator="✦"
        curviness={16}
        fontSize={30}
        fontWeight={700}
        letterSpacing={1}
        color="#f6f2ea"
        ribbon
        ribbonColor="#0f2233"
        ribbonWidth={70}
        pauseOnHover
      />
    </div>
  );
}
