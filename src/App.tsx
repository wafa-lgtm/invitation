import { useEffect, useState } from 'react'
import { I18nContext, isRtl, type Lang } from './i18n'
import { languages } from './config/event'
import { Envelope } from './components/Envelope'
import { Invitation } from './components/Invitation'
import { LanguageSelect } from './components/integrations/LanguageSelect'
import { DeveloperWatermark } from './components/DeveloperWatermark'

const STORAGE_KEY = 'wedding_invitation_lang'

function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && (languages.available as readonly string[]).includes(saved)) {
      return saved as Lang
    }
  } catch {
    // Ignore storage errors (private mode, restrictions)
  }
  return languages.default
}

export default function App() {
  const [lang, setLang] = useState<Lang>(getInitialLang)
  const [opened, setOpened] = useState(false)

  const handleLanguageChange = (nextLang: Lang) => {
    setLang(nextLang)
    try {
      localStorage.setItem(STORAGE_KEY, nextLang)
    } catch {
      // Ignore storage errors
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl(lang) ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <I18nContext.Provider value={lang}>
      <LanguageSelect
        value={lang}
        options={languages.available}
        label={lang === 'fr' ? 'Changer de langue' : 'تغيير اللغة'}
        onChange={handleLanguageChange}
      />
      <DeveloperWatermark />
      {opened ? <Invitation /> : <Envelope onDone={() => setOpened(true)} />}
    </I18nContext.Provider>
  )
}
