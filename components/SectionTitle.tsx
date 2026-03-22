import { Colors } from "@/lib/colors";

interface SectionTitleProps {
  icon: string;
  title: string;
}

export default function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
        style={{
          background: `linear-gradient(135deg, ${Colors.Primary}, ${Colors.GradientEnd})`,
        }}
      >
        {icon}
      </span>
      <h2
        className="text-xl font-bold"
        style={{ color: Colors.TextPrimary }}
      >
        {title}
      </h2>
    </div>
  );
}
