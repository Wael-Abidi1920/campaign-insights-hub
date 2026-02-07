import { motion } from "framer-motion";

interface SentimentGaugeProps {
  value: number; // 0-100
  label: string;
}

export function SentimentGauge({ value, label }: SentimentGaugeProps) {
  const getColor = (val: number) => {
    if (val >= 70) return "hsl(var(--success))";
    if (val >= 40) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const getSentimentLabel = (val: number) => {
    if (val >= 70) return "Positif";
    if (val >= 40) return "Neutre";
    return "Négatif";
  };

  const rotation = (value / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-32 w-64">
        {/* Background arc */}
        <svg className="absolute inset-0" viewBox="0 0 200 100">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--destructive))" />
              <stop offset="50%" stopColor="hsl(var(--warning))" />
              <stop offset="100%" stopColor="hsl(var(--success))" />
            </linearGradient>
          </defs>
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>

        {/* Needle */}
        <motion.div
          className="absolute left-1/2 bottom-2 origin-bottom"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "bottom center" }}
        >
          <div
            className="h-16 w-1 rounded-full"
            style={{ backgroundColor: getColor(value) }}
          />
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-background"
            style={{ backgroundColor: getColor(value) }}
          />
        </motion.div>

        {/* Center circle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-card border-2 border-border" />
      </div>

      <div className="mt-2 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold"
          style={{ color: getColor(value) }}
        >
          {value}%
        </motion.p>
        <p className="text-sm text-muted-foreground">{getSentimentLabel(value)}</p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  );
}
