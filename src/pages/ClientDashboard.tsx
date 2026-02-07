import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  TrendingUp,
  Target,
  Clock,
  DollarSign,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { SentimentGauge } from "@/components/dashboard/SentimentGauge";
import { HeatmapChart } from "@/components/dashboard/HeatmapChart";
import { RecentCallsTable } from "@/components/dashboard/RecentCallsTable";

// Mock data
const dailyCallsData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}/01`,
  calls: Math.floor(Math.random() * 150) + 50,
  success: Math.floor(Math.random() * 100) + 30,
}));

const weeklyConversionData = [
  { week: "Sem 1", rate: 23 },
  { week: "Sem 2", rate: 28 },
  { week: "Sem 3", rate: 25 },
  { week: "Sem 4", rate: 32 },
];

const leadStatusData = [
  { name: "Converti", value: 35, color: "hsl(var(--success))" },
  { name: "En cours", value: 25, color: "hsl(var(--warning))" },
  { name: "Rappel", value: 20, color: "hsl(var(--primary))" },
  { name: "Refusé", value: 20, color: "hsl(var(--destructive))" },
];

const heatmapData = Array.from({ length: 7 }, () =>
  Array.from({ length: 8 }, () => Math.floor(Math.random() * 100))
);

const recentCalls = [
  { id: "1", date: "07/02/2024 14:32", phone: "+33 6 12 34 56 78", duration: "4:23", sentiment: "positive" as const, outcome: "converted" as const },
  { id: "2", date: "07/02/2024 14:15", phone: "+33 6 98 76 54 32", duration: "2:45", sentiment: "neutral" as const, outcome: "callback" as const },
  { id: "3", date: "07/02/2024 13:58", phone: "+33 6 55 44 33 22", duration: "1:12", sentiment: "negative" as const, outcome: "rejected" as const },
  { id: "4", date: "07/02/2024 13:42", phone: "+33 6 11 22 33 44", duration: "5:01", sentiment: "positive" as const, outcome: "converted" as const },
  { id: "5", date: "07/02/2024 13:20", phone: "+33 6 77 88 99 00", duration: "0:45", sentiment: "neutral" as const, outcome: "no_answer" as const },
];

const topObjections = [
  { text: "Prix trop élevé", count: 45 },
  { text: "Pas intéressé", count: 38 },
  { text: "Déjà équipé", count: 32 },
  { text: "Rappeler plus tard", count: 28 },
  { text: "Concurrent choisi", count: 22 },
];

export default function ClientDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <DashboardHeader
          title="Dashboard Campagne"
          subtitle="Analysez les performances de vos campagnes d'appels"
          showCampaignSelector
          onRefresh={() => setRefreshKey((k) => k + 1)}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KPICard
            title="Total Appels"
            value="2,847"
            change={12.5}
            icon={Phone}
            variant="default"
          />
          <KPICard
            title="Taux de Succès"
            value="67.8"
            suffix="%"
            change={3.2}
            icon={TrendingUp}
            variant="success"
          />
          <KPICard
            title="Taux de Conversion"
            value="28.4"
            suffix="%"
            change={-2.1}
            icon={Target}
            variant="warning"
          />
          <KPICard
            title="Durée Moyenne"
            value="3:42"
            icon={Clock}
            variant="default"
          />
          <KPICard
            title="CPL"
            value="12.50"
            prefix="€"
            change={-5.3}
            icon={DollarSign}
            variant="success"
          />
          <KPICard
            title="ROI"
            value="285"
            suffix="%"
            change={18.7}
            icon={BarChart3}
            variant="success"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Calls Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Évolution des appels (30 jours)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyCallsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="calls"
                  name="Appels"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="success"
                  name="Succès"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weekly Conversion Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Taux de conversion par semaine</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyConversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="rate" name="Taux" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts Row 2 - Qualitative Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sentiment Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Sentiment Moyen</h3>
            <SentimentGauge value={68} label="Score de sentiment global" />
          </motion.div>

          {/* Lead Status Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Distribution des Leads</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={leadStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {leadStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Objections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Top Objections</h3>
            <div className="space-y-3">
              {topObjections.map((obj, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{obj.text}</span>
                      <span className="text-muted-foreground">{obj.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(obj.count / 50) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Taux de réponse par heure/jour</h3>
          <HeatmapChart data={heatmapData} />
        </motion.div>

        {/* Recent Calls Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">Appels Récents</h3>
          <RecentCallsTable calls={recentCalls} />
        </motion.div>
      </div>
    </div>
  );
}
