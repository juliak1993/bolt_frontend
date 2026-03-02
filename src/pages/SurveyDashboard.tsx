import React from "react";
import { TrendingUp, TrendingDown, Activity, Users } from "lucide-react";

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}> = ({ title, value, change, isPositive, icon }) => (
  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-secondary-200/50 dark:border-primary-500/30 bg-white/70 dark:bg-charcoal-800/80 backdrop-blur-xl p-4 sm:p-6 shadow-lg hover:shadow-xl dark:hover:shadow-glow-md transition-all duration-300">
    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary-500/10 to-transparent dark:from-primary-500/15 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16"></div>
    <div className="relative">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/30 dark:shadow-primary-500/40">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${
            isPositive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-primary-600 dark:text-primary-400"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-gray-400 mb-1">
        {title}
      </h3>
      <p className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

export const SurveyDashboard: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white mb-1 sm:mb-2">
          Survey Dashboard
        </h1>
        <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
          Monitor your survey operations and performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard
          title="Active Jobs"
          value="24"
          change="+12%"
          isPositive={true}
          icon={<Activity className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <StatCard
          title="Total Runs"
          value="156"
          change="+8%"
          isPositive={true}
          icon={<TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <StatCard
          title="Wells Surveyed"
          value="89"
          change="-3%"
          isPositive={false}
          icon={<Users className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <StatCard
          title="Completion Rate"
          value="94%"
          change="+5%"
          isPositive={true}
          icon={<Activity className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-secondary-200/50 dark:border-primary-500/30 bg-white/70 dark:bg-charcoal-800/80 backdrop-blur-xl p-4 sm:p-6 shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold text-secondary-900 dark:text-white mb-3 sm:mb-4">
            Recent Activity
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-secondary-50/50 dark:bg-charcoal-700/50 border border-secondary-200/30 dark:border-primary-500/20 hover:bg-secondary-100/70 dark:hover:bg-charcoal-700/70 hover:border-primary-500/30 transition-all"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-primary-500/30">
                  J{i}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white truncate">
                    Job #{i}00{i} Completed
                  </p>
                  <p className="text-xs text-secondary-500 dark:text-gray-400">
                    {i} hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-secondary-200/50 dark:border-primary-500/30 bg-white/70 dark:bg-charcoal-800/80 backdrop-blur-xl p-4 sm:p-6 shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold text-secondary-900 dark:text-white mb-3 sm:mb-4">
            Quick Stats
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span className="text-secondary-600 dark:text-gray-400">
                  Job Progress
                </span>
                <span className="font-semibold text-secondary-900 dark:text-white">
                  75%
                </span>
              </div>
              <div className="h-2 bg-secondary-200 dark:bg-charcoal-700 rounded-full overflow-hidden border border-secondary-300/30 dark:border-primary-500/20">
                <div className="h-full w-3/4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-glow-sm"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span className="text-secondary-600 dark:text-gray-400">
                  Well Coverage
                </span>
                <span className="font-semibold text-secondary-900 dark:text-white">
                  68%
                </span>
              </div>
              <div className="h-2 bg-secondary-200 dark:bg-charcoal-700 rounded-full overflow-hidden border border-secondary-300/30 dark:border-primary-500/20">
                <div className="h-full w-2/3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span className="text-secondary-600 dark:text-gray-400">
                  Run Efficiency
                </span>
                <span className="font-semibold text-secondary-900 dark:text-white">
                  92%
                </span>
              </div>
              <div className="h-2 bg-secondary-200 dark:bg-charcoal-700 rounded-full overflow-hidden border border-secondary-300/30 dark:border-primary-500/20">
                <div className="h-full w-11/12 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full shadow-glow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
