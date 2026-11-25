import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Compass,
  HardDrive,
  Lock,
  ScanText,
  Smartphone,
  Wallet,
} from 'lucide-react';
import {
  ALUL_APPS,
  AlulApp,
  BACKGROUND_IMAGES,
  CATEGORY_LABELS,
} from '../data/apps';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface BentoShowcaseProps {
  lang: Language;
  onSelectApp: (app: AlulApp) => void;
}

export function BentoShowcase({ lang, onSelectApp }: BentoShowcaseProps) {
  const [financeTab, setFinanceTab] = useState<string>('budget-harian');
  const [bgFailed, setBgFailed] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const t = TRANSLATIONS[lang].bento;

  const markImageFailed = (key: string) => {
    setFailedImages((prev) => ({ ...prev, [key]: true }));
  };

  const financeApps = ALUL_APPS.filter((app) =>
    ['budget-harian', 'kos-pro', 'kredit-pintar'].includes(app.id)
  );
  const activeFinanceApp =
    financeApps.find((app) => app.id === financeTab) || financeApps[0];
  const activeFinanceLocale = activeFinanceApp.locales[lang];

  const cekHpApp = ALUL_APPS.find((a) => a.id === 'cek-hp')!;
  const snapStrukApp = ALUL_APPS.find((a) => a.id === 'snap-struk')!;
  const kiblatApp = ALUL_APPS.find((a) => a.id === 'kiblat-kilat')!;

  const featureCards = [
    { app: cekHpApp, icon: Smartphone, iconColor: 'text-indigo-400' },
    { app: snapStrukApp, icon: ScanText, iconColor: 'text-blue-400' },
    { app: kiblatApp, icon: Compass, iconColor: 'text-violet-400' },
  ];

  return (
    <section id="showcase" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle Architectural Background Image */}
      {!bgFailed && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img
            src={BACKGROUND_IMAGES.offlineVault}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setBgFailed(true)}
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0B0C10]/85 to-[#0B0C10]" />
        </div>
      )}

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-10 sm:mb-12"
        >
          <p className="text-xs sm:text-sm font-medium text-indigo-400 tracking-wide mb-2">
            {t.kicker}
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight text-balance">
            {t.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            {t.subheading}
          </p>
        </motion.div>

        {/* Asymmetric 12-Column Bento Grid */}
        <div className="grid grid-cols-12 gap-5">
          {/* Card 1: Marquee Finance & Property Suite (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-7 glass-surface glass-surface-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-zinc-400">{t.financeCardMeta}</p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mt-1">
                  {t.financeCardTitle}
                </h3>
              </div>

              <div
                role="tablist"
                aria-label={t.financeCardTitle}
                className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] self-start sm:self-auto"
              >
                {financeApps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    role="tab"
                    aria-selected={financeTab === app.id}
                    onClick={() => setFinanceTab(app.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      financeTab === app.id
                        ? 'bg-indigo-500/25 text-indigo-200 border border-indigo-400/30'
                        : 'text-zinc-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {app.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-6 rounded-xl overflow-hidden bg-[#12141C] border border-white/[0.06] min-h-[200px]">
                {!failedImages[activeFinanceApp.id] ? (
                  <img
                    src={activeFinanceApp.featureImage}
                    alt={`${activeFinanceApp.name} — ${activeFinanceLocale.subtitle}`}
                    referrerPolicy="no-referrer"
                    onError={() => markImageFailed(activeFinanceApp.id)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-gradient-to-br from-blue-950/40 to-violet-950/40 p-6">
                    <Wallet className="w-10 h-10 text-indigo-300" />
                  </div>
                )}
              </div>

              <div className="md:col-span-6 flex flex-col justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-indigo-300">
                    {activeFinanceApp.packageId}
                  </p>
                  <h4 className="font-display text-lg font-semibold text-white mt-1.5">
                    {activeFinanceApp.name} — {activeFinanceLocale.subtitle}
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed mt-2">
                    {activeFinanceLocale.description}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {activeFinanceLocale.highlights.slice(0, 2).map((point) => (
                      <li
                        key={point}
                        className="text-xs text-zinc-400 flex items-start gap-2"
                      >
                        <span className="text-indigo-400 mt-0.5" aria-hidden="true">
                          —
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectApp(activeFinanceApp)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-300 hover:text-indigo-200 transition-colors self-start"
                >
                  <span>{t.viewDetails}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Offline-First Architecture Vault (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5 glass-surface glass-surface-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5"
          >
            <div>
              <p className="text-xs text-zinc-400">{t.vaultCardMeta}</p>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mt-1">
                {t.vaultCardTitle}
              </h3>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-[#12141C] border border-white/[0.06] h-44">
              {!failedImages['vault'] ? (
                <img
                  src={BACKGROUND_IMAGES.offlineVault}
                  alt={t.vaultCardTitle}
                  referrerPolicy="no-referrer"
                  onError={() => markImageFailed('vault')}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950/50">
                  <Lock className="w-9 h-9 text-indigo-300" />
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C10]/85 via-transparent to-transparent"
              />
              <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                  {t.vaultCardBadge}
                </span>
                <span className="font-mono text-xs text-zinc-400 tabular-nums">
                  {t.vaultCardTag}
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {t.vaultCardDesc}
            </p>
          </motion.div>

          {/* Cards 3, 4, 5: Featured Apps with Feature Images */}
          {featureCards.map(({ app, icon: Icon, iconColor }, index) => {
            const loc = app.locales[lang];
            const colSpan =
              index === 2
                ? 'col-span-12 lg:col-span-4'
                : 'col-span-12 md:col-span-6 lg:col-span-4';

            return (
              <motion.button
                key={app.id}
                type="button"
                onClick={() => onSelectApp(app)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: 0.08 + index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${colSpan} text-left glass-surface glass-surface-hover rounded-2xl overflow-hidden flex flex-col justify-between group`}
              >
                {/* Feature Thumbnail Image */}
                <div className="relative h-40 w-full bg-[#12141C] overflow-hidden border-b border-white/[0.06]">
                  {!failedImages[`bento-${app.id}`] ? (
                    <img
                      src={app.featureImage}
                      alt={`${app.name} — ${loc.subtitle}`}
                      referrerPolicy="no-referrer"
                      onError={() => markImageFailed(`bento-${app.id}`)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950/50">
                      <Icon className={`w-8 h-8 ${iconColor}`} />
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C10]/90 via-[#0B0C10]/20 to-transparent"
                  />
                  <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between gap-2">
                    <span className="text-xs text-zinc-300">
                      {CATEGORY_LABELS[lang][app.categoryKey]}
                    </span>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {app.name}: {loc.subtitle}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                      {loc.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                    <span className="font-mono text-zinc-400 truncate max-w-[210px]">
                      {app.packageId}
                    </span>
                    <span className="text-indigo-300 inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                      {t.detailShort} <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
