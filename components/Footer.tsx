import { Colors } from "@/lib/colors";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: Colors.TextPrimary,
        color: Colors.TextLight,
      }}
      className="mt-auto"
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-lg font-semibold" style={{ color: Colors.White }}>
            <span>📚</span>
            <span>Tri thức từ những trang sách</span>
          </div>
          <p className="max-w-md text-sm" style={{ color: Colors.TextLight }}>
            Dự án giới thiệu sách của học sinh THCS Ngô Quyền — Lan tỏa tình yêu đọc sách
            đến mọi người.
          </p>
          <div
            className="h-px w-full max-w-xs"
            style={{ backgroundColor: Colors.TextSecondary }}
          />
          <p className="text-xs" style={{ color: Colors.TextSecondary }}>
            © 2026 Góc Sách Hay. Được thực hiện bởi học sinh Trường THCS Ngô Quyền, Phường Bảy Hiền, TPHCM.
          </p>
        </div>
      </div>
    </footer>
  );
}
