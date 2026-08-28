import { GraduationCap } from 'lucide-react'

export function Brand() {
  return (
    <div className="brand" aria-label="UniGuide">
      <span className="brand-mark"><GraduationCap size={22} strokeWidth={2.2} /></span>
      <span><strong>UniGuide</strong><small>Tuyển sinh thông minh</small></span>
    </div>
  )
}
