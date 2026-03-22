import { Colors } from "@/lib/colors";
import { getAboutData } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi — Góc Sách Hay",
  description: "Tìm hiểu về nhóm học sinh thực hiện dự án giới thiệu sách.",
};

export default async function AboutPage() {
  const about = await getAboutData();

  return (
    <div style={{ backgroundColor: Colors.Background }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16"
        style={{
          background: `linear-gradient(135deg, ${Colors.GradientWarmStart}, ${Colors.GradientWarmEnd})`,
        }}
      >
        <div
          className="absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-20"
          style={{ backgroundColor: Colors.Accent }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="mb-4 inline-block text-5xl">🌟</span>
          <h1
            className="mb-4 text-3xl font-extrabold md:text-4xl"
            style={{ color: Colors.White }}
          >
            {about.title}
          </h1>
          <p
            className="mx-auto max-w-2xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            {about.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-6 py-12">
        {/* Mission */}
        <section
          className="rounded-2xl p-8 text-center"
          style={{
            backgroundColor: Colors.Surface,
            boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
          }}
        >
          <span className="mb-4 inline-block text-4xl">🎯</span>
          <h2
            className="mb-4 text-xl font-bold"
            style={{ color: Colors.TextPrimary }}
          >
            Sứ mệnh của chúng tôi
          </h2>
          <p
            className="mx-auto max-w-2xl leading-relaxed"
            style={{ color: Colors.TextSecondary }}
          >
            {about.mission}
          </p>
        </section>

        {/* Team */}
        <section>
          <h2
            className="mb-8 text-center text-2xl font-bold"
            style={{ color: Colors.TextPrimary }}
          >
            Thành viên nhóm
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {about.team.map((member, index) => {
              const gradients = [
                `linear-gradient(135deg, ${Colors.Primary}, ${Colors.GradientEnd})`,
                `linear-gradient(135deg, ${Colors.Secondary}, ${Colors.Warm})`,
                `linear-gradient(135deg, ${Colors.Tertiary}, ${Colors.Primary})`,
                `linear-gradient(135deg, ${Colors.Warm}, ${Colors.Accent})`,
              ];
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl"
                  style={{
                    backgroundColor: Colors.Surface,
                    boxShadow: `0 2px 15px ${Colors.ShadowColor}`,
                  }}
                >
                  {/* Colored top bar */}
                  <div
                    className="h-2"
                    style={{
                      background: gradients[index % gradients.length],
                    }}
                  />
                  <div className="flex items-center gap-4 p-6">
                    {/* Avatar placeholder */}
                    <div
                      className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl"
                      style={{
                        background: gradients[index % gradients.length],
                      }}
                    >
                      🧑‍🎓
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold"
                        style={{ color: Colors.TextPrimary }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="text-sm font-medium"
                        style={{ color: Colors.Primary }}
                      >
                        {member.role}
                      </p>
                      <p
                        className="mt-1 text-xs"
                        style={{ color: Colors.TextSecondary }}
                      >
                        Lớp {member.className} · {member.school}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
