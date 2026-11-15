# Hướng dẫn quản trị nội dung trang Siêu toà soạn

Trang quản trị: **https://toasoan.github.io/admin/**

## 1. Tạo "chìa khoá" đăng nhập (làm một lần)

1. Đăng nhập GitHub bằng tài khoản quản lý repo `toasoan/toasoan.github.io`.
2. Mở https://github.com/settings/personal-access-tokens/new
3. Điền:
   - **Token name**: `CMS toà soạn`
   - **Expiration**: chọn thời hạn (tối đa 1 năm; hết hạn thì tạo lại).
   - **Repository access**: chọn *Only select repositories* → chọn `toasoan.github.io`.
   - **Permissions → Repository permissions → Contents**: chọn **Read and write**.
4. Bấm **Generate token**, sao chép chuỗi bắt đầu bằng `github_pat_…`.
   Giữ bí mật chuỗi này như mật khẩu.

## 2. Đăng nhập

1. Mở https://toasoan.github.io/admin/
2. Chọn **Đăng nhập bằng mã truy cập (Sign In Using Access Token)** → dán token → đăng nhập.
   Trình duyệt sẽ nhớ, lần sau không cần dán lại.

## 3. Sửa nội dung

- Vào **Trang chủ** → chọn mục cần sửa (00 Phần mở đầu … 10 Chân trang).
- Sửa chữ, thay ảnh (bấm vào ô ảnh → tải ảnh mới lên), thêm/xoá/kéo đổi thứ tự các mục trong danh sách.
- Bấm **Lưu (Save)**. Khoảng **1–2 phút** sau trang https://toasoan.github.io/ tự cập nhật
  (bấm Ctrl + F5 nếu chưa thấy).

### Định dạng chữ
| Gõ | Hiển thị |
|---|---|
| `*chữ*` | chữ in nghiêng, màu nổi bật (đỏ/vàng tuỳ vị trí) |
| `**chữ**` | chữ in đậm |
| Xuống dòng (ở ô nhiều dòng) | ngắt dòng |

### Lưu ý
- **Hành trình**: mã giai đoạn của mỗi mốc (I, II, III, IV) phải trùng với mã trong danh sách "Các giai đoạn".
- **Hệ sinh thái**: "Kiểu thẻ" quyết định kích thước, màu nền và biểu tượng của thẻ.
- **Ảnh chân dung** nên là ảnh vuông, khuôn mặt ở giữa.
- Mọi lần lưu đều được GitHub ghi lại lịch sử, có thể khôi phục bản cũ khi cần.

## Phạm vi
CMS quản lý toàn bộ nội dung **trang chủ**. Trang báo giá (`bao-gia.html`) và các trang longform
(`longform/…`) chưa nằm trong CMS.
