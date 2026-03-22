"use client";

import { Colors } from "@/lib/colors";
import type { Resource } from "@/lib/types";

const resourceIcons: Record<string, string> = {
  drive: "📁",
  video: "🎬",
  document: "📄",
  book: "📖",
  other: "🔗",
};

export default function ResourceLink({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-xl p-4 transition-all duration-200"
      style={{
        backgroundColor: Colors.BorderLight,
        border: `1px solid ${Colors.Border}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = Colors.SurfaceHover;
        e.currentTarget.style.borderColor = Colors.PrimaryLight;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = Colors.BorderLight;
        e.currentTarget.style.borderColor = Colors.Border;
      }}
    >
      <span className="text-2xl">{resourceIcons[resource.type] ?? "🔗"}</span>
      <div>
        <p
          className="text-sm font-semibold"
          style={{ color: Colors.TextPrimary }}
        >
          {resource.label}
        </p>
        <p className="text-xs" style={{ color: Colors.TextSecondary }}>
          Mở trong tab mới ↗
        </p>
      </div>
    </a>
  );
}
