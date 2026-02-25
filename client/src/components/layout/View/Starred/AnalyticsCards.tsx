import { CheckCircle2, Sparkles, Star, TrendingUp } from "lucide-react";

type AnalyticsCardsProps = {
  totalTasks: number;
  completedCount: number;
  progress: number;
  starredCount: number;
};

const AnalyticsCards = ({
  totalTasks,
  completedCount,
  progress,
  starredCount,
}: AnalyticsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">Total Tasks</p>
          <TrendingUp size={18} className="text-primary" />
        </div>
        <p className="text-2xl font-bold text-text-primary mt-2">{totalTasks}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">Completed</p>
          <CheckCircle2 size={18} className="text-success" />
        </div>
        <p className="text-2xl font-bold text-text-primary mt-2">{completedCount}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">Progress</p>
          <Sparkles size={18} className="text-accent" />
        </div>
        <p className="text-2xl font-bold text-text-primary mt-2">{progress}%</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">Starred</p>
          <Star size={18} className="text-warning" />
        </div>
        <p className="text-2xl font-bold text-text-primary mt-2">{starredCount}</p>
      </div>
    </div>
  );
};

export default AnalyticsCards;
