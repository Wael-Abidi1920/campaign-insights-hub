import { motion } from "framer-motion";
import { Play, FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Call {
  id: string;
  date: string;
  duration: string;
  sentiment: "positive" | "neutral" | "negative";
  outcome: "converted" | "callback" | "rejected" | "no_answer";
  phone: string;
}

interface RecentCallsTableProps {
  calls: Call[];
}

const sentimentConfig = {
  positive: { label: "Positif", variant: "success" as const },
  neutral: { label: "Neutre", variant: "warning" as const },
  negative: { label: "Négatif", variant: "destructive" as const },
};

const outcomeConfig = {
  converted: { label: "Converti", variant: "success" as const },
  callback: { label: "Rappel", variant: "warning" as const },
  rejected: { label: "Refusé", variant: "destructive" as const },
  no_answer: { label: "Pas de réponse", variant: "secondary" as const },
};

export function RecentCallsTable({ calls }: RecentCallsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Date</TableHead>
            <TableHead className="text-muted-foreground">Téléphone</TableHead>
            <TableHead className="text-muted-foreground">Durée</TableHead>
            <TableHead className="text-muted-foreground">Sentiment</TableHead>
            <TableHead className="text-muted-foreground">Résultat</TableHead>
            <TableHead className="text-muted-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call, index) => (
            <motion.tr
              key={call.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-border hover:bg-muted/50"
            >
              <TableCell className="font-medium">{call.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  {call.phone}
                </div>
              </TableCell>
              <TableCell>{call.duration}</TableCell>
              <TableCell>
                <Badge
                  variant={sentimentConfig[call.sentiment].variant}
                  className="text-xs"
                >
                  {sentimentConfig[call.sentiment].label}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={outcomeConfig[call.outcome].variant}
                  className="text-xs"
                >
                  {outcomeConfig[call.outcome].label}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
