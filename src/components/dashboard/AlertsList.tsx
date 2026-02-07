import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
  timestamp: string;
}

interface AlertsListProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
}

const alertConfig = {
  error: {
    icon: AlertCircle,
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    iconColor: "text-destructive",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-warning/10",
    border: "border-warning/30",
    iconColor: "text-warning",
  },
  info: {
    icon: Info,
    bg: "bg-primary/10",
    border: "border-primary/30",
    iconColor: "text-primary",
  },
};

export function AlertsList({ alerts, onDismiss }: AlertsListProps) {
  return (
    <div className="space-y-2">
      {alerts.map((alert, index) => {
        const config = alertConfig[alert.type];
        const Icon = config.icon;

        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3",
              config.bg,
              config.border
            )}
          >
            <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.iconColor)} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 flex-shrink-0"
                onClick={() => onDismiss(alert.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
