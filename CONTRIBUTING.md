# Contributing to University Admission Chatbot

Cảm ơn bạn đã quan tâm đến dự án. Mọi đóng góp nên được thực hiện thông qua
Issue và Pull Request để thay đổi có thể được trao đổi và kiểm tra trước khi
đưa vào nhánh chính.

## Báo lỗi

Trước khi tạo Issue, hãy kiểm tra xem lỗi đã được báo cáo hay chưa. Issue cần
nêu rõ các bước tái hiện, kết quả mong đợi, kết quả thực tế, môi trường chạy và
ảnh chụp hoặc log liên quan. Không đăng token, mật khẩu hoặc dữ liệu cá nhân.

## Gửi Pull Request

1. Fork repository hoặc tạo branch từ `develop`.
2. Đặt tên branch theo dạng `feature/mo-ta`, `fix/mo-ta` hoặc `docs/mo-ta`.
3. Chỉ thay đổi những nội dung thuộc phạm vi Issue và bổ sung test khi cần.
4. Chạy `npm run lint`, `npm test` và `npm run build` trước khi push.
5. Tạo Pull Request vào `develop`, mô tả thay đổi và liên kết Issue liên quan.

## Quy tắc commit

Sử dụng Conventional Commits với nội dung ngắn gọn, viết ở thể mệnh lệnh:

```text
feat: add conversation search
fix: handle failed MUCE response
docs: update installation guide
test: add authentication validation tests
```

Các loại thường dùng gồm `feat`, `fix`, `docs`, `test`, `refactor`, `style` và
`chore`. Không gộp nhiều thay đổi không liên quan trong cùng một commit.

## Quy tắc chung

- Tuân theo cấu trúc và coding style hiện có của project.
- Không commit `node_modules`, file `.env`, secret hoặc output build.
- Giao tiếp tôn trọng và tập trung vào vấn đề kỹ thuật.
- Khi đóng góp, bạn đồng ý phát hành phần đóng góp theo giấy phép MIT của dự án.
