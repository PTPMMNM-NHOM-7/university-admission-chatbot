import { MessageCircleQuestion } from 'lucide-react'

export function Brand() {
  return (
    <div className="brand" aria-label="MUCE Guide">
      <span className="brand-mark"><MessageCircleQuestion size={22} strokeWidth={2.2} /></span>
      <span><strong>MUCE Guide</strong><small>Trợ lý tuyển sinh</small></span>
    </div>
  )
}
