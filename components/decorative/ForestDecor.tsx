/** Листья, ветки, цветы (SVG). Не для скринридеров. */

function FloatingLeaf({
  left,
  top,
  rotate,
  scale,
  fill,
}: {
  left: string;
  top: string;
  rotate: number;
  scale: number;
  fill: string;
}) {
  return (
    <svg
      className="absolute"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      style={{
        left,
        top,
        transform: `rotate(${rotate}deg) scale(${scale})`,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12" cy="11" rx="10" ry="5.5" fill={fill} opacity="0.75" />
    </svg>
  );
}

export function ForestDecor({
  density = "hero",
}: {
  density?: "hero" | "subtle";
}) {
  const wrapper =
    density === "hero"
      ? "opacity-[0.36] sm:opacity-[0.44]"
      : "opacity-[0.26] sm:opacity-[0.34]";

  const floats = density === "hero" ? FLOATING_HERO : FLOATING_SUBTLE;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${wrapper}`} aria-hidden>
      {/* Верхний правый — ветка */}
      <svg
        className="absolute -right-8 -top-6 h-[min(380px,45vw)] w-[min(420px,50vw)] text-[#6b8658]"
        viewBox="0 0 280 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-20 120 Q60 90 140 130 T260 160"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path fill="#5a7348" d="M162 118c22-42 62-62 94-72-12 42-54 74-112 94l18-22z" />
        <path fill="#7a9568" d="M98 146c18-52 52-92 112-118-44 72-112 142-154 174l42-56z" />
        <path fill="#8fb87a" d="M188 154c44-26 104-44 154-62-76 94-218 174-294 238l140-176z" />
        <circle cx="218" cy="68" r="8" fill="#c9b87a" opacity="0.85" />
        <circle cx="232" cy="82" r="5" fill="#d4cc9a" />
        <circle cx="204" cy="78" r="4.5" fill="#b8a86c" />
      </svg>

      {/* Верхний левый — крупные листья */}
      <svg
        className="absolute -left-4 top-[6%] h-48 w-48 text-[#5f7a52] sm:h-56 sm:w-56"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M60 104c26-52 62-106 54-174C78 52 62 62 54 132l6-28z"
          opacity="0.85"
        />
        <path
          fill="#7d9f6a"
          d="M28 92c54-62 132-146 206-174C182 74 144 154 104 226c-42-72-92-174-76-134z"
          opacity="0.5"
        />
        <path stroke="#4d5f40" strokeWidth="2" strokeLinecap="round" d="M60 106V78" opacity="0.55" />
      </svg>

      {/* Центр-лево — второй кластер листьев */}
      <svg
        className="absolute left-[-6%] top-[38%] h-40 w-40 -rotate-6 text-[#6d8f58] sm:h-44 sm:w-44"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="42" cy="38" rx="28" ry="14" transform="rotate(-42 42 38)" fill="currentColor" />
        <ellipse cx="62" cy="58" rx="22" ry="11" transform="rotate(28 62 58)" fill="#8fb87a" opacity="0.65" />
        <ellipse cx="48" cy="72" rx="16" ry="8" transform="rotate(-68 48 72)" fill="#5a7348" opacity="0.55" />
      </svg>

      {/* Средина справа — «осыпающиеся» листочки */}
      <svg
        className="absolute right-[4%] top-[42%] h-36 w-36 rotate-[18deg] text-[#72965c]"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="35" cy="40" rx="24" ry="12" transform="rotate(-30 35 40)" fill="currentColor" />
        <ellipse cx="65" cy="48" rx="18" ry="9" transform="rotate(40 65 48)" fill="#93b67d" opacity="0.65" />
        <ellipse cx="50" cy="68" rx="14" ry="7" transform="rotate(-55 50 68)" fill="#5f7f4f" opacity="0.5" />
      </svg>

      {/* Низ слева — хвоя */}
      <svg
        className="absolute -left-2 bottom-[4%] h-52 w-44 text-[#4a6840]"
        viewBox="0 0 100 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M50 174V10" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            stroke="#5c784e"
            strokeWidth="2.2"
            strokeLinecap="round"
            d={`M50 ${160 - i * 22}l${i % 2 === 0 ? "-" : ""}26 -14`}
          />
        ))}
      </svg>

      {/* Низ справа — плавающие овальные листья */}
      <svg
        className="absolute -right-1 bottom-[10%] h-52 w-52 rotate-12 text-[#6f8f5f]"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="38" cy="42" rx="22" ry="12" transform="rotate(-35 38 42)" fill="currentColor" />
        <ellipse cx="68" cy="58" rx="18" ry="10" transform="rotate(25 68 58)" fill="#7a9e65" opacity="0.7" />
        <ellipse cx="52" cy="72" rx="14" ry="8" transform="rotate(-55 52 72)" fill="#8fb87a" opacity="0.5" />
      </svg>

      {/* Верх по центру — лёгкая крона */}
      <svg
        className="absolute left-[25%] -top-8 hidden h-24 w-[50%] text-[#7a9568] opacity-80 md:block"
        viewBox="0 0 400 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="120" cy="45" rx="70" ry="22" fill="currentColor" opacity="0.35" />
        <ellipse cx="220" cy="38" rx="90" ry="28" fill="#8fb87a" opacity="0.28" />
        <ellipse cx="320" cy="44" rx="65" ry="20" fill="#5a7348" opacity="0.25" />
      </svg>

      {/* Кора внизу */}
      <svg
        className="absolute bottom-0 left-[12%] hidden h-28 w-[min(560px,72%)] opacity-35 sm:block"
        viewBox="0 0 400 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 62c140-72 276-108 402-62"
          stroke="#6b5844"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M32 62h8M180 54h14M294 62h11" stroke="#8f7d63" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Много мелких листьев по экрану */}
      {floats.map((f, i) => (
        <FloatingLeaf key={i} {...f} />
      ))}

      {/* Цветочки */}
      {FLOWERS.map((pos, idx) => (
        <svg
          key={`f-${idx}`}
          className="absolute"
          style={{ left: pos.left, top: pos.top }}
          width="36"
          height="36"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="20" cy="14" rx="6" ry="9" transform="rotate(-20 20 14)" fill="#ebe0b0" opacity="0.82" />
          <ellipse cx="14" cy="22" rx="6" ry="9" transform="rotate(40 14 22)" fill="#d9c889" opacity="0.75" />
          <ellipse cx="26" cy="22" rx="6" ry="9" transform="rotate(-50 26 22)" fill="#cbb87a" opacity="0.7" />
          <circle cx="20" cy="21" r="5" fill="#5f7a4c" opacity="0.8" />
        </svg>
      ))}
    </div>
  );
}

const FLOATING_HERO: Array<{
  left: string;
  top: string;
  rotate: number;
  scale: number;
  fill: string;
}> = [
  { left: "5%", top: "12%", rotate: -25, scale: 0.9, fill: "#76965f" },
  { left: "14%", top: "78%", rotate: 40, scale: 0.75, fill: "#8aae78" },
  { left: "22%", top: "34%", rotate: 15, scale: 0.65, fill: "#5f7f4f" },
  { left: "31%", top: "8%", rotate: -52, scale: 0.55, fill: "#9abe84" },
  { left: "38%", top: "58%", rotate: -18, scale: 0.85, fill: "#678f54" },
  { left: "44%", top: "22%", rotate: 62, scale: 0.5, fill: "#7fa06a" },
  { left: "52%", top: "70%", rotate: -35, scale: 0.7, fill: "#557848" },
  { left: "58%", top: "12%", rotate: 22, scale: 0.6, fill: "#93b679" },
  { left: "66%", top: "48%", rotate: -48, scale: 0.8, fill: "#6f9058" },
  { left: "74%", top: "28%", rotate: 34, scale: 0.55, fill: "#85a672" },
  { left: "78%", top: "82%", rotate: -12, scale: 0.72, fill: "#62804c" },
  { left: "88%", top: "52%", rotate: 55, scale: 0.62, fill: "#a0c089" },
  { left: "92%", top: "18%", rotate: -38, scale: 0.48, fill: "#759460" },
  { left: "10%", top: "48%", rotate: 28, scale: 0.58, fill: "#638550" },
  { left: "48%", top: "88%", rotate: -62, scale: 0.68, fill: "#889e70" },
  { left: "60%", top: "92%", rotate: 18, scale: 0.52, fill: "#73955e" },
  { left: "3%", top: "65%", rotate: -8, scale: 0.78, fill: "#547640" },
  { left: "95%", top: "68%", rotate: 42, scale: 0.66, fill: "#7d9f65" },
];

const FLOATING_SUBTLE = FLOATING_HERO.slice(0, 10).map((x) => ({
  ...x,
  scale: x.scale * 0.82,
}));

const FLOWERS = [
  { left: "8%", top: "24%" },
  { left: "27%", top: "18%" },
  { left: "50%", top: "6%" },
  { left: "70%", top: "36%" },
  { left: "86%", top: "72%" },
  { left: "18%", top: "88%" },
  { left: "92%", top: "44%" },
];
