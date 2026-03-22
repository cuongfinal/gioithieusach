import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Góc Sách Hay — Giới thiệu sách cho học sinh THCS",
  description:
    "Website giới thiệu sách hay dành cho học sinh Trung học Cơ sở. Khám phá, đọc cảm nhận và tìm hiểu về những cuốn sách tuyệt vời.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" style={{ fontFamily: "var(--font-be-vietnam), sans-serif" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
