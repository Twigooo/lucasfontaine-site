import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';

interface ParallaxRowProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxRow({ children, baseVelocity = 3 }: ParallaxRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => {
    const wrapped = (((v + 25) % 25) + 25) % 25 - 50;
    return `${wrapped}%`;
  });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap select-none">
      <motion.div className="flex whitespace-nowrap flex-nowrap gap-8" style={{ x }}>
        <span className="flex items-center gap-8">{children}</span>
        <span className="flex items-center gap-8" aria-hidden="true">{children}</span>
        <span className="flex items-center gap-8" aria-hidden="true">{children}</span>
        <span className="flex items-center gap-8" aria-hidden="true">{children}</span>
      </motion.div>
    </div>
  );
}

export default function VelocityBanner() {
  return (
    <div className="relative w-full py-12 overflow-hidden">
      <div className="flex flex-col gap-3 font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight">
        <ParallaxRow baseVelocity={2.5}>
          <span className="text-ink">Un site web dynamique</span>
          <span className="font-serif italic font-medium lowercase text-emerald">sur mesure</span>
          <span className="text-emerald/40">•</span>
        </ParallaxRow>

        <ParallaxRow baseVelocity={-2.5}>
          <span className="font-serif italic font-medium lowercase text-emerald">Une IA locale</span>
          <span className="text-ink">100 % confidentielle</span>
          <span className="text-emerald/40">•</span>
        </ParallaxRow>
      </div>

      {/* Fondu latéral exactement de la couleur du fond Ivory (#ede3d1) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#ede3d1] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#ede3d1] to-transparent"></div>
    </div>
  );
}