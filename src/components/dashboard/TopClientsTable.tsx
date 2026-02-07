import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Client {
  id: string;
  name: string;
  totalCalls: number;
  revenue: number;
  trend: number;
  status: "active" | "inactive";
}

interface TopClientsTableProps {
  clients: Client[];
}

export function TopClientsTable({ clients }: TopClientsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground w-12">#</TableHead>
            <TableHead className="text-muted-foreground">Client</TableHead>
            <TableHead className="text-muted-foreground text-right">Appels</TableHead>
            <TableHead className="text-muted-foreground text-right">Revenue</TableHead>
            <TableHead className="text-muted-foreground text-right">Tendance</TableHead>
            <TableHead className="text-muted-foreground">Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client, index) => (
            <motion.tr
              key={client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-border hover:bg-muted/50"
            >
              <TableCell className="font-bold text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell className="text-right font-mono">
                {client.totalCalls.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-mono text-success">
                €{client.revenue.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {client.trend >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span
                    className={
                      client.trend >= 0 ? "text-success" : "text-destructive"
                    }
                  >
                    {client.trend >= 0 ? "+" : ""}
                    {client.trend}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={client.status === "active" ? "success" : "secondary"}
                >
                  {client.status === "active" ? "Actif" : "Inactif"}
                </Badge>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
