import { useState } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Clock,
  AlertTriangle,
  Users,
  Phone,
  HardDrive,
  Cpu,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SystemHealthCard } from "@/components/dashboard/SystemHealthCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { TopClientsTable } from "@/components/dashboard/TopClientsTable";
import { AlertsList } from "@/components/dashboard/AlertsList";

// Mock data
const clientGrowthData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"][i],
  clients: 45 + i * 8 + Math.floor(Math.random() * 10),
}));

const storageUsageData = [
  { client: "Client A", storage: 245 },
  { client: "Client B", storage: 198 },
  { client: "Client C", storage: 156 },
  { client: "Client D", storage: 134 },
  { client: "Client E", storage: 98 },
  { client: "Client F", storage: 76 },
  { client: "Client G", storage: 54 },
  { client: "Client H", storage: 42 },
  { client: "Client I", storage: 38 },
  { client: "Client J", storage: 32 },
];

const storageGrowthData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"][i],
  storage: 500 + i * 150 + Math.floor(Math.random() * 50),
}));

const topClients = [
  { id: "1", name: "Entreprise Alpha", totalCalls: 45280, revenue: 125000, trend: 12.5, status: "active" as const },
  { id: "2", name: "Société Beta", totalCalls: 38920, revenue: 98500, trend: 8.3, status: "active" as const },
  { id: "3", name: "Groupe Gamma", totalCalls: 32150, revenue: 87200, trend: -2.1, status: "active" as const },
  { id: "4", name: "Corp Delta", totalCalls: 28400, revenue: 76800, trend: 15.7, status: "active" as const },
  { id: "5", name: "Industries Epsilon", totalCalls: 22890, revenue: 54300, trend: -5.4, status: "inactive" as const },
];

const alerts = [
  { id: "1", type: "error" as const, message: "Taux d'erreur API élevé détecté sur le serveur EU-1", timestamp: "Il y a 5 minutes" },
  { id: "2", type: "warning" as const, message: "Utilisation CPU proche du seuil critique (85%)", timestamp: "Il y a 15 minutes" },
  { id: "3", type: "warning" as const, message: "Latence réseau inhabituelle détectée", timestamp: "Il y a 32 minutes" },
  { id: "4", type: "info" as const, message: "Maintenance planifiée dans 2 heures", timestamp: "Il y a 1 heure" },
];

const errorBreakdown = [
  { cause: "Timeout", count: 234 },
  { cause: "Auth Failed", count: 156 },
  { cause: "Rate Limited", count: 89 },
  { cause: "Server Error", count: 67 },
  { cause: "Network", count: 45 },
];

export default function AdminDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeAlerts, setActiveAlerts] = useState(alerts);

  const handleDismissAlert = (id: string) => {
    setActiveAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <DashboardHeader
          title="Dashboard Administrateur"
          subtitle="Vue d'ensemble de la plateforme et monitoring système"
          onRefresh={() => setRefreshKey((k) => k + 1)}
        />

        {/* System Health Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SystemHealthCard
            title="Uptime"
            value="99.98"
            unit="%"
            status="healthy"
            icon={Server}
          />
          <SystemHealthCard
            title="API Response"
            value="142"
            unit="ms"
            status="healthy"
            icon={Clock}
          />
          <SystemHealthCard
            title="Error Rate"
            value="0.12"
            unit="%"
            status="warning"
            icon={AlertTriangle}
          />
          <SystemHealthCard
            title="CPU Usage"
            value="67"
            unit="%"
            status="healthy"
            icon={Cpu}
            showBar
            barValue={67}
          />
        </div>

        {/* Activity Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            title="Clients Actifs"
            value="142"
            change={8.5}
            icon={Users}
            variant="default"
          />
          <KPICard
            title="Appels Traités (Global)"
            value="1.2M"
            change={15.3}
            icon={Phone}
            variant="success"
          />
          <KPICard
            title="Moy. Appels/Client"
            value="8,451"
            change={3.2}
            icon={Activity}
            variant="default"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Croissance Clients (12 mois)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clientGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="clients"
                  name="Clients"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Storage Usage by Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Stockage par Client (Top 10)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={storageUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} unit=" GB" />
                <YAxis type="category" dataKey="client" stroke="hsl(var(--muted-foreground))" fontSize={11} width={70} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value} GB`, "Stockage"]}
                />
                <Bar dataKey="storage" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Top Clients and Storage Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Top Clients</h3>
            <TopClientsTable clients={topClients} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Croissance Stockage Total</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={storageGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit=" GB" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="storage"
                  name="Stockage"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  fill="hsl(var(--success) / 0.1)"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Quality and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Error Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Répartition des Erreurs</h3>
            <div className="space-y-3">
              {errorBreakdown.map((error, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{error.cause}</span>
                      <span className="text-muted-foreground">{error.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(error.count / 250) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-destructive rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Erreurs</span>
                <span className="font-semibold text-destructive">
                  {errorBreakdown.reduce((acc, e) => acc + e.count, 0)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Active Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Alertes Actives</h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {activeAlerts.length} alerte{activeAlerts.length > 1 ? "s" : ""}
              </span>
            </div>
            <AlertsList alerts={activeAlerts} onDismiss={handleDismissAlert} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
