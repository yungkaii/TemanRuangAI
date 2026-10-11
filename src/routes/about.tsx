import { createFileRoute, Link } from '@tanstack/react-router'
import { Sparkles, ArrowLeft, HeartHandshake, PhoneCall } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 sm:py-12 bg-[var(--bg-canvas)]">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-sm hover:bg-[var(--bg-lavender-soft)] hover:text-[var(--lavender-primary)] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Ruang Curhat</span>
        </Link>

        {/* Hero Section */}
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--lavender-primary)] text-white shadow-md shadow-violet-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                TemanRuang AI
              </h1>
              <p className="text-sm text-[var(--lavender-primary)] font-medium">
                "Cerita aja, aku dengerin."
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            TemanRuang AI adalah teman virtual yang dirancang untuk memberikan ruang aman, hangat, dan tanpa penghakiman bagi siapa saja yang sedang membutuhkan tempat untuk mencurahkan isi hati, unek-unek, atau sekadar berbagi cerita keseharian dalam Bahasa Indonesia yang alami.
          </p>
        </div>

        {/* 3 Modes Explanation */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
            <HeartHandshake className="h-5 w-5 text-[var(--lavender-primary)]" />
            Tiga Mode Percakapan
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
              <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1">
                1. Dengerin Aku
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Fokus mendengarkan secara aktif dan memvalidasi emosi Anda. AI tidak akan memberikan nasihat yang tidak diminta.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
              <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1">
                2. Kasih Aku Saran
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Memahami situasi dan perasaan Anda terlebih dahulu, kemudian menawarkan sudut pandang yang bijak dan berimbang.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
              <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1">
                3. Bantu Aku Cari Solusi
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Membantu mengurai masalah rumit menjadi langkah-langkah kecil yang konkret dan realistis tanpa membebani Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Safety & Crisis Helplines */}
        <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 p-5 space-y-2">
          <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <PhoneCall className="h-4 w-4" />
            Pemberitahuan Keselamatan & Bantuan Krisis
          </h3>
          <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed">
            TemanRuang AI bukan pengganti psikolog, psikiater, ataupun layanan medis berlisensi. Jika Anda atau orang terdekat sedang berada dalam krisis emosional mendesak atau bahaya nyata, harap hubungi layanan bantuan darurat di Indonesia:
          </p>
          <ul className="text-xs text-amber-900 dark:text-amber-200 space-y-1 font-medium pl-2">
            <li>• Layanan Sejiwa (Kemenkes): <strong>119 ekstensi 8</strong></li>
            <li>• Halo Kemenkes: <strong>1500-567</strong></li>
            <li>• Yayasan Pulih (Konseling): <strong>+62 811-8436-633</strong></li>
            <li>• Layanan Darurat Nasional: <strong>112</strong></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
