import { motion } from "framer-motion";

interface HeatmapChartProps {
  data: number[][]; // 7 days x 24 hours
}

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const hours = ["6h", "8h", "10h", "12h", "14h", "16h", "18h", "20h"];

export function HeatmapChart({ data }: HeatmapChartProps) {
  const getColor = (value: number) => {
    if (value >= 80) return "bg-success";
    if (value >= 60) return "bg-success/70";
    if (value >= 40) return "bg-warning";
    if (value >= 20) return "bg-warning/60";
    return "bg-destructive/50";
  };

  const getOpacity = (value: number) => {
    return 0.3 + (value / 100) * 0.7;
  };

  return (
    <div className="w-full">
      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-around pr-2 text-xs text-muted-foreground">
          {days.map((day) => (
            <span key={day} className="h-6 flex items-center">
              {day}
            </span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex-1">
          <div className="grid grid-cols-8 gap-1">
            {data.map((row, dayIndex) =>
              row.map((value, hourIndex) => (
                <motion.div
                  key={`${dayIndex}-${hourIndex}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: getOpacity(value), scale: 1 }}
                  transition={{ delay: (dayIndex * 8 + hourIndex) * 0.01 }}
                  className={`h-6 rounded ${getColor(value)} cursor-pointer transition-all hover:scale-110 hover:opacity-100`}
                  title={`${days[dayIndex]} ${hours[hourIndex]}: ${value}%`}
                />
              ))
            )}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {hours.map((hour) => (
              <span key={hour}>{hour}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-destructive/50" />
          <span className="text-muted-foreground">0-20%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-warning/60" />
          <span className="text-muted-foreground">20-40%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-warning" />
          <span className="text-muted-foreground">40-60%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-success/70" />
          <span className="text-muted-foreground">60-80%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-muted-foreground">80-100%</span>
        </div>
      </div>
    </div>
  );
}
