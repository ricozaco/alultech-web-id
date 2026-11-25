import { useState } from 'react';
import { BACKGROUND_IMAGES } from '../data/apps';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  lang: Language;
  onOpenPrivacy: () => void;
}

export function Footer({ lang, onOpenPrivacy }: FooterProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const t = TRANSLATIONS[lang].footer;
  const navT = TRANSLATIONS[lang].nav;

  return (
    <footer className="border-t border-white/[0.08] py-10 bg-[#090A0E]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          {!logoFailed ? (
            <img
              src={BACKGROUND_IMAGES.gradientLogo}
              alt="Alul Tech Logo"
              referrerPolicy="no-referrer"
              onError={() => setLogoFailed(true)}
              className="w-8 h-8 rounded-lg object-cover border border-white/15 shrink-0"
            />
          ) : (
            <span className="w-8 h-8 rounded-lg accent-gradient-btn flex items-center justify-center font-display text-sm font-bold text-white shrink-0">
              A
            </span>
          )}
          <div>
            <p className="font-display text-base font-bold text-white">Alul Tech</p>
            <p className="text-xs text-zinc-500 mt-0.5">{t.tagline}</p>
          </div>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-400"
        >
          <a href="#showcase" className="hover:text-white transition-colors">
            {navT.showcase}
          </a>
          <a href="#katalog" className="hover:text-white transition-colors">
            {t.catalogLink}
          </a>
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:text-white transition-colors"
          >
            {t.privacyLink}
          </button>
          <a href="#kontak" className="hover:text-white transition-colors">
            support@alultech.web.id
          </a>
        </nav>

        <p className="text-xs text-zinc-500 tabular-nums">{t.copyright}</p>
      </div>
    </footer>
  );
}
