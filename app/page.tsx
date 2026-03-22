import { Colors } from "@/lib/colors";
import { getBooks } from "@/lib/data";
import BookCard from "@/components/BookCard";

export default async function HomePage() {
  const books = await getBooks();

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background: `linear-gradient(135deg, ${Colors.GradientStart}, ${Colors.GradientEnd})`,
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20"
          style={{ backgroundColor: Colors.Accent }}
        />
        <div
          className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-15"
          style={{ backgroundColor: Colors.Secondary }}
        />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="mb-4 inline-block text-6xl">📚</span>
          <h1
            className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl"
            style={{ color: Colors.White }}
          >
            Tri thức từ những trang sách
          </h1>
          <p
            className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Chào mừng bạn đến với góc sách nhỏ của mình! Hãy cùng mình khám phá những tác phẩm thú vị và tìm ra cuốn sách chân ái của bạn nhé!
          </p>
          <div
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            style={{
              backgroundColor: Colors.Accent,
              color: Colors.TextPrimary,
            }}
          >
            <span>🌟</span>
            <span>{books.length} cuốn sách đang chờ bạn khám phá</span>
          </div>
        </div>
      </section>

      {/* Book List Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2
            className="mb-3 text-2xl font-bold md:text-3xl"
            style={{ color: Colors.TextPrimary }}
          >
            Danh sách sách giới thiệu
          </h2>
          <p style={{ color: Colors.TextSecondary }}>
            Bấm vào từng cuốn sách để xem nội dung chi tiết
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
