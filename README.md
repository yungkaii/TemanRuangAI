# TemanRuang AI

> **"Cerita aja, aku dengerin."**

TemanRuang AI adalah web aplikasi teman virtual berbasis kecerdasan buatan (*AI-powered virtual companion*) di mana pengguna dapat dengan leluasa mencurahkan perasaan, berbagi pengalaman pribadi, mendiskusikan dinamika hubungan, sekolah, keluarga, atau sekadar melepas beban pikiran, serta menerima respon yang hangat, empatik, dan bebas penghakiman dalam Bahasa Indonesia alami.

---

## 🌟 Fitur Utama

1. **Pengalaman Chat Empatik & Mengalir (Streaming Real-time)**
   - Respon AI berbasis streaming yang cepat dan mulus menggunakan **Vercel AI SDK**.
   - Pemisah gelembung chat visual yang elegan antara pengguna dan AI.
   - Pilihan *conversation starters* satu klik untuk langsung memulai curhat.
   - Auto-resizing textarea composer dengan pintasan keyboard (`Enter` untuk kirim, `Shift + Enter` untuk baris baru).
   - Indikator mengetik (*breathing typing indicator*) dengan mikro-animasi menenangkan.
   - Kontrol *Stop Generation* dan tombol *Respon Ulang / Retry*.
   - Salin isi balasan AI dengan satu klik ke clipboard.

2. **3 Mode Percakapan Nyata (*Genuine Server Modes*)**
   Setiap mode genuinely mempengaruhi instruksi sistem (*system prompt*) di server:
   - **Dengerin Aku (`listen`)**: AI fokus menjadi pendengar aktif (*active listener*), merefleksikan dan memvalidasi emosi tanpa memberikan nasihat atau solusi yang tidak diminta.
   - **Kasih Aku Saran (`advice`)**: AI memahami situasi dan perasaan terlebih dahulu, lalu menawarkan perspektif serta saran praktis yang seimbang dan lembut sebagai bahan pertimbangan.
   - **Bantu Aku Cari Solusi (`solution`)**: AI mengurai masalah rumit menjadi langkah-langkah kecil (*bite-sized manageable action steps*) yang realistis dan terstruktur tanpa membebani pengguna.

3. **Desain Premium, Menenangkan & Responsif**
   - Palet warna lembut: *Soft Lavender*, *Warm Off-White*, *Warm Beige*, dan aksen *Muted Blue*.
   - Tema Gelap (*Dark Navy*) dan Tema Terang (*Warm Off-White*) dengan toggle tema instan (Terang / Gelap / Sistem).
   - Sidebar desktop *collapsible* dan *mobile slide-over drawer* yang nyaman di ponsel maupun tablet.
   - Tipografi modern menggunakan *Plus Jakarta Sans*.

4. **Privasi & Keamanan Sesi Browser**
   - Percakapan disimpan secara aman di memori sesi peramban (*active browser session*).
   - Tidak ada database permanen yang menyimpan atau memperdagangkan curhat pribadi pengguna.
   - Tombol *Bersihkan Chat* dengan modal konfirmasi perlindungan dari penghapusan tidak sengaja.
   - Pengingat keselamatan (*safety guardrail*) dan nomor kontak darurat resmi Indonesia (Sejiwa 119 ext 8, Halo Kemenkes 1500-567, Yayasan Pulih +628118436633, Darurat 112).

5. **Multi-Provider AI Terintegrasi**
   - Mendukung **Vercel AI Gateway**, **OpenAI** (`gpt-4o-mini`, dll), dan **Google Gemini** (`gemini-2.0-flash`, dll).
   - Validasi payload ketat menggunakan **Zod** dan batas panjang pesan untuk mencegah penyalahgunaan.
   - Penanganan ramah jika API key belum dikonfigurasi—situs tetap berjalan lancar dengan modal panduan interaktif.

---

