import React from "react";
import { Colors } from "@/lib/colors";

/**
 * Renders text content with:
 * - Line breaks (\n)
 * - {path/to/image.jpg} as inline images
 * - Text + image on same line → side by side, respecting order
 * - Markdown: **bold**, *italic*, ~~strikethrough~~
 * - Color: {color:#FF0000}text{/color}
 */

const IMAGE_PATTERN = /\{([^}]+\.(?:png|jpe?g|gif|webp|svg))\}/gi;

/** Recursively parse markdown so styles can nest */
function parseMarkdown(text: string): React.ReactNode[] {
  const patterns: {
    regex: RegExp;
    render: (match: RegExpExecArray, key: number) => React.ReactNode;
  }[] = [
    {
      regex: /\*\*(.+?)\*\*/g,
      render: (m, k) => <strong key={k}>{parseMarkdown(m[1])}</strong>,
    },
    {
      regex: /\{color:(#[A-Fa-f0-9]{3,6})\}(.+?)\{\/color\}/g,
      render: (m, k) => (
        <span key={k} style={{ color: m[1] }}>
          {parseMarkdown(m[2])}
        </span>
      ),
    },
    {
      regex: /\*(.+?)\*/g,
      render: (m, k) => <em key={k}>{parseMarkdown(m[1])}</em>,
    },
    {
      regex: /~~(.+?)~~/g,
      render: (m, k) => <s key={k}>{parseMarkdown(m[1])}</s>,
    },
  ];

  for (const { regex, render } of patterns) {
    regex.lastIndex = 0;
    if (regex.test(text)) {
      const nodes: React.ReactNode[] = [];
      regex.lastIndex = 0;
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(text)) !== null) {
        if (m.index > lastIndex) {
          nodes.push(...parseMarkdown(text.slice(lastIndex, m.index)));
        }
        nodes.push(render(m, m.index));
        lastIndex = m.index + m[0].length;
      }
      if (lastIndex < text.length) {
        nodes.push(...parseMarkdown(text.slice(lastIndex)));
      }
      return nodes;
    }
  }

  return [text];
}

type Part = { type: "text"; value: string } | { type: "image"; src: string };

/** Split a line into ordered text and image parts */
function parseLine(line: string): Part[] {
  const parts: Part[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  IMAGE_PATTERN.lastIndex = 0;
  while ((match = IMAGE_PATTERN.exec(line)) !== null) {
    if (match.index > lastIndex) {
      const text = line.slice(lastIndex, match.index).trim();
      if (text) parts.push({ type: "text", value: text });
    }
    parts.push({ type: "image", src: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    const text = line.slice(lastIndex).trim();
    if (text) parts.push({ type: "text", value: text });
  }

  return parts;
}

export default function RichContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-3 leading-relaxed text-justify" style={{ color: Colors.TextPrimary }}>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <br key={i} />;

        const parts = parseLine(trimmed);
        const hasImage = parts.some((p) => p.type === "image");

        // No images — plain text with markdown
        if (!hasImage) {
          return <p key={i}>{parseMarkdown(trimmed)}</p>;
        }

        const images = parts.filter((p): p is Part & { type: "image" } => p.type === "image");
        const texts = parts.filter((p): p is Part & { type: "text" } => p.type === "text");

        // Only images, no text
        if (texts.length === 0) {
          return (
            <div key={i} className="my-3 flex justify-center gap-3">
              {images.map((img, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={idx}
                  src={`/${img.src}`}
                  alt={img.src}
                  className="rounded-xl object-cover"
                  style={{ maxWidth: "45%", maxHeight: "250px" }}
                />
              ))}
            </div>
          );
        }

        // Mixed text + image — render in order, side by side
        const firstIsImage = parts[0].type === "image";

        return (
          <div key={i} className="my-3 grid grid-cols-2 items-start gap-4">
            {firstIsImage ? (
              <>
                <div className="flex flex-col gap-2">
                  {images.map((img, idx) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={idx}
                      src={`/${img.src}`}
                      alt={img.src}
                      className="w-full rounded-xl object-cover"
                      style={{ maxHeight: "250px" }}
                    />
                  ))}
                </div>
                <p>{parseMarkdown(texts.map((t) => t.value).join(" "))}</p>
              </>
            ) : (
              <>
                <p>{parseMarkdown(texts.map((t) => t.value).join(" "))}</p>
                <div className="flex flex-col gap-2">
                  {images.map((img, idx) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={idx}
                      src={`/${img.src}`}
                      alt={img.src}
                      className="w-full rounded-xl object-cover"
                      style={{ maxHeight: "250px" }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
