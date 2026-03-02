import React from "react";
import { Wrench, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const ServiceDashboard: React.FC = () => {
  const stats = [
    { title: "Active SRO", value: "12", icon: Wrench },
    { title: "Completed", value: "45", icon: CheckCircle },
    { title: "Pending", value: "8", icon: Clock },
    { title: "Issues", value: "3", icon: AlertCircle },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white mb-1 sm:mb-2">
          Service Dashboard
        </h1>
        <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
          Service request overview and management
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-secondary-200/50 dark:border-primary-500/30 bg-white/70 dark:bg-charcoal-800/80 backdrop-blur-xl p-4 sm:p-6 shadow-lg hover:shadow-xl dark:hover:shadow-glow-md transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary-500/10 to-transparent dark:from-primary-500/15 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16"></div>
            <div className="relative">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/30 dark:shadow-primary-500/40 mb-3 sm:mb-4">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-gray-400 mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-secondary-200/50 dark:border-primary-500/30 bg-white/70 dark:bg-charcoal-800/80 backdrop-blur-xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 dark:text-white mb-3 sm:mb-4">
          Recent Service Requests
        </h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200 dark:border-primary-500/30">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-secondary-900 dark:text-white">
                    SRO ID
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-secondary-900 dark:text-white">
                    Description
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-secondary-900 dark:text-white">
                    Status
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-secondary-900 dark:text-white hidden sm:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr
                    key={i}
                    className="border-b border-secondary-100/50 dark:border-primary-500/20 hover:bg-secondary-50/50 dark:hover:bg-charcoal-700/50 transition-all"
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-secondary-900 dark:text-white font-medium">
                      SRO-{i}001
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-secondary-600 dark:text-gray-300">
                      Service Request {i}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          i % 3 === 0
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                            : i % 2 === 0
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                            : "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                        }`}
                      >
                        {i % 3 === 0 ? "Completed" : i % 2 === 0 ? "Pending" : "Active"}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-secondary-600 dark:text-gray-400 hidden sm:table-cell">
                      2024-03-0{i}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
