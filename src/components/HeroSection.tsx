import { useState } from 'react';
import { ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';
import { BACKGROUND_IMAGES } from '../data/apps';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface HeroSectionProps {
  lang: Language;
  onOpenPrivacy: () => void;
}

export function HeroSection({ lang, onOpenPrivacy }: HeroSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [bgFailed, setBgFailed] = useState(false);
  const t = TRANSLATIONS[lang].hero;

  return (
    <section
      id="top"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Full-Bleed Atmospheric Charcoal Glass Background Image */}
      {!bgFailed && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img
            src={BACKGROUND_IMAGES.charcoalAmbient}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setBgFailed(true)}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/80 via-[#0B0C10]/65 to-[#0B0C10]" />
        </div>
      )}

      {/* Subtle Blue-Violet Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[920px] h-[520px] rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle at 35% 40%, rgba(59,130,246,0.55), rgba(124,58,237,0.38) 55%, transparent 78%)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Copy Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-indigo-300 tracking-[0.02em] mb-4">
              {t.kicker}
            </p>

            <h1
              className="font-display font-bold text-white tracking-[-0.025em] leading-[1.08] text-balance"
              style={{ fontSize: 'clamp(2.35rem, 4.5vw, 4rem)' }}
            >
              {t.headlineLead}
              <span className="accent-gradient-text">{t.headlineAccent}</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-[60ch]">
              {t.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-white accent-gradient-btn hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
              >
                <span>{t.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenPrivacy}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-zinc-200 border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-indigo-400/30 transition-colors whitespace-nowrap shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>{t.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* Right Stretched Focal Visual */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full min-h-[260px] sm:min-h-[320px] lg:min-h-full rounded-2xl overflow-hidden glass-surface p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#12141C]">
                {!imageFailed ? (
                  <img
                    src={BACKGROUND_IMAGES.heroStudio}
                    alt="Alul Tech glassmorphism studio architecture"
                    referrerPolicy="no-referrer"
                    onError={() => setImageFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#141722] via-[#0F1118] to-[#19152B]">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center mb-4">
                      <Smartphone className="w-6 h-6 text-indigo-300" />
                    </div>
                    <p className="font-display text-sm font-semibold text-zinc-100">
                      Alul Tech Studio
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Offline-First Mobile Architecture
                    </p>
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C10]/85 via-[#0B0C10]/20 to-transparent"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-zinc-400">{t.focalLabel}</p>
                    <p className="text-sm font-semibold text-white">
                      {t.focalValue}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-indigo-300 tabular-nums">
                    com.holding.*
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Summary Strip Below Hero Split */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {t.metrics.map((metric) => (
            <div
              key={metric.label}
              className="glass-surface rounded-xl px-5 py-4 flex flex-col justify-between"
            >
              <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
                {metric.value}
              </span>
              <span className="mt-1 text-xs sm:text-sm text-zinc-400">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
