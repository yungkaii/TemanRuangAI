import {
  Plus,
  MessageSquareText,
  ShieldPlus,
  Settings,
  ChevronRight,
  Clock,
  X,
  ChevronLeft,
  Heart,
  Lightbulb,
  Sprout,
} from 'lucide-react'
import CloudMascot from './CloudMascot'
import ModeSelector from './ModeSelector'
import type { ConversationMode } from '../server/ai-personality'

export interface SessionItem {
  id: string
  title: string
  previewText?: string
  createdAt: number
  mode: ConversationMode
  messageCount: number
}

interface SidebarProps {
  currentMode: ConversationMode
  onSelectMode: (mode: ConversationMode) => void
  sessions: SessionItem[]
  activeSessionId: string
  onSelectSession: (id: string) => void
  onNewSession: () => void
  onDeleteSession: (id: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onCloseMobile: () => void
  onOpenPrivacy: () => void
  onOpenSettings: () => void
}

export default function Sidebar({
  currentMode,
  onSelectMode,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  onOpenPrivacy,
  onOpenSettings,
}: SidebarProps) {
  function getModeDisplayTitle(mode: ConversationMode): string {
    switch (mode) {
      case 'listen':
        return 'Dengerin Aku'
      case 'advice':
        return 'Kasih Aku Saran'
      case 'solution':
        return 'Bantu Aku Cari Solusi'
    }
  }

  const sidebarContent = (
    <div className="flex h-full flex-col overflow-hidden bg-gradient-to-b from-[#FBFBFF] to-[#F6F7FE] dark:from-[#151A2E] dark:to-[#151A2E] text-[#2B3590] dark:text-[#F8FAFC] select-none">
      {/* Brand Header */}
      <div className={`border-b border-[#E6E9F8] dark:border-[#1E2540] ${isCollapsed ? 'px-2 py-3' : 'px-4 pt-4 pb-3 lg:px-5'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
            <CloudMascot size={isCollapsed ? 32 : 46} />
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="flex items-baseline gap-1 leading-none">
                  <span className="text-lg lg:text-[19px] font-extrabold tracking-tight text-[#2B3590] dark:text-[#F8FAFC]">
                    TemanRuang
                  </span>
                  <span className="text-lg lg:text-[19px] font-extrabold tracking-tight text-[#7C8CF8] dark:text-[#818CF8]">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7399] dark:text-[#94A3B8] mt-1 font-medium truncate">
                  Cerita aja, aku dengerin.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden rounded-lg p-1.5 text-[#9CA3AF] hover:bg-[#EEF2FF] dark:hover:bg-indigo-950/40 hover:text-[#1E2238] dark:hover:text-[#F8FAFC]"
            aria-label="Tutup menu sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mulai Curhat Baru Button */}
        <div className={isCollapsed ? 'mt-3 flex justify-center' : 'mt-3.5'}>
          <button
            type="button"
            onClick={() => {
              onNewSession()
              onCloseMobile()
            }}
            className={
              isCollapsed
                ? 'w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#7886F9] to-[#8E9DFB] text-white shadow-[0_4px_12px_-3px_rgba(120,134,250,0.5)] hover:brightness-105 active:scale-95 transition'
                : 'w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7886F9] to-[#8E9DFB] text-white h-10 px-3 font-semibold text-xs sm:text-sm shadow-[0_6px_16px_-6px_rgba(120,134,250,0.6)] hover:brightness-105 active:scale-[0.99] transition'
            }
            title="Mulai Curhat Baru"
          >
            <Plus className="h-4 w-4 stroke-[2.2]" />
            {!isCollapsed && <span>Mulai Curhat Baru</span>}
          </button>
        </div>
      </div>

      {/* Middle Scrollable Section */}
      <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-2 py-2.5 space-y-3' : 'px-4 lg:px-5 pb-3 space-y-4'}`}>
        {/* Mode Selector */}
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-1.5 pb-2 border-b border-[#E6E9F8] dark:border-[#1E2540]">
            <button
              type="button"
              onClick={() => onSelectMode('listen')}
              title="Dengerin Aku"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${
                currentMode === 'listen'
                  ? 'bg-[#EEF1FF] dark:bg-indigo-950/60 border-[#BCC6FB] text-[#7380FA] shadow-sm'
                  : 'border-transparent text-[#7886FA] hover:bg-white/80 dark:hover:bg-[#1A2038]'
              }`}
            >
              <Heart className="h-3.5 w-3.5 fill-current" />
            </button>
            <button
              type="button"
              onClick={() => onSelectMode('advice')}
              title="Kasih Aku Saran"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${
                currentMode === 'advice'
                  ? 'bg-[#E0F2FE] dark:bg-sky-950/60 border-[#BAE6FD] text-[#38BDF8] shadow-sm'
                  : 'border-transparent text-[#38BDF8] hover:bg-white/80 dark:hover:bg-[#1A2038]'
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onSelectMode('solution')}
              title="Bantu Aku Cari Solusi"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${
                currentMode === 'solution'
                  ? 'bg-[#DCFCE7] dark:bg-emerald-950/60 border-[#BBF7D0] text-[#22C55E] shadow-sm'
                  : 'border-transparent text-[#22C55E] hover:bg-white/80 dark:hover:bg-[#1A2038]'
              }`}
            >
              <Sprout className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="pt-1">
            <ModeSelector currentMode={currentMode} onSelectMode={onSelectMode} />
          </div>
        )}

