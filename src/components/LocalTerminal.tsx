import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const lignes = [
  { type: 'cmd', text: '$ grenousse-ia --runtime ollama --offline --docs ./manuels-atelier' },
  { type: 'ok', text: '✓ Réseau : DÉCONNECTÉ (100 % local, zéro flux sortant)' },
  { type: 'ok', text: '✓ Modèle local chargé en VRAM (Qwen 2.5 • Ollama / vLLM)' },
  { type: 'ok', text: '✓ Indexation : 412 manuels d’atelier, fiches et devis prêts' },
  { type: 'prompt', text: 'Question : « Quel est le jeu aux soupapes à froid sur le monocylindre 650 ? »' },
  { type: 'step', text: '→ Recherche hybride (Embeddings + BM25 lexical) : 12 extraits trouvés' },
  { type: 'step', text: '→ Reranker Cross-Encoder : tri et filtrage de la fiche exacte' },
  { type: 'step', text: '→ Synthèse LLM local : rédaction sourcée sans hallucination' },
  {
    type: 'answer',
    text: 'Réponse : Admission 0,10 mm — Échappement 0,12 mm (Source : Manuel_Atelier_650.pdf, p. 34).',
  },
];

export default function LocalTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= lignes.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 480);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl bg-ink text-ivory border border-emerald/30 shadow-xl overflow-hidden font-mono text-xs sm:text-sm"
    >
      {/* Barre supérieure sobre */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-emerald-dark/60 border-b border-ivory/10">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-ivory/30"></span>
          <span className="size-2.5 rounded-full bg-ivory/30"></span>
          <span className="size-2.5 rounded-full bg-emerald-light"></span>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-emerald-light font-semibold">
          Mode Hors-Ligne • Serveur Local
        </span>
      </div>

      {/* Contenu du terminal */}
      <div className="p-6 sm:p-8 space-y-3 min-h-[380px]">
        {lignes.slice(0, visibleCount).map((ligne, index) => {
          if (ligne.type === 'cmd') {
            return (
              <p key={index} className="text-ivory font-semibold">
                {ligne.text}
              </p>
            );
          }
          if (ligne.type === 'ok') {
            return (
              <p key={index} className="text-emerald-light">
                {ligne.text}
              </p>
            );
          }
          if (ligne.type === 'prompt') {
            return (
              <p key={index} className="pt-3 text-ivory font-medium border-t border-ivory/10">
                {ligne.text}
              </p>
            );
          }
          if (ligne.type === 'step') {
            return (
              <p key={index} className="text-ivory/75 pl-2">
                {ligne.text}
              </p>
            );
          }
          return (
            <p
              key={index}
              className="mt-3 p-3.5 rounded-lg bg-emerald/25 border border-emerald-light/30 text-ivory leading-relaxed"
            >
              {ligne.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}