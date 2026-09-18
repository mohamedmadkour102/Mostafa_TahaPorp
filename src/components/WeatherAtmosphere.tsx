import { useReducedMotion } from "framer-motion";

const rainDrops = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  left: `${(i * 11 + 3) % 98}%`,
  delay: `${(i % 12) * 0.15}s`,
  duration: `${0.9 + (i % 6) * 0.18}s`,
  height: 14 + (i % 5) * 5,
  opacity: 0.35 + (i % 4) * 0.1,
}));

export function WeatherAtmosphere() {
  const reduce = useReducedMotion();

  return (
    <div
      className={`weather-atmosphere weather-storm ${reduce ? "weather-static" : ""}`}
      aria-hidden
    >
      <div className="weather-sky" />
      <div className="weather-haze" />

      <div className="weather-cloud weather-cloud-a" />
      <div className="weather-cloud weather-cloud-b" />
      <div className="weather-cloud weather-cloud-c" />
      <div className="weather-cloud weather-cloud-d" />
      <div className="weather-cloud weather-cloud-e" />

      {!reduce && (
        <div className="weather-rain">
          {rainDrops.map((d) => (
            <span
              key={d.id}
              className="weather-drop"
              style={{
                left: d.left,
                animationDelay: d.delay,
                animationDuration: d.duration,
                height: d.height,
                opacity: d.opacity,
              }}
            />
          ))}
        </div>
      )}

      <svg className="weather-wave" viewBox="0 0 1200 140" preserveAspectRatio="none">
        <path
          className="weather-wave-path weather-wave-back"
          d="M0,70 C150,100 350,40 600,70 C850,100 1050,45 1200,75 L1200,140 L0,140 Z"
        />
        <path
          className="weather-wave-path weather-wave-mid"
          d="M0,88 C180,60 380,115 620,85 C860,55 1040,105 1200,90 L1200,140 L0,140 Z"
        />
        <path
          className="weather-wave-path weather-wave-front"
          d="M0,100 C200,75 400,125 650,95 C900,65 1050,118 1200,100 L1200,140 L0,140 Z"
        />
      </svg>
    </div>
  );
}
