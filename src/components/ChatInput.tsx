import { useRef, useEffect, type KeyboardEvent, type ChangeEvent } from 'react'
import { Send, Square, Sparkles, Paperclip, CornerDownLeft } from 'lucide-react'

interface ChatInputProps {
  input: string
  onChange: (value: string) => void
  onSubmit: () => void
  onStop?: () => void
  isLoading: boolean
  placeholder?: string
  disabled?: boolean
}

export default function ChatInput({
  input,
  onChange,
  onSubmit,
  onStop,
  isLoading,
  placeholder = 'Tulis apa yang kamu rasakan di sini...',
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const newHeight = Math.min(el.scrollHeight, 120)
    el.style.height = `${newHeight}px`
  }, [input])

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && input.trim()) {
        onSubmit()
      }
    }
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value)
  }

  const canSend = !!input.trim() && !disabled

  return (
    <div className="relative w-full border-t border-[#E9E8F4] dark:border-[#1E2540] bg-white/40 dark:bg-transparent lg:rounded-tr-[56px] px-4 sm:px-8 lg:px-[30px] pt-4 pb-4 lg:pt-5 lg:pb-6 select-none">
      {/* Composer card */}
      <div className="relative rounded-[28px] border border-[#CDD3F7] dark:border-[#2D3748] bg-[#FEFDFB] dark:bg-[#151A2E] px-4 sm:px-5 pt-3 pb-3 lg:pt-4 shadow-[0_8px_28px_-14px_rgba(120,134,250,0.35)] transition focus-within:border-[#7886FA] focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-950">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-full text-[#7C8CF8] bg-[#EEF0FE] dark:bg-indigo-950/40">
            <Sparkles className="h-5 w-5" />
          </div>

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={4000}
            className="flex-1 max-h-32 resize-none bg-transparent px-1 py-2 text-sm sm:text-base lg:text-[17px] text-[#2B3590] dark:text-[#F8FAFC] placeholder-[#8E95AF] focus:outline-none leading-relaxed"
          />

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center text-[#7C8CF8] transition rounded-full bg-[#EEF0FE] hover:bg-[#E3E7FD] dark:bg-slate-800"
              title="Lampirkan perasaan atau catatan"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {isLoading ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Hentikan pembuatan balasan"
                className="flex h-11 w-11 lg:h-[52px] lg:w-[52px] items-center justify-center rounded-full bg-rose-500 text-white shadow-md hover:bg-rose-600 transition"
                title="Hentikan respons AI"
              >
                <Square className="h-4 w-4 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onSubmit}
                disabled={!canSend}
                aria-label="Kirim pesan curhat"
                className={`flex h-11 w-11 lg:h-[52px] lg:w-[52px] items-center justify-center rounded-full transition ${
                  canSend
                    ? 'bg-gradient-to-br from-[#7886F9] to-[#8E9DFB] text-white shadow-[0_8px_18px_-6px_rgba(120,134,250,0.7)] hover:brightness-105 active:scale-95'
                    : 'bg-gradient-to-br from-[#7886F9] to-[#8E9DFB] text-white opacity-90 cursor-default'
                }`}
                title="Kirim pesan (Enter)"
              >
                <Send className="h-5 w-5 stroke-[1.8]" />
              </button>
            )}
          </div>
        </div>

        {/* Keyboard hint pills inside the card */}
        <div className="hidden sm:flex items-center gap-3 pt-3 pl-1 text-xs text-[#6B7399]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-slate-800/80 border border-[#E4E8F7] dark:border-slate-700 px-3.5 py-1">
            <CornerDownLeft className="h-3.5 w-3.5 text-[#7C8CF8]" />
            <span>Tekan <strong className="font-semibold text-[#2B3590]">Enter</strong> untuk kirim</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-slate-800/80 border border-[#E4E8F7] dark:border-slate-700 px-3.5 py-1">
            <CornerDownLeft className="h-3.5 w-3.5 text-[#7C8CF8]" />
            <span><strong className="font-semibold text-[#2B3590]">Shift + Enter</strong> untuk baris baru</span>
          </div>
        </div>
      </div>
    </div>
  )
}
