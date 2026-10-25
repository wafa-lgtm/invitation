import { useT } from '../i18n'
import { event } from '../config/event'

export function DeveloperWatermark() {
  const { dir } = useT()
  const company = event.developer.company ?? 'Sudaym Company'

  return (
    <div
      className="landing-copyright"
      dir={dir}
      aria-label={`Copyright ${company}`}
    >
      <span>© 2026 {company}</span>
    </div>
  )
}
