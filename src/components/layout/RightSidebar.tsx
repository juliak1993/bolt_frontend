import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";

type NavItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

interface RightSidebarProps {
  rightCollapsed: boolean;
  setRightCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
  rightWidth: number;
  quickItems: NavItem[];
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  rightCollapsed,
  setRightCollapsed,
  rightWidth,
  quickItems,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <aside
      className="fixed right-0 top-14 sm:top-16 z-30 hidden md:block h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden transition-all duration-300 ease-in-out"
      style={{ width: rightWidth }}
    >
      <div className="absolute inset-0 bg-white/40 dark:bg-charcoal-900/60 backdrop-blur-2xl border-l border-secondary-200/30 dark:border-primary-500/20 shadow-glass"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent dark:from-primary-500/10"></div>

      <div className="relative flex h-full flex-col px-3 py-4">
        <div className="mb-4 flex items-center justify-between">
          {!rightCollapsed && (
            <div className="text-xs font-bold tracking-widest text-secondary-500 dark:text-gray-400 uppercase">
              Quick Access
            </div>
          )}
          <button
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 text-secondary-700 dark:text-white/90 transition-all duration-200 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-primary-500/40 hover:shadow-glow-sm active:scale-95"
            onClick={() => setRightCollapsed((p) => !p)}
            title={rightCollapsed ? "Expand" : "Collapse"}
          >
            {rightCollapsed ? (
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>

        <ul className="space-y-2">
          {quickItems.map((item) => {
            const selected = isSelected(item.path);
            return (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`group flex w-full items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-left transition-all duration-200 active:scale-98 ${
                    selected
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/30 dark:shadow-primary-500/40 border border-primary-400/50"
                      : "text-secondary-700 dark:text-gray-300 bg-white/20 dark:bg-charcoal-800/30 border border-secondary-200/20 dark:border-primary-500/10 hover:bg-white/40 dark:hover:bg-charcoal-700/50 hover:border-primary-500/30 hover:shadow-glow-sm"
                  }`}
                  title={rightCollapsed ? item.label : undefined}
                >
                  <div
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all ${
                      selected
                        ? "bg-white/20"
                        : "bg-secondary-100/50 dark:bg-charcoal-700/50"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {!rightCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-secondary-200/50 dark:border-primary-500/20 pt-4">
          <button
            onClick={() => navigate("/configuration")}
            className="group flex w-full items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-left text-secondary-700 dark:text-gray-300 bg-white/20 dark:bg-charcoal-800/30 border border-secondary-200/20 dark:border-primary-500/10 transition-all duration-200 hover:bg-white/40 dark:hover:bg-charcoal-700/50 hover:border-primary-500/30 hover:shadow-glow-sm active:scale-98"
            title={rightCollapsed ? "Settings" : undefined}
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-lg bg-secondary-100/50 dark:bg-charcoal-700/50">
              <Settings className="h-4 w-4" />
            </div>
            {!rightCollapsed && (
              <span className="text-sm font-medium">Settings</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