## 🛠️ Arsitektur Teknologi

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack React framework dengan SSR dan Server Routes)
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based type-safe routing)
- **UI Library**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **AI Engine**: [Vercel AI SDK](https://ai-sdk.dev) (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`, `@ai-sdk/google`)
- **Icons**: Lucide React
- **Server Engine**: Nitro

---

## 📋 Prasyarat

- **Node.js**: Versi 20+ atau 22+ (diuji pada v26.x)
- **npm** / **pnpm** / **yarn**
- Kunci API dari salah satu penyedia AI:
  - Vercel AI Gateway (`AI_GATEWAY_API_KEY`), atau
  - OpenAI API (`OPENAI_API_KEY`), atau
  - Google Gemini API (`GOOGLE_GENERATIVE_AI_API_KEY` / `GEMINI_API_KEY`)

---

## 🚀 Panduan Instalasi & Menjalankan Lokal

### 1. Kloning atau Buka Direktori Proyek
```bash
cd TemanRuangAI
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Konfigurasi Kunci API (.env)
Salin berkas `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Buka file `.env` dan masukkan API key Anda. Contoh:

#### Pilihan A: Vercel AI Gateway (Rekomendasi)
```dotenv
AI_GATEWAY_API_KEY=vcaig_xxxxxxxxxxxxxxxxxxxxxxxx
AI_MODEL=anthropic/claude-3-5-sonnet-20241022
```

#### Pilihan B: OpenAI
```dotenv
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
AI_MODEL=gpt-4o-mini
```

#### Pilihan C: Google Gemini
```dotenv
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxx
AI_MODEL=gemini-2.0-flash
```

*(Catatan: Jika `.env` belum diisi, website tetap dapat dibuka dan dinavigasi dengan baik. Saat mengirim pesan, sistem akan menampilkan panduan konfigurasi yang ramah).*

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 🧪 Perintah Pengujian & Verifikasi

- **Type Check (TypeScript)**:
  ```bash
  npx tsc --noEmit
  ```
- **Generate Routes (TanStack Router)**:
  ```bash
  npm run generate-routes
  ```
- **Build Produksi**:
  ```bash
  npm run build
  ```
- **Pratinjau Hasil Build**:
  ```bash
  npm run preview
  ```

---

## 📁 Struktur Proyek

```
TemanRuangAI/
├── .env.example              # Contoh konfigurasi environment
├── package.json              # Konfigurasi dependensi dan scripts
├── tsconfig.json             # Konfigurasi TypeScript
├── vite.config.ts            # Konfigurasi Vite & TanStack Start plugin
├── src/
│   ├── routes/
│   │   ├── __root.tsx        # Root layout, meta tag, & theme initializer
│   │   ├── index.tsx         # Halaman utama chat experience TemanRuang AI
│   │   ├── about.tsx         # Halaman tentang & panduan keselamatan
│   │   └── api/
│   │       └── chat.ts       # Server endpoint POST /api/chat dengan AI streaming
│   ├── components/
│   │   ├── Sidebar.tsx       # Sidebar desktop collapsible & mobile drawer
│   │   ├── ChatArea.tsx      # Bubble chat, empty state, starters, & streaming indicator
│   │   ├── ChatInput.tsx     # Auto-resizing message composer & send buttons
│   │   ├── ModeSelector.tsx  # Pilihan 3 mode percakapan (Dengerin, Saran, Solusi)
│   │   ├── ThemeToggle.tsx   # Pengalih tema (Terang / Gelap / Sistem)
│   │   ├── PrivacyModal.tsx  # Modal transparansi privasi & hotline darurat
│   │   ├── ClearChatDialog.tsx # Modal konfirmasi pembersihan chat
│   │   └── ApiKeyModal.tsx   # Panduan konfigurasi kunci API
│   ├── server/
│   │   ├── ai-personality.ts # System prompt & instruksi tiap mode percakapan
│   │   └── ai-provider.ts    # Resolusi provider AI (Gateway, OpenAI, Gemini)
│   ├── styles.css            # Desain token, warna lavender/off-white, animasi
│   └── routeTree.gen.ts      # Berkas rute otomatis TanStack Router
```

---

## 🌐 Pertimbangan Penerapan (*Deployment Considerations*)

1. **Platform**: Proyek siap di-*deploy* ke platform seperti Vercel, Netlify, Cloudflare Workers, atau server mandiri yang mendukung Node.js / Nitro.
2. **Environment Variables**: Pastikan menyetel salah satu kunci API (`AI_GATEWAY_API_KEY`, `OPENAI_API_KEY`, atau `GOOGLE_GENERATIVE_AI_API_KEY`) pada panel Environment Variables penyedia hosting Anda.
3. **Kerahasiaan Kunci API**: Kunci API hanya diproses di sisi server (`src/routes/api/chat.ts` dan `src/server/ai-provider.ts`) dan tidak pernah dikirimkan atau diekspos ke klien browser.
4. **Header Keamanan**: Pertimbangkan mengaktifkan Content Security Policy (CSP) dan pembatas laju permintaan (*rate limiting*) tambahan jika diluncurkan untuk publik skala besar.

---

## 👨‍💻 Pengembang
Developed by: **yukafii**

---

## 📄 Lisensi
Dilisensikan di bawah lisensi MIT.
TemanRuang AI dibuat untuk mendukung kesejahteraan emosional secara positif dan inklusif.
