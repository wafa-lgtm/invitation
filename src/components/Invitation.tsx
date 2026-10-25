import { event, resolveLocalized } from '../config/event'
import { useT } from '../i18n'
import { Ornament } from './Ornament'
import { Calendar } from './Calendar'
import { MapsButton } from './integrations/MapsButton'
import { WhatsAppButton } from './integrations/WhatsAppButton'
import { PrivacyNotice } from './PrivacyNotice'

export function Invitation() {
  const { t, lang } = useT()
  const [y, m, d] = event.date.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(t('locale'), o).format(dt)
  const eventLine = event.eventType === 'dinner' ? t('eventDinner') : t('eventWedding')

  const familyName = resolveLocalized(event.familyName, lang, 'Doussas')
  const brideName = resolveLocalized(event.brideName, lang, 'Manel')
  const groomName = event.groomName ? resolveLocalized(event.groomName, lang, '') : undefined

  const venueName = resolveLocalized(event.venue.name, lang, 'Salle des Fêtes El Sahel')
  const venueAddress = resolveLocalized(event.venue.address, lang, 'Birtouta, Alger')
  const venueCountry = resolveLocalized(event.venue.country, lang, 'Algérie')

  const blessingText = resolveLocalized(event.messages.blessing, lang, t('blessing'))
  const closingText = resolveLocalized(event.messages.closing, lang, t('closing'))

  const prefilled = resolveLocalized(event.developer.prefilledMessage, lang, '')
  const whatsappUrl = event.developer.internationalPhone
    ? `https://wa.me/${event.developer.internationalPhone}${prefilled ? `?text=${encodeURIComponent(prefilled)}` : ''}`
    : undefined

  const timeDisplay = lang === 'fr' ? event.time.replace(':', 'h') : event.time

  return (
    <main className="page" id="main-content">
      <section className="paper hero reveal">
        <Ornament />
        <p className="eyebrow">{t('invitedBy', { family: familyName })}</p>
        <p className="lead">{eventLine}</p>
        <h1 className="script names">
          {brideName}
          {groomName && (
            <>
              <span className="amp"> {t('and')} </span>
              {groomName}
            </>
          )}
        </h1>
        <p className="lead">{blessingText}</p>
        <Ornament />
      </section>

      <section className="paper reveal" aria-labelledby="when">
        <h2 id="when" className="label">{t('date')}</h2>
        <p className="bigdate">
          <span className="cap">{f({ weekday: 'long' })}</span>
          <strong>{f({ day: 'numeric' })}</strong>
          <span className="cap">{f({ month: 'long', year: 'numeric' })}</span>
        </p>
        <p className="time">{t('fromTime', { time: timeDisplay })}</p>
        <Calendar date={event.date} />
      </section>

      <section className="paper reveal" aria-labelledby="where">
        <h2 id="where" className="label">{t('venue')}</h2>
        <p className="venue">{venueName}</p>
        <p className="addr">{venueAddress}, {venueCountry}</p>
        <MapsButton
          href={event.googleMapsUrl}
          label={t('location')}
          ariaLabel={`${t('location')} — ${venueName}`}
        />
      </section>

      <PrivacyNotice />

      <section className="closing reveal">
        <Ornament />
        <p className="script closing__text">{closingText}</p>
      </section>

      <aside className="dev" aria-label={t('developer')}>
        <span className="dev__title">{t('developer')} :</span>
        <a
          href={`tel:${event.developer.phone}`}
          className="dev__phone"
          aria-label={`Téléphone: ${event.developer.phone}`}
        >
          {event.developer.phone}
        </a>
        <WhatsAppButton
          href={whatsappUrl}
          label={t('whatsapp')}
          ariaLabel={t('whatsappAria')}
        />
      </aside>

      <footer className="foot">
        {t('footer')} · {familyName}
      </footer>
    </main>
  )
}
