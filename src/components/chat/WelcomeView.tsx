import { ChartNoAxesCombined, ClipboardList, FileCheck2, GraduationCap, Search, Sparkles, WalletCards } from 'lucide-react'
import campusImage from '../../assets/campus-welcome.png'
import { quickPrompts, suggestedQuestions } from '../../data/admission'

const actionIcons = {
  majors: GraduationCap,
  score: ChartNoAxesCombined,
  benchmark: Search,
  tuition: WalletCards,
  methods: FileCheck2,
  application: ClipboardList,
}

interface WelcomeViewProps { onSelectPrompt: (prompt: string) => void }

export function WelcomeView({ onSelectPrompt }: WelcomeViewProps) {
  return (
    <section className="welcome-view">
      <div className="welcome-heading">
        <span className="eyebrow"><Sparkles size={14} /> Trợ lý AI tuyển sinh MUCE</span>
        <h1>Chào bạn, hôm nay mình có thể giúp gì?</h1>
        <p>Hỏi đáp thông tin tuyển sinh, khám phá ngành học và tìm lựa chọn phù hợp với bạn.</p>
      </div>
      <div className="campus-banner">
        <img src={campusImage} alt="Khuôn viên trường đại học hiện đại" />
        <div className="campus-caption"><span>Đồng hành cùng bạn</span><strong>Tự tin chọn đúng ngành, vững vàng bước vào đại học.</strong></div>
      </div>
      <div className="quick-section">
        <div className="section-heading"><h2>Khám phá nhanh</h2><span>Chọn một chủ đề để bắt đầu</span></div>
        <div className="quick-grid">
          {quickPrompts.map((item) => {
            const Icon = actionIcons[item.id as keyof typeof actionIcons]
            return (
              <button type="button" className={`quick-action action-${item.id}`} key={item.id} onClick={() => onSelectPrompt(item.prompt)}>
                <span className="quick-action-icon"><Icon size={20} /></span>
                <span><strong>{item.title}</strong><small>{item.description}</small></span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="suggested-row">
        <span>Gợi ý:</span>
        {suggestedQuestions.map((question) => <button type="button" key={question} onClick={() => onSelectPrompt(question)}>{question}</button>)}
      </div>
    </section>
  )
}
