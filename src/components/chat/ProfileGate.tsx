import { useState, type FormEvent } from 'react'
import { ArrowRight, ShieldCheck, UserRound } from 'lucide-react'
import type { MuceProfileInput } from '../../services/muceChatService'

interface ProfileGateProps {
  intro: string
  error: string
  isSubmitting: boolean
  onSubmit: (profile: MuceProfileInput) => void
}

export function ProfileGate({ intro, error, isSubmitting, onSubmit }: ProfileGateProps) {
  const [role, setRole] = useState<MuceProfileInput['role']>('Sinh viên')
  const [fullName, setFullName] = useState('')
  const [contact, setContact] = useState('')

  const submitProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!fullName.trim() || !contact.trim()) return
    onSubmit({ role, fullName: fullName.trim(), contact: contact.trim() })
  }

  return (
    <section className="profile-gate">
      <div className="profile-gate-heading">
        <span className="profile-icon"><UserRound size={22} /></span>
        <span><small>Bắt đầu cùng Mai Anh</small><h1>Xác nhận thông tin của bạn</h1></span>
      </div>
      <p className="profile-intro">{intro}</p>
      <form onSubmit={submitProfile}>
        <label>
          <span>Vai trò</span>
          <select value={role} onChange={(event) => setRole(event.target.value as MuceProfileInput['role'])} disabled={isSubmitting}>
            <option value="Sinh viên">Sinh viên</option>
            <option value="Phụ huynh">Phụ huynh</option>
            <option value="Giảng viên">Giảng viên</option>
          </select>
        </label>
        <label>
          <span>Họ và tên</span>
          <input type="text" maxLength={120} value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Nguyễn Văn An" autoComplete="name" required disabled={isSubmitting} />
        </label>
        <label>
          <span>Email hoặc số điện thoại</span>
          <input type="text" maxLength={150} value={contact} onChange={(event) => setContact(event.target.value)} placeholder="email@example.com" autoComplete="email" required disabled={isSubmitting} />
        </label>
        {error && <p className="profile-error" role="alert">{error}</p>}
        <button type="submit" disabled={isSubmitting || !fullName.trim() || !contact.trim()}>
          {isSubmitting ? 'Đang xác nhận...' : 'Bắt đầu trò chuyện'}
          {!isSubmitting && <ArrowRight size={18} />}
        </button>
      </form>
      <p className="privacy-note"><ShieldCheck size={14} /> Thông tin được gửi trực tiếp tới hệ thống MUCE để hỗ trợ tư vấn.</p>
    </section>
  )
}
