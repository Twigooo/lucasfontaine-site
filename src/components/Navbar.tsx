import { useState } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  currentPath: string;
}

const liens = [
  { label: 'Accueil', href: '/' },
  { label: 'Site Web', href: '/offre-web' },
  { label: 'IA Locale', href: '/offre-ia' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar({ currentPath }: NavbarProps) {
  // Normalise l'URL active (retire le slash final éventuel sauf pour '/')
  const cleanPath = currentPath.length > 1 ? currentPath.replace(/\/$/, '') : currentPath;
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-ivory/85 backdrop-blur-md border-b border-emerald/15">
      <nav className="w-full px-6 md:px-14 h-20 flex items-center justify-between">
        {/* Signature à gauche */}
        <a href="/" className="font-display font-black text-xl tracking-tight text-ink">
          LUCAS FONTAINE<span className="text-emerald">.</span>
        </a>

        {/* Liens avec pilule magnétique au survol / page active */}
        <ul
          className="flex items-center gap-1 sm:gap-2"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {liens.map((lien) => {
            const isActive = cleanPath === lien.href;
            const isHighlighted = hoveredHref ? hoveredHref === lien.href : isActive;

            return (
              <li
                key={lien.href}
                className="relative"
                onMouseEnter={() => setHoveredHref(lien.href)}
              >
                <a
                  href={lien.href}
                  className={`relative z-10 block px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isHighlighted ? 'text-ivory' : 'text-ink/80 hover:text-ink'
                  }`}
                >
                  {lien.label}
                </a>

                {/* Pilule animée qui glisse d'un lien à l'autre */}
                {isHighlighted && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 z-0 rounded-lg bg-emerald"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}