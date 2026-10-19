interface Props {
  from: "dark" | "cream";
  to: "dark" | "cream";
}

const colors = {
  dark: "#090D16",
  cream: "#F8F6F1",
};

export function SectionDivider({ from, to }: Props) {
  return (
    <div
      className="relative h-20 md:h-28 -mt-1 -mb-1 w-full overflow-hidden pointer-events-none"
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
            ? "linear-gradient(90deg, transparent, rgba(37,99,255,0.4) 30%, rgba(37,99,255,0.4) 70%, transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)",
      }}
    />
  );
}
