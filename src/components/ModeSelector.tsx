import { Heart, Lightbulb, Sprout, Check, Info, Sparkle } from 'lucide-react'
import { CONVERSATION_MODES, type ConversationMode } from '../server/ai-personality'

interface ModeSelectorProps {
  currentMode: ConversationMode
  onSelectMode: (mode: ConversationMode) => void
  onOpenInfo?: () => void
}

export default function ModeSelector({
  currentMode,
  onSelectMode,
  onOpenInfo,
}: ModeSelectorProps) {
  const modes: ConversationMode[] = ['listen', 'advice', 'solution']

  function renderModeIcon(mode: ConversationMode) {
    switch (mode) {
      case 'listen':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#7F8CF8] text-white">
            <Heart className="h-4 w-4 fill-transparent stroke-white stroke-[1.8]" />
          </div>
        )
      case 'advice':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#CFE6FC] text-[#4C8FE6]">
            <Lightbulb className="h-4 w-4 stroke-[1.8]" />
          </div>
        )
      case 'solution':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#D3F2DF] text-[#3BAA6B]">
            <Sprout className="h-4 w-4 stroke-[1.8]" />
          </div>
        )
    }
  }

  function getModeDescription(mode: ConversationMode) {
    switch (mode) {
      case 'listen':
        return 'Fokus mendengarkan dan memvalidasi perasaan tanpa memberikan nasihat yang...'
      case 'advice':
        return 'Memberikan situasi terlebih dahulu, lalu menawarkan perspektif dan saran praktis...'
      case 'solution':
        return 'Mengurai masalah, merancang langkah-langkah, dan realistis untuk solusi bersama.'
    }
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5">
          <Sparkle className="h-3.5 w-3.5 text-[#7C8CF8] stroke-[1.8]" />
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#4A57B0] dark:text-[#94A3B8]">
            Gaya Respon AI
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenInfo}
          className="text-[#7C8CF8] dark:text-[#64748B] hover:text-[#5E6EF0] transition p-0.5"
          title="Tentang Gaya Respon AI"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-2">
        {modes.map((mode) => {
          const info = CONVERSATION_MODES[mode]
          const isSelected = currentMode === mode

          return (
            <button
              key={mode}
              type="button"
              onClick={() => onSelectMode(mode)}
              className={`w-full text-left px-2.5 py-2 rounded-xl transition border ${
                isSelected
                  ? 'border-[#B4BFFA] bg-[#EEF1FF] dark:bg-indigo-950/40 shadow-[0_4px_12px_-6px_rgba(120,134,250,0.35)]'
                  : 'border-[#E4E8F7] dark:border-[#1E2540] bg-white dark:bg-[#1A2038] hover:bg-[#FBFBFF] dark:hover:bg-[#1E2642] text-[#5E6585] dark:text-[#94A3B8]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {renderModeIcon(mode)}

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold ${
                        isSelected
                          ? 'text-[#2B3590] dark:text-white'
                          : 'text-[#2B3590] dark:text-[#F8FAFC]'
                      }`}
                    >
                      {info.label}
                    </span>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-[#4A5BE0] stroke-[2.8]" />
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#6B7399] dark:text-[#94A3B8] line-clamp-2 leading-[1.4]">
                    {getModeDescription(mode)}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
