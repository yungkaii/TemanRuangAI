import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='dark')?'dark':'light';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(mode);root.setAttribute('data-theme',mode);root.style.colorScheme=mode;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      },
      {
        title: 'TemanRuang AI — Cerita aja, aku dengerin.',
      },
      {
        name: 'description',
        content: 'TemanRuang AI adalah ruang virtual yang hangat dan aman untuk bercerita, mencurahkan isi hati, dan didengar tanpa dihakimi.',
      },
      {
        property: 'og:title',
        content: 'TemanRuang AI — Cerita aja, aku dengerin.',
      },
      {
        property: 'og:description',
        content: 'Ruang virtual yang hangat dan aman untuk bercerita, mencurahkan isi hati, dan didengar tanpa dihakimi.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'theme-color',
        content: '#FAF8F5',
        media: '(prefers-color-scheme: light)',
      },
      {
        name: 'theme-color',
        content: '#0A0E1A',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased text-[var(--text-primary)] bg-[var(--bg-canvas)]">
        <div className="cute-ambient-bg" aria-hidden="true">
          <div className="cloud-blob-bottom-right" />
          <div className="cloud-blob-bottom-left" />
          <div className="cloud-blob-top-right" />
        </div>
        <div className="relative z-10 flex h-dvh w-full overflow-hidden">
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  )
}
