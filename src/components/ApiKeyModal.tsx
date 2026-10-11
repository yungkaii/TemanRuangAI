import { KeyRound, X, Copy, Check, Sparkles, Terminal } from 'lucide-react'
import { useState } from 'react'

interface ApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [copied, setCopied] = useState<string | null>(null)

  if (!isOpen) return null

  const envSnippet = `# Pilihan 1: Vercel AI Gateway (Rekomendasi untuk akses multi-model)
AI_GATEWAY_API_KEY=vcaig_xxxxxxxxxxxxxxxx

# Pilihan 2: OpenAI API
# OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
# AI_MODEL=gpt-4o-mini

# Pilihan 3: Google Gemini API
# GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyxxxxxxxxxxxxxxx
# AI_MODEL=gemini-2.0-flash`

  function copyToClipboard(text: string, label: string) {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl transition-all sm:p-7">
        <div className="flex items-start justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--bg-lavender-soft)] text-[var(--lavender-primary)]">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 id="api-modal-title" className="text-lg font-semibold text-[var(--text-primary)]">
                Konfigurasi AI Provider
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Cara mengaktifkan balasan AI cerdas di TemanRuang AI
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal konfigurasi"
            className="rounded-full p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-lavender-soft)] hover:text-[var(--text-primary)] transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm text-[var(--text-secondary)] max-h-[60vh] overflow-y-auto pr-1">
          <p className="text-xs leading-relaxed">
            TemanRuang AI menggunakan <strong>Vercel AI SDK</strong> dengan dukungan streaming langsung. Agar AI dapat merespons cerita Anda secara nyata, Anda dapat menyediakan salah satu API key berikut pada file <code className="rounded bg-[var(--bg-lavender-soft)] px-1.5 py-0.5 text-xs text-[var(--lavender-primary)] font-mono">.env</code> di root proyek:
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-[var(--lavender-primary)]" />
                Contoh Isi File .env
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(envSnippet, 'env')}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--lavender-primary)] hover:underline"
              >
                {copied === 'env' ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" /> Disalin!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Salin Template
                  </>
                )}
              </button>
            </div>
            <pre className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] p-3 text-[11px] font-mono leading-relaxed text-[var(--text-primary)] overflow-x-auto">
              {envSnippet}
            </pre>
          </div>

          <div className="rounded-2xl bg-[var(--bg-lavender-subtle)] border border-[var(--border-subtle)] p-3.5 space-y-2">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[var(--lavender-primary)]" />
              Langkah Singkat Menjalankan:
            </h4>
            <ol className="text-xs space-y-1.5 list-decimal pl-4 leading-relaxed">
              <li>Buat file <code className="font-mono">.env</code> di root folder proyek.</li>
              <li>Masukkan salah satu API key yang Anda miliki (misalnya OpenAI / Gemini / Vercel AI Gateway).</li>
              <li>Restart dev server dengan menjalankan kembali perintah <code className="font-mono bg-[var(--bg-surface)] px-1 rounded">npm run dev</code>.</li>
              <li>Kembali ke halaman ini dan kirimkan curhat pertama Anda!</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[var(--lavender-primary)] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
