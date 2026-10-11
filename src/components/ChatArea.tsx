import { useRef, useEffect, useState, type UIEvent } from 'react'
import {
  RotateCcw,
  Copy,
  Check,
  Menu,
  Trash2,
  ArrowDown,
  AlertCircle,
  KeyRound,
  User,
  Sparkle,
} from 'lucide-react'
import type { UIMessage } from 'ai'
import CloudMascot from './CloudMascot'
import CenterIllustration from './CenterIllustration'
import { CONVERSATION_MODES, type ConversationMode } from '../server/ai-personality'

interface ChatAreaProps {
  messages: UIMessage[]
  isLoading: boolean
  error: Error | undefined
  currentMode: ConversationMode
  onSelectStarter?: (text: string) => void
  onRetry: () => void
  onOpenClearDialog: () => void
  onOpenMobileMenu: () => void
  onOpenApiKey: () => void
}

export default function ChatArea({
  messages,
  isLoading,
  error,
  currentMode,
  onRetry,
  onOpenClearDialog,
  onOpenMobileMenu,
  onOpenApiKey,
}: ChatAreaProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollBottom, setShowScrollBottom] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const isNearBottomRef = useRef(true)

  // Track scroll position
  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const threshold = 120
    const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= threshold
    isNearBottomRef.current = isBottom
    setShowScrollBottom(!isBottom)
  }

  // Auto-scroll only if user was already near bottom
  useEffect(() => {
    if (isNearBottomRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isLoading])

  function scrollToBottom() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
      setShowScrollBottom(false)
    }
  }

  function handleCopy(text: string, id: string) {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  // Extract text safely from UIMessage parts
  function getMessageText(message: UIMessage): string {
    if (Array.isArray(message.parts)) {
      return message.parts
        .map((part: any) => {
          if (part.type === 'text') return part.text
          return ''
        })
        .join('')
    }
    return (message as any).text || ''
  }

  function formatTime(date?: Date | number): string {
    const d = date ? new Date(date) : new Date()
    const hours = d.getHours().toString().padStart(2, '0')
    const mins = d.getMinutes().toString().padStart(2, '0')
    return `${hours}:${mins}`
  }

  // Format message text with clean paragraphs
  function renderFormattedText(text: string) {
    if (!text) return null
    const paragraphs = text.split(/\n\n+/)

    return paragraphs.map((para, idx) => {
      const lines = para.split('\n')
      return (
        <p key={idx} className="mb-4 last:mb-0 leading-[1.75]">
          {lines.map((line, lineIdx) => {
            const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ')
            return (
              <span key={lineIdx} className={isBullet ? 'block pl-3 my-0.5' : 'block'}>
                {line}
              </span>
            )
          })}
        </p>
      )
    })
  }

  const modeInfo = CONVERSATION_MODES[currentMode]
  const isApiKeyError =
    error &&
    (error.message.includes('API Key') ||
      error.message.includes('API_KEY') ||
      error.message.includes('AI_GATEWAY_API_KEY') ||
      error.message.includes('OPENAI_API_KEY') ||
      error.message.includes('GOOGLE_GENERATIVE_AI_API_KEY'))

  return (
    <div className="relative flex flex-1 flex-col h-full overflow-hidden bg-[#FDFBF6] dark:bg-[#0F1322]">
      {/* Top Header Bar Matching Screenshot */}
      <header className="flex h-16 lg:h-[82px] shrink-0 items-center justify-between border-b border-[#EBE9F3] dark:border-[#1E2540] bg-[#FDFBF6]/90 dark:bg-[#151A2E]/80 backdrop-blur-md px-4 sm:px-8 lg:px-10 z-10 select-none">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden rounded-xl p-2 text-[#5E6585] hover:bg-[#EEF2FF] transition"
            aria-label="Buka menu navigasi"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Mode Pill Badge Matching Screenshot */}
          <div className="flex items-center gap-3 text-sm lg:text-base">
            <span className="flex h-3 w-3 rounded-full bg-[#1FA971]" />
            <span className="font-bold text-[#2B3590] dark:text-[#F8FAFC]">
              {modeInfo.label}
            </span>
            <span className="h-5 w-px bg-[#DDE0EF]" />
            <span className="text-xs lg:text-[15px] text-[#6B7399] font-medium flex items-center gap-2">
              Teman yang selalu ada untukmu <Sparkle className="h-4 w-4 text-[#7C8CF8] stroke-[1.8]" />
            </span>
          </div>
        </div>

        {/* Clear Chat Button on Right */}
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={onOpenClearDialog}
              aria-label="Bersihkan chat"
              className="inline-flex items-center gap-2.5 rounded-[20px] border border-[#E4E3F0] dark:border-[#2D3748] bg-white/70 dark:bg-[#151A2E] px-4 py-2.5 text-xs lg:text-sm font-semibold text-[#2B3590] dark:text-[#94A3B8] hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 transition shadow-sm"
              title="Bersihkan percakapan saat ini"
            >
              <Trash2 className="h-4 w-4 text-[#5E6EF0]" />
              <span>Bersihkan Chat</span>
            </button>
          )}
        </div>
      </header>

      {/* Ambient background stars and cloud shapes matching screenshot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
        {/* Soft golden stars */}
        <span className="absolute top-[26%] left-[34%] text-[#FBBF24] text-base opacity-70">✦</span>
        <span className="absolute top-[72%] left-[8%] text-[#FCD34D] text-lg opacity-70">✦</span>
        <span className="absolute top-[62%] right-[8%] text-[#FCD34D] text-lg opacity-70">✦</span>
        <span className="absolute top-[76%] left-[11%] h-2.5 w-2.5 rounded-full bg-[#CFD6FB]" />
        <span className="absolute top-[64%] right-[11%] h-2 w-2 rounded-full bg-[#D5DBFB]" />
        <span className="absolute top-[58%] left-[7%] h-9 w-14 rounded-full bg-[#EDEFFD] blur-[1px]" />
        <span className="absolute top-[52%] right-[6%] h-7 w-12 rounded-full bg-[#EDEFFD] blur-[1px]" />
        <span className="absolute top-[67%] left-[36%] text-[#FCD34D] text-base opacity-75">✦</span>
        <span className="absolute top-[65%] right-[15%] text-[#FCD34D] text-base opacity-75">✦</span>
        <span className="absolute top-[48%] right-[33%] text-[#A5B4FC] text-xs opacity-50">✧</span>

        {/* Ambient bottom-right cloud shape */}
        <svg
          className="absolute -bottom-10 -right-10 w-[420px] h-72 text-[#ECEFFD] dark:text-indigo-950/20 opacity-90"
          viewBox="0 0 300 180"
          fill="currentColor"
        >
          <path d="M60 140H260C282 140 300 122 300 100C300 80 284 64 264 62C258 40 238 24 214 24C194 24 176 35 168 52C160 48 150 45 140 45C114 45 92 66 92 92C92 96 93 100 94 104C84 107 76 116 76 128C76 135 80 140 85 140Z" />
        </svg>

        {/* Ambient bottom-left cloud shape */}
        <svg
          className="absolute -bottom-12 -left-6 w-72 h-48 text-[#ECEFFD] dark:text-indigo-950/20 opacity-90"
          viewBox="0 0 300 180"
          fill="currentColor"
        >
          <path d="M40 130H240C260 130 276 114 276 94C276 76 261 61 243 59C237 39 219 24 197 24C179 24 162 34 155 50C148 46 139 43 130 43C106 43 86 62 86 86C86 90 87 94 88 98C79 101 72 109 72 120C72 126 76 130 80 130Z" />
        </svg>
      </div>

      {/* Main Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative z-10 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 space-y-6"
      >
        {/* Empty State: Center Illustration */}
        {messages.length === 0 ? (
          <div className="mx-auto flex h-full min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
            <CenterIllustration />
          </div>
        ) : (
          /* Active Chat Messages */
          <div className="mx-auto w-full max-w-[1400px] space-y-6">
            {messages.map((message, index) => {
              const isUser = message.role === 'user'
              const text = getMessageText(message)
              const isLastAssistant = !isUser && index === messages.length - 1
              const timeString = formatTime()

              if (isUser) {
                return (
                  <div key={message.id || index} className="flex flex-col items-end">
                    <div className="flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%] justify-end">
                      <div className="rounded-[20px] bg-[#CDD6FD] dark:bg-[#3730A3] px-6 py-3.5 text-[#2B3590] dark:text-white">
                        <div className="text-sm sm:text-base lg:text-[18px] font-medium leading-relaxed break-words whitespace-pre-wrap">
                          {text}
                        </div>
                      </div>

                      {/* User Avatar Circle */}
                      <div className="flex h-11 w-11 lg:h-[50px] lg:w-[50px] shrink-0 items-center justify-center rounded-full bg-[#E3E7FD] dark:bg-indigo-950/40 text-[#6F7DF0]">
                        <User className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.7]" />
                      </div>
                    </div>

                    <span className="text-xs lg:text-sm text-[#9AA0B8] mt-1.5 mr-3 lg:mr-[52px] font-medium">
                      {timeString}
                    </span>
                  </div>
                )
              }

              // AI Message
              return (
                <div key={message.id || index} className="flex flex-col items-start group">
                  <div className="flex items-start gap-3 max-w-[92%] sm:max-w-[85%] lg:max-w-[78%]">
                    {/* Cloud Avatar on Left */}
                    <div className="shrink-0 mt-0.5">
                      <CloudMascot variant="avatar" size={60} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Clean AI Bubble matching screenshot */}
                      <div className="relative rounded-[28px] border border-[#E3E8FB] dark:border-[#2D3748] bg-[#F1F3FE] dark:bg-[#1A213B] px-6 lg:px-8 py-5 text-[#2B3590] dark:text-[#F8FAFC] shadow-sm">
                        <div className="text-sm sm:text-base lg:text-[18px] font-medium leading-relaxed break-words">
                          {renderFormattedText(text)}
                        </div>
                      </div>

                      {/* Timestamp and subtle hover controls */}
                      <div className="flex items-center gap-2 mt-1.5 ml-1 px-1">
                        <span className="text-xs lg:text-sm text-[#9AA0B8] font-medium">
                          {timeString}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCopy(text, message.id || String(index))}
                          className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 text-[10px] text-[#8E95AF] hover:text-[#7886FA]"
                          title="Salin balasan"
                        >
                          {copiedId === (message.id || String(index)) ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-emerald-500">Disalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>

                        {isLastAssistant && !isLoading && (
                          <button
                            type="button"
                            onClick={onRetry}
                            className="opacity-0 group-hover:opacity-100 transition inline-flex items-center gap-1 text-[10px] text-[#8E95AF] hover:text-[#7886FA]"
                            title="Respon ulang"
                          >
                            <RotateCcw className="h-3 w-3" />
                            <span>Respon ulang</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* AI Streaming Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <CloudMascot variant="avatar" size={60} />
                <div className="rounded-3xl rounded-tl-md border border-[#E5EBFD] dark:border-[#2D3748] bg-[#F1F3FE] dark:bg-[#1A213B] px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-[#5E6585] dark:text-[#94A3B8]">
                    <span>TemanRuang sedang mendengarkan...</span>
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7886FA] typing-dot-1" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7886FA] typing-dot-2" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7886FA] typing-dot-3" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* If there are 1 to 4 messages, render the CenterIllustration below them matching screenshot */}
            {messages.length > 0 && messages.length <= 4 && !isLoading && (
              <div className="pt-4 pb-2">
                <CenterIllustration />
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/70 dark:bg-rose-950/20 p-4 text-xs text-rose-800 dark:text-rose-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                  <div className="flex-1 space-y-1.5">
                    <h4 className="font-bold text-rose-900 dark:text-rose-100">
                      Tidak Dapat Terhubung dengan AI
                    </h4>
                    <p className="leading-relaxed">{error.message}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {isApiKeyError && (
                        <button
                          type="button"
                          onClick={onOpenApiKey}
                          className="inline-flex items-center gap-1 rounded-xl bg-[#7886FA] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#6675F5] transition"
                        >
                          <KeyRound className="h-3.5 w-3.5" />
                          Petunjuk API Key
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={onRetry}
                        className="inline-flex items-center gap-1 rounded-xl border border-rose-300 dark:border-rose-800 bg-white dark:bg-rose-900/30 px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Coba Lagi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          aria-label="Gulir ke bawah"
          className="absolute bottom-24 right-8 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#7886FA] shadow-lg border border-[#ECE8F6] dark:border-slate-700 hover:bg-[#EEF2FF] transition"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
