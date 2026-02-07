import { motion } from "framer-motion";
import { Calendar, RefreshCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showCampaignSelector?: boolean;
  onRefresh?: () => void;
}

const campaigns = [
  { id: "camp1", name: "Campagne Q1 2024" },
  { id: "camp2", name: "Campagne Été 2024" },
  { id: "camp3", name: "Campagne Black Friday" },
];

const dateRanges = [
  { id: "7d", name: "7 derniers jours" },
  { id: "30d", name: "30 derniers jours" },
  { id: "90d", name: "90 derniers jours" },
  { id: "custom", name: "Personnalisé" },
];

export function DashboardHeader({
  title,
  subtitle,
  showCampaignSelector = false,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {showCampaignSelector && (
          <Select defaultValue="camp1">
            <SelectTrigger className="w-[200px] bg-card border-border">
              <SelectValue placeholder="Sélectionner une campagne" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px] bg-card border-border">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map((range) => (
              <SelectItem key={range.id} value={range.id}>
                {range.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          className="border-border hover:bg-muted"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
