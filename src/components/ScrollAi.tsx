import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const verbes = [
  'traduit.',
  'corrige.',
  'rédige.',
  'cherche.',
  'calcule.',
  'design.',
  'protège.',
];

export default function ScrollAi() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter((el): el is HTMLLIElement => el !== null);
      if (items.length === 0) return;

      gsap.set(items, {
        opacity: (i) => (i === 0 ? 1 : 0.2),
      });

      const dimmer = gsap
        .timeline()
        .to(items.slice(1), { opacity: 1, stagger: 0.5, ease: 'none' })
        .to(items.slice(0, items.length - 1), { opacity: 0.2, stagger: 0.5, ease: 'none' }, 0);

      ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: dimmer,
        scrub: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-emerald/15 py-[35vh] max-w-5xl mx-auto px-6"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-center gap-2 md:gap-4 text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight">
        <h2 className="md:sticky md:top-[calc(50vh-0.625em)] h-[1.25em] flex items-center shrink-0 text-ink leading-none">
          Une IA qui
        </h2>

        <ul className="m-0 p-0 list-none flex flex-col">
          {verbes.map((mot, idx) => (
            <li
              key={mot}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="snap-center h-[1.25em] flex items-center leading-none text-emerald"
            >
              {mot}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}