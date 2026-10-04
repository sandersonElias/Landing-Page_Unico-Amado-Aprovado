import ScrollExpand from '../components/reactbits/ScrollExpand';
import { useMediaQuery } from '../hooks';
import { content } from '../content';

export default function SkylineSection() {
  const mobile = useMediaQuery('(max-width: 700px)');
  const s = content.skyline;
  return (
    <ScrollExpand
      src="/img/skyline.webp"
      alt="Cidade em preto e branco, no estilo de quadrinhos"
      title={s.title}
      scrollHint={s.hint}
      useWindowScroll
      startWidth={mobile ? 82 : 42}
      startHeight={mobile ? 40 : 58}
      startRadius={24}
      endRadius={0}
      mediaZoom={1.35}
      scrollDistance={1.2}
      holdDistance={0.35}
      smoothing={0.1}
      overlayScrim={0.3}
    >
      <h2>{s.h2}</h2>
      <p>{s.p}</p>
    </ScrollExpand>
  );
}
