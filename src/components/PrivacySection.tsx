import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, FileText, ShieldCheck } from 'lucide-react';
import { BACKGROUND_IMAGES, PRIVACY_ITEMS } from '../data/apps';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface PrivacySectionProps {
  lang: Language;
  onOpenPrivacy: () => void;
}

export function PrivacySection({ lang, onOpenPrivacy }: PrivacySectionProps) {
  const items = PRIVACY_ITEMS[lang];
  const [openId, setOpenId] = useState<string>(items[0].id);
  const [bgFailed, setBgFailed] = useState(false);
  const t = TRANSLATIONS[lang].privacy;

  return (
    <section
      id="privasi"
      className="py-16 sm:py-24 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Subtle Architectural Monolith Background */}
      {!bgFailed && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img
            src={BACKGROUND_IMAGES.heroStudio}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setBgFailed(true)}
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0B0C10]/85 to-[#0B0C10]" />
        </div>
      )}

      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full opacity-15 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(124,58,237,0.3) 50%, transparent 75%)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Summary Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs sm:text-sm font-medium text-indigo-400 tracking-wide mb-2">
              {t.kicker}
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight text-balance">
              {t.heading}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.description}
            </p>

            <div className="mt-6 glass-surface rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{t.badgeTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {t.badgeDesc}
              </p>
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors pt-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.readFullBtn}</span>
              </button>
            </div>
          </motion.div>

          {/* Right Interactive Accordion List */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-3"
          >
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`glass-surface rounded-2xl transition-colors duration-200 ${
                    isOpen ? 'border-indigo-400/35 bg-white/[0.045]' : ''
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? '' : item.id)}
                    className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                  >
                    <div>
                      <span className="font-mono text-xs text-indigo-400 tabular-nums">
                        {item.number}.
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-semibold text-white mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 shrink-0 mt-1 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-300' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-white/[0.06]">
                      <ul className="space-y-2.5 mt-3">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="text-sm text-zinc-300 leading-relaxed flex items-start gap-2.5"
                          >
                            <span
                              className="text-indigo-400 mt-0.5 shrink-0"
                              aria-hidden="true"
                            >
                              —
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
