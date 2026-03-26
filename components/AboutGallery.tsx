"use client";

import DiaryGallery from "@/components/DiaryGallery";
import type { AboutImage } from "@/lib/types";

export default function AboutGallery({ images }: { images: AboutImage[] }) {
  return <DiaryGallery images={images} />;
}
