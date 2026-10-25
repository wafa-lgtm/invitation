import { createRoot } from 'react-dom/client'
import { event } from './config/event'
import App from './App'
import './styles.css'

const t = event.theme
const typo = event.typography
const r = document.documentElement.style

// Apply theme custom properties from config
r.setProperty('--ivory', t.ivory)
r.setProperty('--cream', t.cream)
r.setProperty('--gold', t.gold)
r.setProperty('--gold-soft', t.goldSoft)
r.setProperty('--rose', t.rose)
r.setProperty('--ink', t.ink)

// Apply typography properties from config
if (typo) {
  r.setProperty('--font-body-fr', typo.fontBodyFr)
  r.setProperty('--font-script-fr', typo.fontScriptFr)
  r.setProperty('--font-body-ar', typo.fontBodyAr)
  r.setProperty('--font-script-ar', typo.fontScriptAr)
}

createRoot(document.getElementById('root')!).render(<App />)
