import { ShieldCheck, X, Heart, PhoneCall } from 'lucide-react'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl transition-all sm:p-7">
        <div className="flex items-start justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--bg-lavender-soft)] text-[var(--lavender-primary)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 id="privacy-modal-title" className="text-lg font-semibold text-[var(--text-primary)]">
                Privasi & Keamanan Curhat
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Transparansi penuh tentang bagaimana data Anda dikelola
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal privasi"
            className="rounded-full p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-lavender-soft)] hover:text-[var(--text-primary)] transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm text-[var(--text-secondary)] max-h-[60vh] overflow-y-auto pr-1">
          <section className="rounded-2xl bg-[var(--bg-surface-subtle)] p-4 border border-[var(--border-subtle)]">
            <h4 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-1.5">
              <Heart className="h-4 w-4 text-[var(--lavender-primary)]" />
              Ruang Aman & Tanpa Database Permanen
            </h4>
            <p className="text-xs leading-relaxed">
              TemanRuang AI dirancang sebagai tempat bercerita yang nyaman. Riwayat percakapan Anda disimpan secara privat di peramban lokal (localStorage) perangkat Anda sehingga tidak hilang saat halaman disegarkan (refresh). Kami tidak menyimpan log percakapan pribadi Anda ke dalam database server ataupun menjual data Anda.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-semibold text-[var(--text-primary)]">Pemrosesan AI Eksternal</h4>
            <p className="text-xs leading-relaxed">
              Pesan yang Anda kirimkan diteruskan secara terenkripsi ke penyedia model kecerdasan buatan (seperti Vercel AI Gateway / OpenAI / Google Gemini) semata-mata untuk menghasilkan balasan percakapan secara langsung (real-time streaming).
            </p>
          </section>

          <section className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 p-4">
            <h4 className="font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-1">
              <PhoneCall className="h-4 w-4" />
              Penting: Bukan Pengganti Tenaga Medis
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-200/90 leading-relaxed">
              TemanRuang AI adalah pendengar virtual, bukan psikolog berlisensi, psikiater, ataupun dokter. Jika Anda sedang menghadapi krisis emosional berat, ide melukai diri, atau bahaya nyata, harap hubungi bantuan profesional manusia atau layanan krisis berikut:
            </p>
            <ul className="mt-2 text-xs space-y-1 text-amber-900 dark:text-amber-200 font-medium">
              <li>• <strong>Layanan Sejiwa (Kemenkes):</strong> 119 ekstensi 8</li>
              <li>• <strong>Halo Kemenkes:</strong> 1500-567</li>
              <li>• <strong>Yayasan Pulih (Konseling):</strong> +62 811-8436-633</li>
              <li>• <strong>Layanan Darurat Nasional:</strong> 112</li>
            </ul>
          </section>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[var(--lavender-primary)] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  )
}
