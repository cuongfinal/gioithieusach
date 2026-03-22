"use client";

import Link from "next/link";
import { Colors } from "@/lib/colors";
import type { Book } from "@/lib/types";

/** Strip custom markup (bold, italic, color tags, image refs) to plain text */
function stripMarkup(text: string): string {
  return text
    .replace(/\{color:#[A-Fa-f0-9]{3,6}\}(.+?)\{\/color\}/g, "$1")
    .replace(/\{[^}]+\.(?:png|jpe?g|gif|webp|svg)\}/gi, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/~~(.+?)~~/g, "$1")
    .trim();
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.id}`} className="group block">
      <div
        className="overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-2"
        style={{
          backgroundColor: Colors.Surface,
          boxShadow: `0 4px 20px ${Colors.ShadowColor}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 30px ${Colors.ShadowHover}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 4px 20px ${Colors.ShadowColor}`;
        }}
      >
        {/* Cover image placeholder */}
        <div
          className="relative flex h-56 items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${Colors.PrimaryLight}, ${Colors.TertiaryLight})`,
          }}
        >
          <span className="text-7xl">📖</span>
          <div
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: Colors.Accent,
              color: Colors.TextPrimary,
            }}
          >
            {book.genre}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="mb-2 text-lg font-bold leading-tight"
            style={{ color: Colors.TextPrimary }}
          >
            {book.title}
          </h3>
          <p
            className="mb-3 text-sm"
            style={{ color: Colors.TextSecondary }}
          >
            ✍️ {book.author.name}
          </p>
          <p
            className="line-clamp-3 text-sm leading-relaxed"
            style={{ color: Colors.TextSecondary }}
          >
            {stripMarkup(book.summary)}
          </p>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className="text-sm font-semibold"
              style={{ color: Colors.Primary }}
            >
              Xem chi tiết
            </span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: Colors.Primary }}
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
