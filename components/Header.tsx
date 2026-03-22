"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Colors } from "@/lib/colors";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Đôi dòng về mình" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        background: `linear-gradient(135deg, ${Colors.GradientStart}, ${Colors.GradientEnd})`,
      }}
      className="sticky top-0 z-50 shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-3xl">📚</span>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: Colors.White }}
          >
            Tri thức từ những trang sách
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 text-center min-w-[130px]"
                style={{
                  color: isActive ? Colors.Primary : Colors.White,
                  backgroundColor: isActive
                    ? Colors.White
                    : "rgba(255,255,255,0.15)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