        {/* Session Conversation History */}
        <div>
          {!isCollapsed && (
            <div className="flex items-center justify-between px-0.5 mb-2">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#6F7DDB] dark:text-[#94A3B8]" />
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#4A57B0] dark:text-[#94A3B8]">
                  Riwayat Sesi Ini
                </span>
              </div>
              <span className="text-[11px] text-[#8E95AF] dark:text-[#94A3B8]">
                {sessions.length} percakapan
              </span>
            </div>
          )}

          {sessions.length === 0 ? (
            !isCollapsed && (
              <div className="rounded-2xl border border-dashed border-[#DDE2F7] dark:border-[#1E2540] p-3 text-center">
                <p className="text-xs text-[#8E95AF] dark:text-[#94A3B8]">
                  Belum ada sesi aktif. Mulai curhatmu sekarang.
                </p>
              </div>
            )
          ) : (
            <div className={isCollapsed ? 'space-y-1.5 flex flex-col items-center' : 'space-y-1.5'}>
              {sessions.map((sess) => {
                const isActive = sess.id === activeSessionId
                const title = sess.title || getModeDisplayTitle(sess.mode)
                const preview = sess.previewText || 'Percakapan curhat...'

                if (isCollapsed) {
                  return (
                    <button
                      key={sess.id}
                      type="button"
                      onClick={() => {
                        onSelectSession(sess.id)
                        onCloseMobile()
                      }}
                      title={`${title}\n${preview}`}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl transition border ${
                        isActive
                          ? 'border-[#BCC6FB] dark:border-[#38437A] bg-[#EEF1FF] dark:bg-indigo-950/60 text-[#7380FA] shadow-sm'
                          : 'border-transparent hover:border-[#E2E6F8] dark:hover:border-[#2D3748] hover:bg-white dark:hover:bg-[#1A2038] text-[#6F7DF0] dark:text-[#94A3B8]'
                      }`}
                    >
                      <MessageSquareText className="h-3.5 w-3.5" />
                    </button>
                  )
                }

                return (
                  <button
                    key={sess.id}
                    type="button"
                    onClick={() => {
                      onSelectSession(sess.id)
                      onCloseMobile()
                    }}
                    className={`w-full text-left flex items-center justify-between rounded-xl px-2.5 py-2 transition border ${
                      isActive
                        ? 'border-[#BCC6FB] dark:border-[#38437A] bg-[#EEF1FF] dark:bg-indigo-950/40 shadow-[0_3px_10px_-5px_rgba(120,134,250,0.3)]'
                        : 'border-transparent hover:border-[#E2E6F8] dark:hover:border-[#2D3748] hover:bg-white dark:hover:bg-[#1A2038]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DDE2FD] dark:bg-indigo-950/60 text-[#6F7DF0] dark:text-[#818CF8]">
                        <MessageSquareText className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1 pr-1">
                        <p className="font-semibold text-xs text-[#2B3590] dark:text-[#F8FAFC] truncate leading-tight">
                          {title}
                        </p>
                        <p className="text-[11px] text-[#6B7399] dark:text-[#94A3B8] truncate mt-0.5">
                          {preview}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="h-3.5 w-3.5 text-[#7C8CF8] shrink-0" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className={`border-t border-[#E6E9F8] dark:border-[#1E2540] ${isCollapsed ? 'px-2 py-2 space-y-1.5' : 'px-4 lg:px-5 py-2.5 space-y-1'}`}>
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-1.5">
            {/* Privasi Icon */}
            <button
              type="button"
              onClick={onOpenPrivacy}
              title="Privasi Terjaga - Sesi kamu aman dan rahasia"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#6F7DF0] dark:text-[#818CF8] hover:bg-white/80 dark:hover:bg-[#1A2038] transition"
            >
              <ShieldPlus className="h-4 w-4 stroke-[1.8]" />
            </button>

            {/* Settings Icon */}
            <button
              type="button"
              onClick={onOpenSettings}
              title="Pengaturan"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#6F7DF0] dark:text-[#818CF8] hover:bg-white/80 dark:hover:bg-[#1A2038] transition"
            >
              <Settings className="h-4 w-4 stroke-[1.8]" />
            </button>

            {/* Expand Toggle Button */}
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label="Perluas sidebar"
              title="Perluas sidebar"
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#DDE2F7] dark:border-[#1E2540] bg-white dark:bg-[#151A2E] text-[#7C8CF8] hover:bg-[#EEF1FF] dark:hover:bg-indigo-950/40 shadow-sm transition"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white/70 dark:hover:bg-[#1A2038] transition text-left"
            >
              <ShieldPlus className="h-4 w-4 shrink-0 text-[#6F7DF0] dark:text-[#818CF8] stroke-[1.8]" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-xs text-[#2B3590] dark:text-[#F8FAFC] leading-tight">
                  Privasi Terjaga
                </p>
                <p className="text-[10px] text-[#6B7399] dark:text-[#94A3B8]">
                  Sesi kamu aman dan rahasia.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={onOpenSettings}
              className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-white/70 dark:hover:bg-[#1A2038] transition text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Settings className="h-4 w-4 shrink-0 text-[#6F7DF0] dark:text-[#818CF8] stroke-[1.8]" />
                <span className="font-semibold text-xs text-[#2B3590] dark:text-[#F8FAFC]">
                  Pengaturan
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-[#7C8CF8] shrink-0" />
            </button>

            {/* Collapse Button */}
            <div className="pt-0.5 flex justify-end">
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Ciutkan sidebar"
                title="Ciutkan sidebar"
                className="flex items-center justify-center h-7 w-7 rounded-lg border border-[#DDE2F7] dark:border-[#1E2540] bg-white dark:bg-[#151A2E] text-[#7C8CF8] hover:bg-[#EEF1FF] dark:hover:bg-indigo-950/40 shadow-sm transition"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`relative hidden md:flex flex-col flex-shrink-0 border-r border-[#E6E9F8] dark:border-[#1E2540] bg-[#FBFBFF] dark:bg-[#151A2E] transition-all duration-300 z-20 ${
          isCollapsed ? 'w-[68px]' : 'w-64 lg:w-[272px]'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 max-w-[85vw] bg-white dark:bg-[#151A2E] shadow-2xl transition-transform duration-300 ease-in-out border-r border-[#ECE8F6] dark:border-[#1E2540] ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  )
}
