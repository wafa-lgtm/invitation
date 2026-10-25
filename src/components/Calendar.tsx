import { useT } from '../i18n'

export function Calendar({ date }: { date: string }) {
  const { t } = useT()
  const [y, m, d] = date.split('-').map(Number)
  const loc = t('locale')
  const first = new Date(y, m - 1, 1)
  const offset = (first.getDay() + 6) % 7 // Monday first
  const days = new Date(y, m, 0).getDate()
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  // Use a reference week starting Monday (Jan 1, 2024 was Monday)
  const wd = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(loc, { weekday: 'narrow' }).format(new Date(2024, 0, 1 + i))
  )
  const month = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric' }).format(first)

  return (
    <div
      className="calendar"
      role="img"
      aria-label={new Intl.DateTimeFormat(loc, { dateStyle: 'full' }).format(new Date(y, m - 1, d))}
    >
      <div className="calendar__month">{month}</div>
      <div className="calendar__grid" aria-hidden="true">
        {wd.map((w, i) => (
          <span key={`wd-${i}`} className="calendar__wd">
            {w}
          </span>
        ))}
        {cells.map((c, i) => (
          <span
            key={`cell-${i}`}
            className={c === d ? 'calendar__day is-event' : 'calendar__day'}
          >
            {c ?? ''}
          </span>
        ))}
      </div>
    </div>
  )
}
