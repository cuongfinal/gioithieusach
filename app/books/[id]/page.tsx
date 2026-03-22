import { notFound } from "next/navigation";
import Link from "next/link";
import { Colors } from "@/lib/colors";
import { getBookById, getBooks } from "@/lib/data";
import SectionTitle from "@/components/SectionTitle";
import ResourceLink from "@/components/ResourceLink";
import RichContent from "@/components/RichContent";

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ id: book.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) return { title: "Không tìm thấy sách" };
  return {
    title: `${book.title} — Tri thức từ những trang sách`,
    description: book.summary,
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) notFound();

  return (
    <div style={{ backgroundColor: Colors.Background }}>
      {/* Hero banner */}
      <section
        className="relative overflow-hidden py-16"
        style={{
          background: `linear-gradient(135deg, ${Colors.GradientStart}, ${Colors.GradientEnd})`,
        }}
      >
        <div
          className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-20"
          style={{ backgroundColor: Colors.Accent }}
        />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: Colors.White,
            }}
          >
            ← Quay lại danh sách
          </Link>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Book cover placeholder */}
            <div
              className="flex h-44 w-32 flex-shrink-0 items-center justify-center rounded-xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${Colors.PrimaryLight}, ${Colors.TertiaryLight})`,
              }}
            >
              <span className="text-5xl">📖</span>
            </div>
            <div>
              <div
                className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: Colors.Accent,
                  color: Colors.TextPrimary,
                }}
              >
                {book.genre} · {book.publishYear}
              </div>
              <h1
                className="mb-3 text-3xl font-extrabold md:text-4xl"
                style={{ color: Colors.White }}
              >
                {book.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        {/* Summary */}
        {/* Student greeting */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: Colors.Surface,
            boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
          }}
        >
          <SectionTitle icon="👋" title="Lời chào & Giới thiệu" />
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: Colors.BorderLight }}
          >
            <div className="mb-4">
              <RichContent content={book.student.greeting} />
            </div>
            <div className="flex flex-wrap gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: Colors.PrimaryLight,
                  color: Colors.White,
                }}
              >
                🧑‍🎓 {book.student.name}
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: Colors.Tertiary,
                  color: Colors.White,
                }}
              >
                📝 Lớp {book.student.className}
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: Colors.Warm,
                  color: Colors.White,
                }}
              >
                🏫 {book.student.school}
              </span>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: Colors.Surface,
            boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
          }}
        >
          <SectionTitle icon="📝" title="Tóm tắt nội dung" />
          <RichContent content={book.summary} />
        </section>

        {/* Video */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: Colors.Surface,
            boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
          }}
        >
          <SectionTitle icon="🎥" title="Video giới thiệu sách" />
          <div className="overflow-hidden rounded-xl">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={book.videoUrl}
                title={`Video giới thiệu ${book.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Author info */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: Colors.Surface,
            boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
          }}
        >
          <SectionTitle icon="✍️" title="Thông tin tác giả" />
          <h3
            className="mb-3 text-lg font-bold"
            style={{ color: Colors.TextPrimary }}
          >
            {book.author.name}
          </h3>
          <RichContent content={book.author.bio} />
        </section>

        {/* Review */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: Colors.Surface,
            boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
          }}
        >
          <SectionTitle icon="💭" title="Bài viết cảm nhận về cuốn sách" />
          <h3
            className="mb-4 text-lg font-semibold"
            style={{ color: Colors.Primary }}
          >
            {book.review.title}
          </h3>
          <RichContent content={book.review.content} />
          <p
            className="mt-4 text-right text-sm italic"
            style={{ color: Colors.TextSecondary }}
          >
            — {book.student.name}, Lớp {book.student.className},{" "}
            {book.student.school}
          </p>
        </section>

        {/* Precontent — Thông điệp của cuốn sách */}
        {book.review.precontent && (
          <section
            className="rounded-2xl p-6"
            style={{
              backgroundColor: Colors.Surface,
              boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
            }}
          >
            <SectionTitle icon="💡" title="Thông điệp của cuốn sách" />
            <RichContent content={book.review.precontent} />
          </section>
        )}

        {/* Resources */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: Colors.Surface,
            boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
          }}
        >
          <SectionTitle icon="📂" title="Mời các bạn tham quan kệ sách Online của mình nhé!" />
          <div className="grid gap-4 sm:grid-cols-2">
            {book.resources.map((resource, index) => (
              <ResourceLink key={index} resource={resource} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
