import { useT } from '../i18n'

/**
 * A highly visible privacy notice asking guests to respect
 * the bride's privacy and not take photos of her.
 */
export function PrivacyNotice() {
  const { t } = useT()

  return (
    <section className="privacy-notice reveal" aria-labelledby="privacy-title">
      {/* Animated glowing border */}
      <div className="privacy-notice__glow" aria-hidden="true" />

      <div className="privacy-notice__content">
        {/* Camera-off icon */}
        <div className="privacy-notice__icon" aria-label={t('privacyIcon')}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="privacy-notice__svg"
          >
            {/* Camera body */}
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            {/* Lens circle */}
            <circle cx="12" cy="13" r="4" />
            {/* Slash line (camera-off) */}
            <line x1="1" y1="1" x2="23" y2="23" strokeWidth="2.2" />
          </svg>
        </div>

        <h2 id="privacy-title" className="privacy-notice__title">
          {t('privacyTitle')}
        </h2>

        <p className="privacy-notice__message">
          {t('privacyMessage')}
        </p>

        {/* Decorative bottom flourish */}
        <div className="privacy-notice__flourish" aria-hidden="true">
          ✦ ✦ ✦
        </div>
      </div>
    </section>
  )
}
