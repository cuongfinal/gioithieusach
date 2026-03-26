import { Colors } from "@/lib/colors";
import { getAboutData } from "@/lib/data";
import SectionTitle from "@/components/SectionTitle";
import AboutGallery from "@/components/AboutGallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đôi dòng về mình — Tri thức từ những trang sách",
  description: "Đôi điều về tác giả thực hiện dự án giới thiệu sách.",
};

export default async function AboutPage() {
  const about = await getAboutData();

  return (
    <div style={{ backgroundColor: Colors.Background }}>
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        {/* Thông tin cá nhân */}
        {about.team[0] && (() => {
          const member = about.team[0];
          const gradient = `linear-gradient(135deg, ${Colors.Primary}, ${Colors.GradientEnd})`;
          return (
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                backgroundColor: Colors.White,
                boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
              }}
            >
              <div
                className="relative flex items-end px-6 pb-16 pt-10"
                style={{ background: gradient }}
              >
                <h1
                  className="text-2xl font-extrabold md:text-3xl"
                  style={{ color: Colors.White }}
                >
                  {about.title}
                </h1>
              </div>
              <div className="relative px-6 pb-6">
                <div
                  className="-mt-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-lg"
                  style={{
                    background: gradient,
                    border: `4px solid ${Colors.White}`,
                  }}
                >
                  🧑‍🎓
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: Colors.TextPrimary }}
                >
                  {member.name}
                </h3>
                <p
                  className="mt-1 text-sm font-medium"
                  style={{ color: Colors.Primary }}
                >
                  {member.role}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-4 py-1.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${Colors.Primary}15`,
                      color: Colors.Primary,
                    }}
                  >
                    Lớp {member.className}
                  </span>
                  <span
                    className="rounded-full px-4 py-1.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${Colors.Secondary}20`,
                      color: Colors.SecondaryDark,
                    }}
                  >
                    {member.school}
                  </span>
                </div>
                {about.description && (
                  <p
                    className="mt-4 text-sm leading-relaxed text-justify"
                    style={{ color: Colors.TextSecondary }}
                  >
                    {about.description}
                  </p>
                )}
              </div>
            </div>
          );
        })()}

        {/* Thông điệp gửi đến bạn */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: Colors.Surface,
            boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
          }}
        >
          <SectionTitle icon="🎯" title="Thông điệp gửi đến bạn" />
          <p
            className="leading-relaxed text-justify"
            style={{ color: Colors.TextSecondary }}
          >
            {about.mission}
          </p>
        </section>

        {/* Thành tích học tập */}
        {about.team[0]?.achievements && (
          <section
            className="rounded-2xl p-6"
            style={{
              backgroundColor: Colors.Surface,
              boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
            }}
          >
            <SectionTitle icon="🏆" title="Thành tích học tập" />
            <p
              className="text-sm leading-relaxed"
              style={{ color: Colors.TextSecondary }}
            >
              {about.team[0].achievements}
            </p>
          </section>
        )}

        {/* Sở thích */}
        {about.team[0]?.hobbies && (
          <section
            className="rounded-2xl p-6"
            style={{
              backgroundColor: Colors.Surface,
              boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
            }}
          >
            <SectionTitle icon="💖" title="Sở thích" />
            <p
              className="text-sm leading-relaxed"
              style={{ color: Colors.TextSecondary }}
            >
              {about.team[0].hobbies}
            </p>
          </section>
        )}

        {/* Hình ảnh */}
        {about.images.length > 0 && (
          <section
            className="rounded-2xl p-6"
            style={{
              backgroundColor: Colors.Surface,
              boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
            }}
          >
            <SectionTitle icon="📸" title="Hình ảnh" />
            <AboutGallery images={about.images} />
          </section>
        )}
      </div>
    </div>
  );
}
