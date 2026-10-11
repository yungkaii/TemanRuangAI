import { AlertTriangle, Trash2 } from 'lucide-react'

interface ClearChatDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isNewChat?: boolean
}

export default function ClearChatDialog({
  isOpen,
  onClose,
  onConfirm,
  isNewChat = false,
}: ClearChatDialogProps) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl transition-all">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 id="clear-dialog-title" className="text-base font-semibold text-[var(--text-primary)]">
              {isNewChat ? 'Mulai Curhat Baru?' : 'Hapus Percakapan Ini?'}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
              {isNewChat
                ? 'Percakapan saat ini akan ditutup dan Anda akan memulai ruang obrolan baru yang bersih.'
                : 'Semua pesan dalam sesi obrolan ini akan dihapus dari layar. Tindakan ini tidak dapat dibatalkan.'}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)] transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {isNewChat ? 'Mulai Baru' : 'Hapus Sekarang'}
          </button>
        </div>
      </div>
    </div>
  )
}
