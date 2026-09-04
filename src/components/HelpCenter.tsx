import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronDown, CircleHelp, KeyRound, LifeBuoy, Search, ShieldCheck, UserRound } from 'lucide-react'

type HelpCategory = 'Tất cả' | 'Bắt đầu' | 'Tài khoản & đăng nhập' | 'Tuyển sinh' | 'Trợ lý MUCE'

interface HelpArticle {
  id: number
  category: Exclude<HelpCategory, 'Tất cả'>
  question: string
  answer: string
}

const categories: HelpCategory[] = ['Tất cả', 'Bắt đầu', 'Tài khoản & đăng nhập', 'Tuyển sinh', 'Trợ lý MUCE']

const articles: HelpArticle[] = [
  {
    id: 1,
    category: 'Bắt đầu',
    question: 'Làm thế nào để bắt đầu hỏi về tuyển sinh?',
    answer: 'Chọn Cuộc trò chuyện mới ở thanh bên, sau đó nhập câu hỏi vào ô chat. Mai Anh sẽ hướng dẫn bạn theo từng bước dựa trên thông tin bạn cung cấp.',
  },
  {
    id: 2,
    category: 'Tài khoản & đăng nhập',
    question: 'Tôi đăng nhập vào UniGuide bằng cách nào?',
    answer: 'Nhấn Đăng nhập ở góc phải màn hình, chọn Đăng nhập và nhập email cùng mật khẩu đã đăng ký. Bạn có thể bật Ghi nhớ đăng nhập trên thiết bị cá nhân.',
  },
  {
    id: 3,
    category: 'Tài khoản & đăng nhập',
    question: 'Tôi quên mật khẩu thì phải làm sao?',
    answer: 'Trong cửa sổ Đăng nhập, chọn Quên mật khẩu và nhập email tài khoản. Kiểm tra hộp thư đến hoặc thư rác để mở liên kết đặt lại mật khẩu.',
  },
  {
    id: 4,
    category: 'Tài khoản & đăng nhập',
    question: 'Tôi có cần tài khoản để sử dụng trợ lý không?',
    answer: 'Bạn có thể xem thông tin cơ bản mà không cần đăng nhập. Đăng nhập giúp lưu lại cuộc trò chuyện và thuận tiện quay lại các tư vấn trước đó.',
  },
  {
    id: 5,
    category: 'Tuyển sinh',
    question: 'Thông tin tư vấn tuyển sinh được cập nhật khi nào?',
    answer: 'Thông tin được tổng hợp từ dữ liệu tuyển sinh của MUCE. Với các mốc thời gian và yêu cầu quan trọng, hãy kiểm tra thêm thông báo chính thức của nhà trường.',
  },
  {
    id: 6,
    category: 'Tuyển sinh',
    question: 'Tôi nên cung cấp những thông tin gì cho Mai Anh?',
    answer: 'Hãy chuẩn bị ngành học quan tâm, phương thức xét tuyển, điểm số hoặc khu vực ưu tiên nếu có. Càng đầy đủ, câu trả lời càng sát với trường hợp của bạn.',
  },
  {
    id: 7,
    category: 'Trợ lý MUCE',
    question: 'Tôi có thể hỏi Mai Anh những nội dung nào?',
    answer: 'Bạn có thể hỏi về ngành học, phương thức xét tuyển, hồ sơ, học phí, mốc thời gian và các bước đăng ký nhập học tại MUCE.',
  },
]

export function HelpCenter({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<HelpCategory>('Tất cả')
  const [openArticle, setOpenArticle] = useState<number | null>(2)

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return articles.filter((article) => {
      const matchesCategory = activeCategory === 'Tất cả' || article.category === activeCategory
      const matchesQuery = !normalizedQuery || `${article.question} ${article.answer} ${article.category}`.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <div className="help-center">
      <div className="help-hero">
        <button className="help-back-button" type="button" onClick={onBack}><ArrowLeft size={17} /> Quay lại trò chuyện</button>
        <div className="help-hero-content">
          <span className="help-kicker"><LifeBuoy size={15} /> UniGuide Help Center</span>
          <h1>Bạn cần hỗ trợ điều gì?</h1>
          <p>Tìm nhanh câu trả lời về tài khoản, đăng nhập và tuyển sinh MUCE.</p>
          <label className="help-search">
            <Search size={19} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm câu hỏi hoặc từ khóa..." aria-label="Tìm kiếm câu hỏi" />
          </label>
        </div>
      </div>

      <div className="help-content">
        <section className="help-login-guide" aria-labelledby="login-guide-title">
          <div className="help-guide-heading">
            <span className="help-guide-icon"><KeyRound size={20} /></span>
            <div><span className="help-label">Hướng dẫn nhanh</span><h2 id="login-guide-title">Tài khoản & đăng nhập</h2></div>
          </div>
          <div className="help-guide-steps">
            <div><span>01</span><strong>Mở Đăng nhập</strong><p>Nhấn nút ở góc phải để mở cửa sổ tài khoản.</p></div>
            <div><span>02</span><strong>Nhập thông tin</strong><p>Dùng email và mật khẩu đã đăng ký với UniGuide.</p></div>
            <div><span>03</span><strong>Khôi phục khi cần</strong><p>Chọn Quên mật khẩu nếu bạn không thể truy cập.</p></div>
          </div>
        </section>

        <div className="help-section-heading">
          <div><span className="help-label">Giải đáp</span><h2>Câu hỏi thường gặp</h2></div>
          <span>{filteredArticles.length} câu hỏi</span>
        </div>
        <div className="help-categories" role="tablist" aria-label="Danh mục câu hỏi">
          {categories.map((category) => (
            <button key={category} className={activeCategory === category ? 'is-active' : ''} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>
          ))}
        </div>

        <div className="help-articles">
          {filteredArticles.length > 0 ? filteredArticles.map((article) => {
            const isOpen = openArticle === article.id
            return (
              <article className={`help-article ${isOpen ? 'is-open' : ''}`} key={article.id}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenArticle(isOpen ? null : article.id)}>
                  <span><CircleHelp size={17} /><span><small>{article.category}</small>{article.question}</span></span>
                  <ChevronDown size={18} />
                </button>
                {isOpen && <p>{article.answer}</p>}
              </article>
            )
          }) : <div className="help-empty"><UserRound size={22} /><strong>Chưa tìm thấy câu hỏi phù hợp</strong><span>Thử một từ khóa khác hoặc chọn Tất cả.</span></div>}
        </div>
        <p className="help-contact"><ShieldCheck size={15} /> Không tìm thấy điều bạn cần? Hãy hỏi trực tiếp Mai Anh trong cuộc trò chuyện.</p>
      </div>
    </div>
  )
}
