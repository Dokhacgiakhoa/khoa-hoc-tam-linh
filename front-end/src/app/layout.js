import "./globals.css";
import ClientLayout from "../components/layout/ClientLayout";

export const metadata = {
  title: "Khoa Học Tâm Linh - Nền Tảng Huyền Học Số & Thương Mại Điện Tử",
  description: "Kết hợp tinh hoa Huyền học phương Đông (Tử Vi, Kinh Dịch, Tarot, Thần Số Học) với công nghệ hiện đại và Trí Tuệ Nhân Tạo AI.",
  keywords: ["Tử Vi", "Kinh Dịch", "Tarot", "Thần Số Học", "Phong Thủy", "Khoa Học Tâm Linh", "Bản Đồ Sao"],
  authors: [{ name: "Đỗ Khắc Gia Khoa" }],
  openGraph: {
    title: "Khoa Học Tâm Linh - Hệ Sinh Thái Huyền Học Số",
    description: "Khai phá sức mạnh tâm linh bằng trí tuệ nhân tạo và dữ liệu khoa học.",
    url: "https://dokhacgiakhoa.vn",
    siteName: "Khoa Học Tâm Linh",
    images: [
      {
        url: "/images/banners/trang-chu-tarot-va-bai-tra.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
