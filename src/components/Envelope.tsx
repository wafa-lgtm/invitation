import { useState } from 'react'
import { useT } from '../i18n'
import { event, resolveLocalized } from '../config/event'

export function Envelope({ onDone }: { onDone: () => void }) {
  const { t, lang } = useT()
  const [opening, setOpening] = useState(false)
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

  const open = () => {
    if (opening) return
    setOpening(true)
    setTimeout(onDone, reduce ? 150 : 1900)
  }

  const brideName = resolveLocalized(event.brideName, lang, 'Manel')
  const sealLetter = brideName.trim().charAt(0)

  return (
    <div className={`intro ${opening ? 'is-opening' : ''}`} id="envelope-screen">
      <button
        id="envelope-trigger"
        type="button"
        className="envelope"
        onClick={open}
        aria-label={`${t('envelopeLabel')} — ${t('open')}`}
      >
        <span className="envelope__card">
          <span className="script">{brideName}</span>
        </span>
        <span className="envelope__back" />
        <span className="envelope__front" />
        <span className="envelope__flap" />
        <span className="envelope__seal" aria-hidden="true">
          {sealLetter}
        </span>
      </button>
      <p className="intro__cta" id="envelope-cta">{t('open')}</p>
      <p className="intro__hint" id="envelope-hint">{t('tapHint')}</p>
    </div>
  )
}
