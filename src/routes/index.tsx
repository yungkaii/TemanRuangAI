import { createFileRoute } from '@tanstack/react-router'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { useState, useRef, useEffect, useMemo } from 'react'
import Sidebar, { type SessionItem } from '../components/Sidebar'
import ChatArea from '../components/ChatArea'
import ChatInput from '../components/ChatInput'
import PrivacyModal from '../components/PrivacyModal'
import ClearChatDialog from '../components/ClearChatDialog'
import ApiKeyModal from '../components/ApiKeyModal'
import SettingsModal from '../components/SettingsModal'
import type { ConversationMode } from '../server/ai-personality'

export const Route = createFileRoute('/')({
  component: TemanRuangApp,
})

interface FullSession {
  id: string
  title: string
  createdAt: number
  mode: ConversationMode
  messages: UIMessage[]
}

const STORAGE_KEY_SESSIONS = 'temanruang_ai_sessions_v1'
const STORAGE_KEY_ACTIVE_ID = 'temanruang_ai_active_session_id_v1'

function createNewSessionId(): string {
  return 'tr-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6)
}

function loadStoredSessions(): FullSession[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_SESSIONS)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((s) => ({
      ...s,
      messages: Array.isArray(s.messages)
        ? s.messages.map((m: any, idx: number) => {
            const explicit = m.createdAt || m.metadata?.createdAt
            const createdAt =
              explicit && typeof explicit === 'number'
                ? explicit
                : s.createdAt
                ? s.createdAt + idx * 30000
                : Date.now()
            return {
              ...m,
              createdAt,
              metadata: {
                ...(m.metadata || {}),
                createdAt,
              },
            }
          })
        : [],
    }))
  } catch (e) {
    console.error('Failed to load sessions from localStorage', e)
    return []
  }
}

function saveStoredSessions(sessions: FullSession[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions))
  } catch (e) {
    console.error('Failed to save sessions to localStorage', e)
  }
}

function loadStoredActiveId(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(STORAGE_KEY_ACTIVE_ID)
  } catch {
    return null
  }
}

function saveStoredActiveId(id: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY_ACTIVE_ID, id)
  } catch {}
}

