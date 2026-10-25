import { createContext, useContext } from 'react'
import { fr, type Dict } from './fr'
import { ar } from './ar'
import { languages, type Lang } from '../config/event'

export type { Lang, Dict }
export const dictionaries: Record<Lang, Dict> = { fr, ar }
export const isRtl = (l: string) => (languages.rtl as readonly string[]).includes(l)
export const I18nContext = createContext<Lang>(languages.default)

export function useT() {
  const lang = useContext(I18nContext)
  const d = dictionaries[lang] ?? dictionaries.fr
  const t = (key: keyof Dict, vars: Record<string, string> = {}) =>
    Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, v), d[key] ?? '')
  return { t, lang, dir: isRtl(lang) ? 'rtl' : 'ltr' }
}
