interface Props {
  from: "dark" | "cream";
  to: "dark" | "cream";
}

const colors = {
  dark: "#0a0a0a",
  cream: "#f8f6f1",
};

export function SectionDivider({ from, to }: Props) {
  return (
    <div
      className="relative h-24 md:h-32 -mt-1 -mb-1"
      style={{ background: colors[from] }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120L1440 120L1440 60C1440 60 1200 0 720 0C240 0 0 60 0 60L0 120Z"
          fill={colors[to]}
        />
      </svg>
    </div>
  );
}

export function GradientLine({ variant = "accent" }: { variant?: "accent" | "subtle" }) {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          variant === "accent"
            ? "linear-gradient(90deg, transparent, rgba(255,98,7,0.3) 30%, rgba(255,98,7,0.3) 70%, transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)",
      }}
    />
  );
}
