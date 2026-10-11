import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export type ThemeMode = 'light' | 'dark'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }
  const stored = window.localStorage.getItem('theme')
  return stored === 'dark' ? 'dark' : 'light'
}

function applyThemeMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(mode)
  document.documentElement.setAttribute('data-theme', mode)
  document.documentElement.style.colorScheme = mode
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<ThemeMode>('light')

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  function toggleMode() {
    const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light'
    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  const label =
    mode === 'dark'
      ? 'Tema: Gelap. Klik untuk ganti ke Terang.'
      : 'Tema: Terang. Klik untuk ganti ke Gelap.'

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] shadow-sm transition hover:bg-[var(--bg-lavender-soft)] hover:text-[var(--text-primary)] hover:border-[var(--lavender-accent)] ${
        compact ? 'p-2' : ''
      }`}
    >
      {mode === 'dark' ? (
        <Moon className="h-4 w-4 text-violet-400" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500" />
      )}
      {!compact && (
        <span className="capitalize">
          {mode === 'dark' ? 'Gelap' : 'Terang'}
        </span>
      )}
    </button>
  )
}
