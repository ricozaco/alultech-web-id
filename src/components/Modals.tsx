import { useEffect, useState } from 'react';
import { Check, Copy, HardDrive, ShieldCheck, Smartphone, X } from 'lucide-react';
import { AlulApp, CATEGORY_LABELS, PRIVACY_ITEMS } from '../data/apps';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface AppDetailModalProps {
  lang: Language;
  app: AlulApp | null;
  onClose: () => void;
  onOpenPrivacy: () => void;
}

export function AppDetailModal({
  lang,
  app,
  onClose,
  onOpenPrivacy,
}: AppDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const t = TRANSLATIONS[lang].modals;

  useEffect(() => {
    setImgFailed(false);
    setCopied(false);
  }, [app?.id]);

  useEffect(() => {
    if (!app) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [app, onClose]);

  if (!app) return null;

  const loc = app.locales[lang];
  const categoryLabel = CATEGORY_LABELS[lang][app.categoryKey];

  const handleCopyPackage = async () => {
    try {
      await navigator.clipboard.writeText(app.packageId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl glass-surface rounded-2xl overflow-hidden bg-[#11131A]/95 border border-white/15 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Feature Image Header */}
        <div className="relative h-44 w-full bg-[#12141C] border-b border-white/[0.08]">
          {!imgFailed ? (
            <img
              src={app.featureImage}
              alt={`${app.name} — ${loc.subtitle}`}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950/50">
              <Smartphone className="w-9 h-9 text-indigo-300" />
            </div>
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11131A] via-[#11131A]/35 to-transparent"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeAppAria}
            className="absolute top-4 right-4 w-10 h-10 rounded-xl border border-white/15 bg-[#0B0C10]/70 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#0B0C10] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <p className="text-xs text-zinc-300">
              {categoryLabel} · {loc.storageModel}
            </p>
            <h3
              id="app-modal-title"
              className="font-display text-2xl font-bold text-white mt-0.5"
            >
              {app.name}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <p className="text-sm font-medium text-indigo-300">{loc.subtitle}</p>

          <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
            {loc.description}
          </p>

          {/* Package ID Box */}
          <div className="mt-5 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="min-w-0">
              <p className="text-[11px] text-zinc-500">{t.packageLabel}</p>
              <p className="font-mono text-xs sm:text-sm text-zinc-200 truncate">
                {app.packageId}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyPackage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-200 border border-white/10 hover:bg-white/[0.07] transition-colors whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-indigo-300" />
                  <span>{t.copiedId}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.copyId}</span>
                </>
              )}
            </button>
          </div>

          {/* Highlights */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-zinc-200 tracking-wide">
              {t.highlightsTitle}
            </h4>
            <ul className="mt-2.5 space-y-2">
              {loc.highlights.map((item) => (
                <li
                  key={item}
                  className="text-sm text-zinc-300 flex items-start gap-2.5"
                >
                  <span className="text-indigo-400 mt-0.5" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Permissions & Privacy */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-2.5 text-xs text-zinc-400">
              <HardDrive className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                {t.permissionsLabel}: {loc.permissions.join(', ')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPrivacy();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.privacyLink}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PrivacyPolicyModalProps {
  lang: Language;
  open: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({
  lang,
  open,
  onClose,
}: PrivacyPolicyModalProps) {
  const t = TRANSLATIONS[lang].modals;
  const items = PRIVACY_ITEMS[lang];

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl glass-surface rounded-2xl p-6 sm:p-8 bg-[#11131A]/95 border border-white/15 shadow-2xl max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/[0.08]">
          <div>
            <p className="text-xs text-indigo-300">{t.privacySub}</p>
            <h3
              id="privacy-modal-title"
              className="font-display text-2xl font-bold text-white mt-1"
            >
              {t.privacyTitle}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.closePrivacyAria}
            className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 space-y-6 text-sm text-zinc-300 leading-relaxed">
          <p>
            {t.privacyIntroPrefix}{' '}
            <strong className="text-white">Alul Tech (AHZ Dev)</strong>{' '}
            {t.privacyIntroMid}{' '}
            <strong className="text-white">offline-first</strong>{' '}
            {t.privacyIntroSuffix}
          </p>

          {items.map((section) => (
            <div key={section.id} className="space-y-2">
              <h4 className="font-display text-base font-semibold text-white">
                {section.number}. {section.title}
              </h4>
              <p className="text-zinc-400">{section.summary}</p>
              <ul className="space-y-1.5 pl-1">
                {section.details.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-zinc-300">
                    <span className="text-indigo-400 mt-0.5" aria-hidden="true">
                      —
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
            <span>{t.privacyContactFooter}</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-medium text-white accent-gradient-btn self-start sm:self-auto"
            >
              {t.privacyAcknowledge}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
