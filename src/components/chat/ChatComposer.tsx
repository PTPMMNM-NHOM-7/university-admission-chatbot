import { useRef, useState } from 'react'
import { ArrowUp, Paperclip } from 'lucide-react'

interface ChatComposerProps { onSend: (message: string) => void; disabled?: boolean }

export function ChatComposer({ onSend, disabled = false }: ChatComposerProps) {
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const submitMessage = () => {
    if (!message.trim() || disabled) return
    onSend(message)
    setMessage('')
  }

  return (
    <div className="composer-wrap">
      <div className="composer">
        <button className="icon-button attachment-button" type="button" title="Đính kèm tệp" onClick={() => fileInputRef.current?.click()}><Paperclip size={20} /></button>
        <input ref={fileInputRef} type="file" hidden />
        <textarea
          rows={1}
          value={message}
          disabled={disabled}
          placeholder="Nhập câu hỏi về tuyển sinh..."
          aria-label="Câu hỏi tuyển sinh"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submitMessage() }
          }}
        />
        <button className="send-button" type="button" title="Gửi câu hỏi" disabled={!message.trim() || disabled} onClick={submitMessage}><ArrowUp size={20} /></button>
      </div>
      <p className="composer-note">Phản hồi được cung cấp bởi trợ lý MUCE. Hãy kiểm tra lại các thông tin tuyển sinh quan trọng.</p>
    </div>
  )
}
