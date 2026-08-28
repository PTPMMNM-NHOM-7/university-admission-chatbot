import { Bot, Sparkles, UserRound } from 'lucide-react'
import type { ChatMessage } from '../../types/chat'

interface ConversationProps {
  messages: ChatMessage[]
  isReplying: boolean
  onSelectPrompt: (prompt: string) => void
}

export function Conversation({ messages, isReplying, onSelectPrompt }: ConversationProps) {
  return (
    <section className="conversation" aria-label="Nội dung cuộc trò chuyện">
      <div className="conversation-intro"><span><Sparkles size={15} /> Tư vấn cùng Mai Anh</span><h1>Cùng tìm lựa chọn phù hợp với bạn</h1></div>
      <div className="message-list">
        {messages.map((message) => (
          <article className={`message ${message.role}`} key={message.id}>
            <div className="message-avatar">{message.role === 'assistant' ? <Bot size={18} /> : <UserRound size={18} />}</div>
            <div>
              <strong>{message.role === 'assistant' ? 'Mai Anh' : 'Bạn'}</strong>
              <p>{message.content}</p>
              {!!message.clarifyOptions?.length && (
                <div className="clarify-options">
                  {message.clarifyOptions.slice(0, 8).map((option) => (
                    <button type="button" key={option} onClick={() => onSelectPrompt(option)}>{option}</button>
                  ))}
                </div>
              )}
              <time>{message.createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</time>
            </div>
          </article>
        ))}
        {isReplying && (
          <article className="message assistant typing-message">
            <div className="message-avatar"><Bot size={18} /></div>
            <div><strong>Mai Anh</strong><div className="typing-dots" aria-label="Trợ lý đang trả lời"><i /><i /><i /></div></div>
          </article>
        )}
      </div>
    </section>
  )
}
