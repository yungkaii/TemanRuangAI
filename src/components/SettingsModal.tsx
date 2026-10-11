import { Settings, X, Trash2, Heart } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onClearAllSessions: () => void
}

export default function SettingsModal({
  isOpen,
  onClose,
  onClearAllSessions,
}: SettingsModalProps) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl transition-all">
        <div className="flex items-start justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#7886FA]">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h3 id="settings-modal-title" className="text-base font-bold text-[var(--text-primary)]">
                Pengaturan
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Sesuaikan kenyamanan ruang curhatmu
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal pengaturan"
            className="rounded-full p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-lavender-soft)] hover:text-[var(--text-primary)] transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-xs text-[var(--text-secondary)]">
          {/* Theme Option */}
          <div className="flex items-center justify-between rounded-2xl bg-[var(--bg-surface-subtle)] p-3.5 border border-[var(--border-subtle)]">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Tampilan Tema</p>
              <p className="text-[11px] text-[var(--text-muted)]">Pilih mode terang atau gelap</p>
            </div>
            <ThemeToggle />
          </div>

          {/* Clear All Sessions Option */}
          <div className="flex items-center justify-between rounded-2xl bg-[var(--bg-surface-subtle)] p-3.5 border border-[var(--border-subtle)]">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Bersihkan Riwayat Sesi</p>
              <p className="text-[11px] text-[var(--text-muted)]">Hapus seluruh riwayat percakapan dari browser</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClearAllSessions()
                onClose()
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 dark:border-rose-900 bg-white dark:bg-rose-950/30 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/40 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Hapus Semua</span>
            </button>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] p-3 text-center text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-[#7886FA]" />
            <span>TemanRuang AI — Cerita aja, aku dengerin.</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#7886FA] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  )
}
