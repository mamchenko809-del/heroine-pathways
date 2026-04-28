import { stages } from "@/data/stages";
import { cn } from "@/lib/utils";

type Props = {
  active: number;
  onSelect: (id: number) => void;
};

// Generate logarithmic spiral points
const points = stages.map((_, i) => {
  const t = i / (stages.length - 1); // 0..1
  const angle = -Math.PI / 2 + t * Math.PI * 2.4; // ~2.4 turns inward
  const radius = 320 - t * 270; // outer 320 -> inner 50
  const cx = 400 + Math.cos(angle) * radius;
  const cy = 400 + Math.sin(angle) * radius;
  return { cx, cy };
});

// Build smooth spiral path
const buildPath = () => {
  let d = `M ${points[0].cx} ${points[0].cy}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const mx = (prev.cx + cur.cx) / 2;
    const my = (prev.cy + cur.cy) / 2;
    d += ` Q ${prev.cx} ${prev.cy} ${mx} ${my}`;
  }
  d += ` T ${points[points.length - 1].cx} ${points[points.length - 1].cy}`;
  return d;
};

export const Spiral = ({ active, onSelect }: Props) => {
  return (
    <div className="relative w-full max-w-[640px] aspect-square mx-auto">
      {/* halo */}
      <div className="absolute inset-6 rounded-full bg-rose-soft/30 blur-3xl animate-pulse-petal" />
      <div className="absolute inset-20 rounded-full bg-sage-soft/40 blur-2xl" />

      <svg
        viewBox="0 0 800 800"
        className="relative w-full h-full"
        aria-label="Спираль десяти этапов путешествия героини"
      >
        {/* Decorative rings */}
        <g className="animate-spin-slow origin-center" style={{ transformOrigin: "400px 400px" }}>
          <circle cx="400" cy="400" r="370" fill="none" stroke="hsl(var(--sage) / 0.18)" strokeDasharray="1 8" />
          <circle cx="400" cy="400" r="345" fill="none" stroke="hsl(var(--rose) / 0.15)" strokeDasharray="1 14" />
        </g>

        {/* Spiral path */}
        <path
          d={buildPath()}
          fill="none"
          stroke="hsl(var(--sage) / 0.55)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d={buildPath()}
          fill="none"
          stroke="hsl(var(--rose) / 0.7)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="2200"
          strokeDashoffset="2200"
          style={{ animation: "draw 4s ease-out forwards" }}
        />

        {/* Center mark */}
        <circle cx="400" cy="400" r="4" fill="hsl(var(--rose))" />
        <text
          x="400"
          y="430"
          textAnchor="middle"
          className="font-serif"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontSize="18"
          fill="hsl(var(--ink) / 0.6)"
        >
          целостность
        </text>

        {/* Stage nodes */}
        {points.map((p, i) => {
          const stage = stages[i];
          const isActive = stage.id === active;
          return (
            <g
              key={stage.id}
              className="cursor-pointer transition-transform"
              onClick={() => onSelect(stage.id)}
              style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
            >
              <circle
                cx={p.cx}
                cy={p.cy}
                r={isActive ? 26 : 18}
                fill={isActive ? "hsl(var(--rose))" : "hsl(var(--cream))"}
                stroke={isActive ? "hsl(var(--rose))" : "hsl(var(--sage) / 0.7)"}
                strokeWidth="1.5"
                className="transition-all duration-500"
                style={{ filter: isActive ? "drop-shadow(0 8px 16px hsl(var(--rose) / 0.45))" : undefined }}
              />
              <text
                x={p.cx}
                y={p.cy + 6}
                textAnchor="middle"
                fontFamily="Cormorant Garamond, serif"
                fontSize={isActive ? 18 : 15}
                fontStyle="italic"
                fill={isActive ? "hsl(var(--cream))" : "hsl(var(--ink))"}
                className="pointer-events-none select-none transition-all"
              >
                {stage.roman}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mobile compact list */}
      <div className="md:hidden mt-6 flex flex-wrap justify-center gap-2">
        {stages.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              "h-9 w-9 rounded-full font-serif italic text-sm transition-all",
              s.id === active
                ? "bg-rose text-cream shadow-petal scale-110"
                : "bg-cream text-ink border border-sage/30",
            )}
            aria-label={`Этап ${s.roman}`}
          >
            {s.roman}
          </button>
        ))}
      </div>
    </div>
  );
};
