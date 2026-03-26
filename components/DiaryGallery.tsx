"use client";

import { useState } from "react";
import { Colors } from "@/lib/colors";
import type { DiaryImage } from "@/lib/types";

export default function DiaryGallery({ images }: { images: DiaryImage[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, index) => (
          <figure
            key={index}
            className="cursor-pointer overflow-hidden rounded-xl"
            onClick={() => setSelected(index)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.caption || `Nhật ký ${index + 1}`}
              className="aspect-[2/3] w-full rounded-lg object-cover transition-transform duration-200 hover:scale-105"
            />
            {img.caption && (
              <figcaption
                className="p-2 text-center text-xs"
                style={{ color: Colors.TextSecondary }}
              >
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          {/* Close button */}
          <button
            className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-2xl text-white transition-colors hover:bg-white/40"
            onClick={() => setSelected(null)}
          >
            ✕
          </button>

          {/* Prev */}
          {selected > 0 && (
            <button
              className="absolute left-4 rounded-full bg-white/20 px-3 py-2 text-2xl text-white transition-colors hover:bg-white/40"
              onClick={(e) => {
                e.stopPropagation();
                setSelected(selected - 1);
              }}
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div
            className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[selected].url}
              alt={images[selected].caption || `Nhật ký ${selected + 1}`}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />
            {images[selected].caption && (
              <p className="mt-3 text-center text-sm text-white">
                {images[selected].caption}
              </p>
            )}
          </div>

          {/* Next */}
          {selected < images.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-2xl text-white transition-colors hover:bg-white/40"
              onClick={(e) => {
                e.stopPropagation();
                setSelected(selected + 1);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
