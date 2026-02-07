import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemHealthCardProps {
  title: string;
  value: string | number;
  status: "healthy" | "warning" | "critical";
  icon: LucideIcon;
  unit?: string;
  showBar?: boolean;
  barValue?: number;
}

const statusConfig = {
  healthy: {
    color: "text-success",
    bg: "bg-success",
    border: "border-success/30",
    glow: "shadow-success/20",
  },
  warning: {
    color: "text-warning",
    bg: "bg-warning",
    border: "border-warning/30",
    glow: "shadow-warning/20",
  },
  critical: {
    color: "text-destructive",
    bg: "bg-destructive",
    border: "border-destructive/30",
    glow: "shadow-destructive/20",
  },
};

export function SystemHealthCard({
  title,
  value,
  status,
  icon: Icon,
  unit = "",
  showBar = false,
  barValue = 0,
}: SystemHealthCardProps) {
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative rounded-xl border bg-card p-4 shadow-lg",
        config.border,
        `shadow-${config.glow}`
      )}
    >
      {/* Status indicator */}
      <div className="absolute top-3 right-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={cn("h-2 w-2 rounded-full", config.bg)}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className={cn("rounded-lg p-2", `${config.bg}/10`)}>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className={cn("text-2xl font-bold", config.color)}>
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
        </div>
      </div>

      {showBar && (
        <div className="mt-3">
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${barValue}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn("h-full rounded-full", config.bg)}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
