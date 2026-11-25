import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { ALUL_APPS, BACKGROUND_IMAGES } from '../data/apps';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ContactSectionProps {
  lang: Language;
}

export function ContactSection({ lang }: ContactSectionProps) {
  const t = TRANSLATIONS[lang].contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedApp, setSelectedApp] = useState<string>(t.formAppAll);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bgFailed, setBgFailed] = useState(false);

  useEffect(() => {
    setSelectedApp(t.formAppAll);
    setError('');
  }, [lang, t.formAppAll]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError(t.errorRequired);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError(t.errorEmail);
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <section
      id="kontak"
      className="py-16 sm:py-24 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Subtle Atmospheric Background */}
      {!bgFailed && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img
            src={BACKGROUND_IMAGES.charcoalAmbient}
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
          className="glass-surface rounded-2xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Left Support Info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs sm:text-sm font-medium text-indigo-400 tracking-wide mb-2">
                {t.kicker}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
                {t.heading}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <div>
                <p className="text-xs text-zinc-500">{t.primaryEmailLabel}</p>
                <a
                  href="mailto:support@alultech.web.id"
                  className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-zinc-100 hover:text-indigo-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>support@alultech.web.id</span>
                </a>
              </div>

              <div>
                <p className="text-xs text-zinc-500">{t.secondaryEmailLabel}</p>
                <a
                  href="mailto:ahzdev@alultech.web.id"
                  className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-zinc-100 hover:text-indigo-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-violet-400" />
                  <span>ahzdev@alultech.web.id</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="h-full min-h-[280px] rounded-xl border border-indigo-400/30 bg-indigo-500/[0.06] p-8 flex flex-col items-start justify-center">
                <CheckCircle2 className="w-8 h-8 text-indigo-300 mb-3" />
                <h3 className="font-display text-xl font-semibold text-white">
                  {t.successTitle}
                </h3>
                <p className="text-sm text-zinc-300 mt-2 leading-relaxed max-w-md">
                  {t.successBodyPrefix}{' '}
                  <span className="font-medium text-white">{name}</span>.{' '}
                  {t.successBodyMid}{' '}
                  <span className="text-indigo-300">{selectedApp}</span>{' '}
                  {t.successBodySuffix}{' '}
                  <a
                    href={`mailto:support@alultech.web.id?subject=${encodeURIComponent(
                      `[Alul Tech] ${selectedApp}`
                    )}&body=${encodeURIComponent(message)}`}
                    className="underline text-indigo-300 hover:text-indigo-200"
                  >
                    support@alultech.web.id
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-6 px-4 py-2 rounded-lg text-xs font-medium text-zinc-200 border border-white/10 hover:bg-white/[0.06] transition-colors"
                >
                  {t.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-zinc-300 mb-1.5"
                    >
                      {t.formNameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.formNamePlaceholder}
                      className="w-full h-11 px-3.5 rounded-xl bg-white/[0.03] border border-white/[0.09] text-sm text-white placeholder:text-zinc-500 focus:border-indigo-400/60 focus:bg-white/[0.05] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-zinc-300 mb-1.5"
                    >
                      {t.formEmailLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.formEmailPlaceholder}
                      className="w-full h-11 px-3.5 rounded-xl bg-white/[0.03] border border-white/[0.09] text-sm text-white placeholder:text-zinc-500 focus:border-indigo-400/60 focus:bg-white/[0.05] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-app"
                    className="block text-xs font-medium text-zinc-300 mb-1.5"
                  >
                    {t.formAppLabel}
                  </label>
                  <select
                    id="contact-app"
                    value={selectedApp}
                    onChange={(e) => setSelectedApp(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#12141C] border border-white/[0.09] text-sm text-white focus:border-indigo-400/60 transition-colors"
                  >
                    <option value={t.formAppAll}>{t.formAppAll}</option>
                    {ALUL_APPS.map((app) => (
                      <option key={app.id} value={`${app.name} (${app.packageId})`}>
                        {app.name} — {app.locales[lang].subtitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-zinc-300 mb-1.5"
                  >
                    {t.formMessageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.formMessagePlaceholder}
                    className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.09] text-sm text-white placeholder:text-zinc-500 focus:border-indigo-400/60 focus:bg-white/[0.05] transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs text-rose-400">
                    {error}
                  </p>
                )}

                <div className="pt-1 flex items-center justify-between gap-4">
                  <p className="text-xs text-zinc-500">{t.formHint}</p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white accent-gradient-btn hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.formSubmit}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