function TemanRuangApp() {
  const [currentMode, setCurrentMode] = useState<ConversationMode>('listen')
  const currentModeRef = useRef<ConversationMode>('listen')
  currentModeRef.current = currentMode
  const isSwitchingSessionRef = useRef(false)

  const [input, setInput] = useState('')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)
  const [clearDialogIsNewChat, setClearDialogIsNewChat] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Sessions list and active session ID
  const [activeSessionId, setActiveSessionId] = useState<string>(() => createNewSessionId())
  const [sessionList, setSessionList] = useState<FullSession[]>([])

  // Setup AI SDK Chat transport
  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: '/api/chat',
      body: () => ({
        mode: currentModeRef.current,
      }),
      fetch: async (url, init) => {
        const res = await fetch(url, init)
        if (!res.ok) {
          let errorMessage = 'Gagal terhubung dengan TemanRuang AI.'
          try {
            const data = await res.json()
            if (data.message) {
              errorMessage = data.message
            }
          } catch {
            errorMessage = `Permintaan gagal dengan status ${res.status}.`
          }
          throw new Error(errorMessage)
        }
        return res
      },
    })
  }, [])

  const {
    messages,
    sendMessage,
    stop,
    regenerate,
    setMessages,
    status,
    error,
    clearError,
  } = useChat({
    transport,
    onError: (err) => {
      console.error('[TemanRuang AI] Chat error:', err)
    },
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  // Hydrate sessions and active messages from localStorage on first client render
  useEffect(() => {
    const stored = loadStoredSessions()
    const storedActiveId = loadStoredActiveId()

    if (stored.length > 0) {
      setSessionList(stored)
      const targetSession = stored.find((s) => s.id === storedActiveId) || stored[0]
      setActiveSessionId(targetSession.id)
      setCurrentMode(targetSession.mode || 'listen')
      if (targetSession.messages && targetSession.messages.length > 0) {
        setMessages(targetSession.messages)
      }
    }
    setIsHydrated(true)
  }, [])

  // Sync active session whenever messages or mode changes
  useEffect(() => {
    if (!isHydrated) return
    if (isSwitchingSessionRef.current) {
      isSwitchingSessionRef.current = false
      return
    }
    if (messages.length === 0) return

    setSessionList((prev) => {
      const existingIdx = prev.findIndex((s) => s.id === activeSessionId)

      // Derive title from first user message
      const firstUserMsg = messages.find((m) => m.role === 'user')
      let title = 'Curhat Baru'
      if (firstUserMsg) {
        const text =
          Array.isArray(firstUserMsg.parts)
            ? firstUserMsg.parts.map((p: any) => (p.type === 'text' ? p.text : '')).join('')
            : (firstUserMsg as any).text || ''
        if (text) {
          const cleanText = text.replace(/[*_#`~]/g, '').trim()
          title = (cleanText || text).slice(0, 32) + (text.length > 32 ? '...' : '')
        }
      }

      const existingSession = existingIdx !== -1 ? prev[existingIdx] : null

      // Ensure every message in the session has a stable, saved createdAt timestamp
      const timestampedMessages = messages.map((m) => {
        const explicit =
          (m as any).createdAt || (m.metadata as any)?.createdAt
        if (explicit && typeof explicit === 'number') {
          return {
            ...m,
            createdAt: explicit,
            metadata: { ...((m.metadata as any) || {}), createdAt: explicit },
          }
        }
        const prevMsg = existingSession?.messages.find((pm) => pm.id === m.id)
        const prevTime =
          (prevMsg as any)?.createdAt || (prevMsg?.metadata as any)?.createdAt
        const createdAt =
          prevTime && typeof prevTime === 'number' ? prevTime : Date.now()
        return {
          ...m,
          createdAt,
          metadata: { ...((m.metadata as any) || {}), createdAt },
        }
      })

      let nextList: FullSession[]
      if (existingIdx !== -1) {
        nextList = [...prev]
        nextList[existingIdx] = {
          ...nextList[existingIdx],
          title,
          mode: currentMode,
          messages: timestampedMessages,
        }
      } else {
        nextList = [
          {
            id: activeSessionId,
            title,
            createdAt: Date.now(),
            mode: currentMode,
            messages: timestampedMessages,
          },
          ...prev,
        ]
      }

      saveStoredSessions(nextList)
      return nextList
    })
  }, [messages, activeSessionId, currentMode, isHydrated])

  // Map to lightweight SessionItem for sidebar display with preview snippet
  const sidebarSessions: SessionItem[] = useMemo(() => {
    return sessionList.map((s) => {
      let previewText = 'Percakapan curhat...'
      const firstAi = s.messages.find((m) => m.role === 'assistant')
      const lastMsg = s.messages[s.messages.length - 1]
      const sourceMsg = firstAi || lastMsg
      if (sourceMsg) {
        const text =
          Array.isArray(sourceMsg.parts)
            ? sourceMsg.parts.map((p: any) => (p.type === 'text' ? p.text : '')).join('')
            : (sourceMsg as any).text || ''
        if (text) {
          const cleanText = text.replace(/[*_#`~]/g, '').trim()
          previewText = (cleanText || text).slice(0, 32) + (text.length > 32 ? '...' : '')
        }
      }
      return {
        id: s.id,
        title: s.title,
        previewText,
        createdAt: s.createdAt,
        mode: s.mode,
        messageCount: s.messages.length,
      }
    })
  }, [sessionList])

  // Clear all sessions completely
  function handleClearAllSessions() {
    setSessionList([])
    saveStoredSessions([])
    const newId = createNewSessionId()
    setActiveSessionId(newId)
    saveStoredActiveId(newId)
    setMessages([])
    clearError()
    setInput('')
  }

  // Handle switching active conversation
  function handleSelectSession(id: string) {
    if (id === activeSessionId) return

    const target = sessionList.find((s) => s.id === id)
    if (target) {
      isSwitchingSessionRef.current = true
      setActiveSessionId(target.id)
      saveStoredActiveId(target.id)
      setCurrentMode(target.mode || 'listen')
      setMessages(target.messages || [])
      clearError()
      setInput('')
    }
  }

  // Handle starting a fresh conversation
  function handleNewSession(force = false) {
    if (!force && messages.length > 0) {
      setClearDialogIsNewChat(true)
      setIsClearDialogOpen(true)
      return
    }

    const newId = createNewSessionId()
    setActiveSessionId(newId)
    saveStoredActiveId(newId)
    setMessages([])
    clearError()
    setInput('')
  }

  // Handle deleting a session from history
  function handleDeleteSession(id: string) {
    if (isLoading && id === activeSessionId) {
      stop()
    }

    const updated = sessionList.filter((s) => s.id !== id)
    setSessionList(updated)
    saveStoredSessions(updated)

    if (id === activeSessionId) {
      isSwitchingSessionRef.current = true
      if (updated.length > 0) {
        const next = updated[0]
        setActiveSessionId(next.id)
        saveStoredActiveId(next.id)
        setCurrentMode(next.mode || 'listen')
        setMessages(next.messages || [])
      } else {
        const newId = createNewSessionId()
        setActiveSessionId(newId)
        saveStoredActiveId(newId)
        setMessages([])
      }
      clearError()
      setInput('')
    }
  }

  // Handle clearing current chat
  function handleConfirmClear() {
    if (clearDialogIsNewChat) {
      handleNewSession(true)
      setClearDialogIsNewChat(false)
    } else {
      setMessages([])
      clearError()
      setSessionList((prev) => {
        const updated = prev.map((s) =>
          s.id === activeSessionId ? { ...s, messages: [] } : s
        )
        saveStoredSessions(updated)
        return updated
      })
    }
  }

  // Handle sending a message
  async function handleSendMessage(textToSend?: string) {
    const text = (textToSend !== undefined ? textToSend : input).trim()
    if (!text || isLoading) return

    clearError()
    setInput('')

    try {
      await sendMessage(
        { text, metadata: { createdAt: Date.now() } },
        { body: { mode: currentMode } }
      )
    } catch (err) {
      console.error('[TemanRuang AI] Send error:', err)
    }
  }

  // Handle clicking a conversation starter
  function handleSelectStarter(starterText: string) {
    handleSendMessage(starterText)
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-[var(--bg-canvas)]">
      {/* Responsive Sidebar & Mobile Drawer */}
      <Sidebar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          setCurrentMode(mode)
          // Also persist mode in active session
          setSessionList((prev) => {
            const updated = prev.map((s) =>
              s.id === activeSessionId ? { ...s, mode } : s
            )
            saveStoredSessions(updated)
            return updated
          })
        }}
        sessions={sidebarSessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={() => handleNewSession(false)}
        onDeleteSession={handleDeleteSession}
        onClearAllSessions={handleClearAllSessions}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileDrawerOpen}
        onCloseMobile={() => setIsMobileDrawerOpen(false)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Chat Content Area */}
      <main className="flex flex-1 flex-col h-full min-w-0 overflow-hidden relative">
        <ChatArea
          messages={messages}
          isLoading={isLoading}
          error={error}
          currentMode={currentMode}
          onSelectStarter={handleSelectStarter}
          onRetry={() => {
            clearError()
            regenerate()
          }}
          onOpenClearDialog={() => {
            setClearDialogIsNewChat(false)
            setIsClearDialogOpen(true)
          }}
          onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
          onOpenApiKey={() => setIsApiKeyOpen(true)}
        />

        {/* Bottom Chat Composer */}
        <ChatInput
          input={input}
          onChange={setInput}
          onSubmit={() => handleSendMessage()}
          onStop={stop}
          isLoading={isLoading}
        />
      </main>

      {/* Modals & Dialogs */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
      />

      <ClearChatDialog
        isOpen={isClearDialogOpen}
        onClose={() => setIsClearDialogOpen(false)}
        onConfirm={handleConfirmClear}
        isNewChat={clearDialogIsNewChat}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onClearAllSessions={handleClearAllSessions}
      />
    </div>
  )
}
