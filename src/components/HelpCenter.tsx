import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronDown, CircleHelp, KeyRound, LifeBuoy, MessageSquareText, Search, Send, ShieldCheck, UserRound } from 'lucide-react'

type HelpCategory = 'Tất cả' | 'Bắt đầu' | 'Tài khoản & đăng nhập' | 'Sử dụng chatbot' | 'Phiên trò chuyện' | 'Dữ liệu & MUCE' | 'Tuyển sinh'

interface HelpArticle {
  id: number
  category: Exclude<HelpCategory, 'Tất cả'>
  question: string
  answer: string
}

const categories: HelpCategory[] = ['Tất cả', 'Bắt đầu', 'Tài khoản & đăng nhập', 'Sử dụng chatbot', 'Phiên trò chuyện', 'Dữ liệu & MUCE', 'Tuyển sinh']

const articles: HelpArticle[] = [
  {
    id: 1,
    category: 'Bắt đầu',
    question: 'Làm thế nào để bắt đầu hỏi về tuyển sinh?',
    answer: 'Chọn Cuộc trò chuyện mới ở thanh bên, sau đó nhập câu hỏi vào ô chat. Mai Anh sẽ hướng dẫn bạn theo từng bước dựa trên thông tin bạn cung cấp.',
  },
  {
    id: 8,
    category: 'Sử dụng chatbot',
    question: 'Tôi nên đặt câu hỏi cho Mai Anh như thế nào?',
    answer: 'Viết câu hỏi cụ thể, chẳng hạn ngành học, phương thức xét tuyển hoặc mốc thời gian bạn quan tâm. Bạn có thể gửi từng câu hỏi một và chọn gợi ý trả lời nếu Mai Anh đưa ra lựa chọn làm rõ.',
  },
  {
    id: 9,
    category: 'Phiên trò chuyện',
    question: 'Làm thế nào để bắt đầu một phiên trò chuyện mới?',
    answer: 'Nhấn Cuộc trò chuyện mới ở thanh bên. Nội dung đang hiển thị sẽ được làm mới để bạn bắt đầu chủ đề khác; mã khách truy cập vẫn được giữ để hệ thống nhận diện phiên truy cập hiện tại.',
  },
  {
    id: 10,
    category: 'Phiên trò chuyện',
    question: 'Tôi có thể quay lại phiên trò chuyện cũ không?',
    answer: 'Hiện tại thanh bên hiển thị các cuộc trò chuyện mẫu gần đây, còn nội dung phiên hiện tại chỉ được giữ trong lần mở ứng dụng này. Hãy ghi chú lại câu trả lời quan trọng trước khi tạo phiên mới hoặc tải lại trang.',
  },
  {
    id: 11,
    category: 'Dữ liệu & MUCE',
    question: 'Thông tin của tôi được gửi tới MUCE như thế nào?',
    answer: 'Khi bắt đầu tư vấn, hệ thống gửi vai trò, họ tên và email hoặc số điện thoại bạn nhập tới hệ thống MUCE để đăng ký thông tin hỗ trợ. Mỗi câu hỏi tiếp theo được gửi cùng mã khách truy cập của trình duyệt để liên kết với phiên tư vấn. Câu hỏi được truyền qua kết nối của ứng dụng tới endpoint MUCE và không được đặt trong URL.',
  },
  {
    id: 12,
    category: 'Dữ liệu & MUCE',
    question: 'Mã khách truy cập được dùng để làm gì?',
    answer: 'Mã này là một định danh kỹ thuật được tạo và lưu trong bộ nhớ trình duyệt, sau đó gửi kèm yêu cầu tới MUCE để nhận diện phiên tư vấn. Mã không thay thế cho họ tên hoặc thông tin liên hệ của bạn.',
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
    category: 'Sử dụng chatbot',
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
        <section className="help-usage-guide" aria-labelledby="usage-guide-title">
          <div className="help-guide-heading">
            <span className="help-guide-icon help-guide-icon--coral"><MessageSquareText size={20} /></span>
            <div><span className="help-label">Dùng hiệu quả hơn</span><h2 id="usage-guide-title">Hướng dẫn sử dụng chatbot</h2></div>
          </div>
          <div className="help-usage-items">
            <div><Send size={16} /><span><strong>Hỏi rõ một việc</strong><small>Nêu ngành, phương thức hoặc mốc thời gian bạn muốn biết.</small></span></div>
            <div><MessageSquareText size={16} /><span><strong>Tiếp tục trong cùng phiên</strong><small>Gửi câu hỏi tiếp theo để Mai Anh hiểu mạch tư vấn.</small></span></div>
            <div><ShieldCheck size={16} /><span><strong>Kiểm tra thông tin quan trọng</strong><small>Đối chiếu thông báo chính thức của MUCE trước khi quyết định.</small></span></div>
          </div>
        </section>

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

        <section className="help-data-guide" aria-labelledby="data-guide-title">
          <div className="help-guide-heading">
            <span className="help-guide-icon"><ShieldCheck size={20} /></span>
            <div><span className="help-label">Minh bạch dữ liệu</span><h2 id="data-guide-title">Thông tin được gửi tới MUCE</h2></div>
          </div>
          <p>Thông tin bạn nhập trong biểu mẫu hồ sơ gồm vai trò, họ tên và email hoặc số điện thoại sẽ được gửi trực tiếp tới hệ thống MUCE để hỗ trợ tư vấn. Các câu hỏi được gửi cùng mã khách truy cập được lưu trong trình duyệt để kết nối yêu cầu với phiên hiện tại.</p>
          <div className="help-data-flow"><span>Bạn nhập thông tin</span><Send size={15} /><span>Ứng dụng UniGuide</span><Send size={15} /><span>Hệ thống MUCE</span></div>
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
