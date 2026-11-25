import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Search, Smartphone, X } from 'lucide-react';
import {
  ALUL_APPS,
  APP_CATEGORY_KEYS,
  AlulApp,
  AppCategoryKey,
  BACKGROUND_IMAGES,
  CATEGORY_LABELS,
} from '../data/apps';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface AppCatalogProps {
  lang: Language;
  onSelectApp: (app: AlulApp) => void;
}

export function AppCatalog({ lang, onSelectApp }: AppCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<AppCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bgFailed, setBgFailed] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const t = TRANSLATIONS[lang].catalog;

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALUL_APPS.filter((app) => {
      const matchesCategory =
        activeCategory === 'all' || app.categoryKey === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      const loc = app.locales[lang];
      return (
        app.name.toLowerCase().includes(q) ||
        loc.subtitle.toLowerCase().includes(q) ||
        loc.description.toLowerCase().includes(q) ||
        app.packageId.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery, lang]);

  return (
    <section
      id="katalog"
      className="py-16 sm:py-24 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Atmospheric Charcoal Stone & Glass Background */}
      {!bgFailed && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img
            src={BACKGROUND_IMAGES.charcoalAmbient}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setBgFailed(true)}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0B0C10]/80 to-[#0B0C10]" />
        </div>
      )}

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10"
        >
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm font-medium text-indigo-400 tracking-wide mb-2">
              {t.kicker}
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight text-balance">
              {t.heading}
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search
              aria-hidden="true"
              className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchAria}
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.03] border border-white/[0.09] text-sm text-white placeholder:text-zinc-500 focus:border-indigo-400/50 focus:bg-white/[0.05] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={t.clearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Segmented Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          <div
            role="tablist"
            aria-label={t.kicker}
            className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.07]"
          >
            {APP_CATEGORY_KEYS.map((categoryKey) => {
              const isActive = activeCategory === categoryKey;
              return (
                <button
                  key={categoryKey}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(categoryKey)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'accent-gradient-btn text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {CATEGORY_LABELS[lang][categoryKey]}
                </button>
              );
            })}
          </div>

          <span className="ml-auto text-xs text-zinc-500 whitespace-nowrap shrink-0 tabular-nums pl-3">
            {t.showingPrefix} {filteredApps.length} {t.showingMiddle} {ALUL_APPS.length}{' '}
            {t.showingSuffix}
          </span>
        </div>

        {/* App Cards Grid — Each App Has a Feature Image */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredApps.map((app) => {
              const loc = app.locales[lang];
              const categoryLabel = CATEGORY_LABELS[lang][app.categoryKey];
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => onSelectApp(app)}
                  className="text-left glass-surface glass-surface-hover rounded-2xl overflow-hidden flex flex-col justify-between group"
                >
                  {/* Feature Image Banner */}
                  <div className="relative h-36 w-full bg-[#12141C] overflow-hidden border-b border-white/[0.06]">
                    {!failedImages[app.id] ? (
                      <img
                        src={app.featureImage}
                        alt={`${app.name} — ${loc.subtitle}`}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [app.id]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950/50">
                        <Smartphone className="w-7 h-7 text-indigo-300" />
                      </div>
                    )}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C10]/90 via-[#0B0C10]/25 to-transparent"
                    />
                    <div className="absolute bottom-2.5 left-5 right-5 flex items-center justify-between gap-2 text-xs text-zinc-300">
                      <span className="truncate">{categoryLabel}</span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-indigo-300 transition-colors shrink-0" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-xs font-medium text-indigo-300/90 mt-0.5">
                        {loc.subtitle}
                      </p>
                      <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed line-clamp-2">
                        {loc.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs text-zinc-500">
                      <span className="font-mono truncate">{app.packageId}</span>
                      <span className="text-zinc-400 whitespace-nowrap shrink-0">
                        {t.offlineBadge}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="glass-surface rounded-2xl p-10 text-center">
            <p className="font-display text-lg font-semibold text-white">
              {t.emptyTitle}
            </p>
            <p className="text-sm text-zinc-400 mt-1">
              {t.emptyDesc} &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-medium text-white accent-gradient-btn"
            >
              {t.resetFilter}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
