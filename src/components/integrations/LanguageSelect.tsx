import type { Lang } from '../../i18n'
import { languages } from '../../config/event'

export interface LanguageSelectProps {
  value: Lang
  options: readonly Lang[]
  label: string
  onChange: (l: Lang) => void
}

export function LanguageSelect({ value, options, label, onChange }: LanguageSelectProps) {
  return (
    <aside className="lang-bar" aria-label={label} id="language-switcher">
      <div className="lang" role="group" aria-label={label}>
        {options.map((o) => {
          const isActive = o === value
          const displayName = languages.displayNames[o] ?? o.toUpperCase()
          return (
            <button
              key={o}
              id={`lang-toggle-${o}`}
              type="button"
              className={`lang__btn ${isActive ? 'is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => onChange(o)}
              lang={o}
              dir={o === 'ar' ? 'rtl' : 'ltr'}
            >
              {displayName}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
