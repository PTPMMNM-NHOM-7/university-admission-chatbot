# University Admission Chatbot

Ứng dụng chatbot hỗ trợ thí sinh tra cứu thông tin và nhận tư vấn tuyển sinh đại học.

## Công nghệ

- React 19
- TypeScript
- Vite
- Oxlint

## Chức năng chính

| Chức năng | Mô tả |
| --- | --- |
| Đăng ký / Đăng nhập | Tạo và quản lý tài khoản người dùng. |
| Chatbot tư vấn tuyển sinh | Hỏi đáp tự nhiên về trường và thông tin tuyển sinh. |
| Tư vấn ngành học | Tư vấn các ngành mà trường đang đào tạo. |
| Tư vấn phương thức xét tuyển | Cung cấp thông tin về xét điểm thi THPT, học bạ, ĐGNL và các phương thức xét tuyển riêng. |
| Tư vấn điểm xét tuyển | Nhập điểm để đánh giá và tư vấn ngành hoặc phương thức phù hợp. |
| Tra cứu điểm chuẩn | Xem điểm chuẩn theo ngành và năm tuyển sinh. |
| Tra cứu học phí | Xem học phí theo ngành hoặc chương trình đào tạo. |
| Tra cứu chỉ tiêu | Xem chỉ tiêu tuyển sinh của từng ngành. |
| Tra cứu thông tin ngành | Xem mô tả ngành, chương trình học và cơ hội nghề nghiệp. |
| Tra cứu thông tin tuyển sinh | Xem thời gian, hồ sơ và quy trình đăng ký xét tuyển. |

## Khởi chạy project

Yêu cầu Node.js và npm.

```bash
npm install
npm run dev
```

## Các lệnh hỗ trợ

```bash
npm run build
npm run lint
npm run preview
```

## Kết nối trợ lý MUCE

Frontend sử dụng ba endpoint của trợ lý MUCE:

- `GET /TroLyAo/Intro`: khởi tạo visitor và kiểm tra hồ sơ.
- `POST /TroLyAo/Register`: đăng ký vai trò, họ tên và thông tin liên hệ.
- `POST /TroLyAo/Ask`: gửi câu hỏi và nhận phản hồi.

Trong môi trường development, Vite chuyển tiếp `/api/muce/*` tới
`https://muce.edu.vn/TroLyAo/*`. API MUCE không trả header CORS cho origin khác,
vì vậy môi trường production cũng cần cấu hình reverse proxy cùng đường dẫn.
Không nên gọi trực tiếp `https://muce.edu.vn/TroLyAo` từ browser.

Biến môi trường mặc định được mô tả trong `.env.example`:

```env
VITE_MUCE_API_BASE_URL=/api/muce
```
