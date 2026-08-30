import { useEffect, useRef, useState } from 'react'
import { ChatComposer } from './components/chat/ChatComposer'
import { Conversation } from './components/chat/Conversation'
import { ProfileGate } from './components/chat/ProfileGate'
import { WelcomeView } from './components/chat/WelcomeView'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import {
  askAdmissionQuestion,
  getChatIntro,
  registerChatProfile,
  type MuceProfileInput,
} from './services/muceChatService'
import type { ChatMessage } from './types/chat'
import './styles/app.css'

type ProfileStatus = 'loading' | 'required' | 'ready'

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isReplying, setIsReplying] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>('loading')
  const [profileIntro, setProfileIntro] = useState('')
  const [profileError, setProfileError] = useState('')
  const conversationVersion = useRef(0)

  useEffect(() => {
    getChatIntro()
      .then((response) => {
        setProfileIntro(response.reply)
        setProfileStatus(response.needProfile ? 'required' : 'ready')
      })
      .catch(() => {
        setProfileIntro('Không thể kết nối với trợ lý MUCE. Vui lòng kiểm tra kết nối và thử lại.')
        setProfileStatus('required')
      })
  }, [])

  const sendMessage = async (content: string) => {
    const trimmedContent = content.trim()
    if (!trimmedContent || isReplying || profileStatus !== 'ready') return

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', content: trimmedContent, createdAt: new Date() },
    ])
    setIsReplying(true)

    const currentVersion = conversationVersion.current
    try {
      const response = await askAdmissionQuestion(trimmedContent)
      if (currentVersion !== conversationVersion.current) return

      if (response.needProfile) {
        setProfileIntro(response.reply)
        setProfileStatus('required')
        return
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.reply,
          createdAt: new Date(),
          clarifyOptions: response.clarifyOptions,
        },
      ])
    } catch {
      if (currentVersion !== conversationVersion.current) return
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Kết nối tới trợ lý MUCE đang gián đoạn. Bạn vui lòng thử lại sau hoặc liên hệ hotline 0962 244 195.',
          createdAt: new Date(),
        },
      ])
    } finally {
      if (currentVersion === conversationVersion.current) setIsReplying(false)
    }
  }

  const submitProfile = async (profile: MuceProfileInput) => {
    setProfileError('')
    setIsReplying(true)
    try {
      const response = await registerChatProfile(profile)
      if (response.needProfile) {
        setProfileError(response.reply || 'Thông tin chưa hợp lệ. Vui lòng kiểm tra lại.')
        return
      }

      setProfileStatus('ready')
      setMessages([
        { id: crypto.randomUUID(), role: 'assistant', content: response.reply, createdAt: new Date() },
      ])
    } catch {
      setProfileError('Không thể đăng ký thông tin. Vui lòng kiểm tra kết nối và thử lại.')
    } finally {
      setIsReplying(false)
    }
  }

  const startNewConversation = () => {
    conversationVersion.current += 1
    setMessages([])
    setIsReplying(false)
    setIsSidebarOpen(false)
  }

  const renderWorkspace = () => {
    if (profileStatus === 'loading') {
      return <div className="chat-loading"><i /><span>Đang kết nối với Mai Anh...</span></div>
    }

    if (profileStatus === 'required') {
      return <ProfileGate intro={profileIntro} error={profileError} isSubmitting={isReplying} onSubmit={submitProfile} />
    }

    return messages.length === 0 ? (
      <WelcomeView onSelectPrompt={sendMessage} />
    ) : (
      <Conversation messages={messages} isReplying={isReplying} onSelectPrompt={sendMessage} />
    )
  }

  return (
    <div className="app-shell">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNewConversation={startNewConversation} />
      <main className="main-panel">
        <Header onOpenMenu={() => setIsSidebarOpen(true)} />
        <div className="chat-workspace">
          <div className="chat-scroll-region" aria-live="polite">{renderWorkspace()}</div>
          {profileStatus === 'ready' && <ChatComposer onSend={sendMessage} disabled={isReplying} />}
        </div>
      </main>
    </div>
  )
}

export default App
