// Central event configuration. One file to edit per client.
// Reusable components consume this configuration without hardcoded client details.

export type LocalizedValue<T = string> = T | { fr: T; ar: T }
export type Lang = 'fr' | 'ar'

export interface EventConfig {
  familyName: LocalizedValue<string>
  brideName: LocalizedValue<string>
  groomName?: LocalizedValue<string>
  eventType: 'dinner' | 'wedding'
  date: string // YYYY-MM-DD
  time: string // 24-hour format HH:mm
  venue: {
    name: LocalizedValue<string>
    address: LocalizedValue<string>
    country: LocalizedValue<string>
  }
  googleMapsUrl: string
  developer: {
    company?: string
    phone: string
    internationalPhone: string
    prefilledMessage?: LocalizedValue<string>
  }
  messages: {
    intro?: LocalizedValue<string>
    blessing: LocalizedValue<string>
    closing: LocalizedValue<string>
  }
  theme: {
    ivory: string
    cream: string
    gold: string
    goldSoft: string
    rose: string
    ink: string
  }
  typography: {
    fontBodyFr: string
    fontScriptFr: string
    fontBodyAr: string
    fontScriptAr: string
  }
}

export const event: EventConfig = {
  familyName: { fr: 'Doussas', ar: 'دوساس' },
  brideName: { fr: 'Manel', ar: 'منال' },
  groomName: undefined, // Optional: e.g. { fr: 'Karim', ar: 'كريم' }
  eventType: 'dinner',
  date: '2026-10-23',
  time: '15:00',
  venue: {
    name: { fr: 'Salle des Fêtes El Sahel', ar: 'قاعة الحفلات الساحل' },
    address: { fr: 'Birtouta, Alger', ar: 'بئر توتة، الجزائر العاصمة' },
    country: { fr: 'Algérie', ar: 'الجزائر' },
  },
  // Confirmed Google Maps destination URL
  googleMapsUrl: 'https://maps.app.goo.gl/3Lej9vHag5EAiSsY9?g_st=afm',
  // Developer contact & click-to-chat WhatsApp
  developer: {
    company: 'Sudaym Company',
    phone: '0780141023',
    internationalPhone: '213780141023',
    prefilledMessage: {
      fr: 'Bonjour ! Je vous contacte via le site du faire-part de mariage (Sudaym Company).',
      ar: 'مرحباً، أتواصل معكم عبر موقع دعوة الزفاف (Sudaym Company).',
    },
  },
  messages: {
    blessing: {
      fr: 'Nous serions honorés de votre présence pour partager ce moment de joie et de bonheur.',
      ar: 'يسرّنا ويشرفنا حضوركم لتشاركونا فرحتنا بهذه المناسبة السعيدة.',
    },
    closing: {
      fr: 'Votre présence sera notre plus beau cadeau.',
      ar: 'حضوركم سيكون أجمل هدية لنا.',
    },
  },
  theme: {
    ivory: '#fbf7ef',
    cream: '#f3ead9',
    gold: '#b8923f',
    goldSoft: '#d9c08a',
    rose: '#c9a39a',
    ink: '#4a3f35',
  },
  typography: {
    fontBodyFr: "'Cormorant Garamond', Georgia, serif",
    fontScriptFr: "'Great Vibes', cursive",
    fontBodyAr: "'Amiri', serif",
    fontScriptAr: "'Amiri', serif",
  },
}

export const languages = {
  default: 'fr' as Lang,
  available: ['fr', 'ar'] as const,
  rtl: ['ar'] as const,
  displayNames: {
    fr: 'Français',
    ar: 'العربية',
  } as Record<Lang, string>,
}

/**
 * Resolves a potentially localized value according to the current language.
 */
export function resolveLocalized<T>(val: LocalizedValue<T> | undefined, currentLang: Lang, fallback: T): T {
  if (val === undefined || val === null) return fallback
  if (typeof val === 'object' && val !== null && ('fr' in val || 'ar' in val)) {
    const loc = val as { fr: T; ar: T }
    return loc[currentLang] ?? loc.fr ?? fallback
  }
  return val as T
}
