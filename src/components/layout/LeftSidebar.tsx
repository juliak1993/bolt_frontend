import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_MAIN, NAV_BOTTOM, NavGroup, NavItem } from "./modules";
import { ChevronDown, LogOut } from "lucide-react";

interface LeftSidebarProps {
  leftCollapsed: boolean;
  leftWidth: number;
  openGroups: Record<string, boolean>;
  toggleGroup: (label: string) => void;
  logout: () => void;
  mobileView?: boolean;
  onNavigate?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  leftCollapsed,
  leftWidth,
  openGroups,
  toggleGroup,
  logout,
  mobileView = false,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  const handleNavigate = (path: string) => {
    navigate(path);
    if (mobileView && onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      className={`${
        mobileView ? "w-full" : "fixed left-0 top-14 sm:top-16 z-30 hidden md:block"
      } h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden transition-all duration-300 ease-in-out`}
      style={mobileView ? {} : { width: leftWidth }}
    >
      <div className="absolute inset-0 bg-white/40 dark:bg-charcoal-900/60 backdrop-blur-2xl border-r border-secondary-200/30 dark:border-primary-500/20 shadow-glass"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent dark:from-primary-500/10"></div>

      <nav className="relative h-full overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-secondary-300 dark:scrollbar-thumb-primary-500/30 scrollbar-track-transparent">
        <ul className="space-y-2">
          {(NAV_MAIN as NavGroup[]).map((group) => {
            const isOpen = !!openGroups[group.label];
            return (
              <li key={group.label}>
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="group flex w-full items-center justify-between rounded-lg sm:rounded-xl p-2 sm:p-2.5 text-left bg-white/30 dark:bg-charcoal-800/50 border border-secondary-200/30 dark:border-primary-500/20 transition-all duration-200 hover:bg-white/50 dark:hover:bg-charcoal-700/70 hover:border-primary-500/40 hover:shadow-glow-sm"
                  title={leftCollapsed && !mobileView ? group.label : undefined}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/30 dark:shadow-primary-500/40">
                      {group.icon}
                    </div>
                    {(!leftCollapsed || mobileView) && (
                      <span className="text-sm font-semibold text-secondary-900 dark:text-white">
                        {group.label}
                      </span>
                    )}
                  </div>
                  {(!leftCollapsed || mobileView) && (
                    <ChevronDown
                      className={`h-4 w-4 text-secondary-400 dark:text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </button>

                {(!leftCollapsed || mobileView) && isOpen && (
                  <div className="mt-1.5 ml-4 sm:ml-6 border-l-2 border-secondary-200/50 dark:border-primary-500/30 pl-2 sm:pl-3 space-y-1">
                    {group.items.map((item) => {
                      const selected = isSelected(item.path);
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavigate(item.path)}
                          className={`flex w-full items-center gap-2.5 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-left transition-all duration-200 ${
                            selected
                              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/30 dark:shadow-primary-500/40 border border-primary-400/50"
                              : "text-secondary-700 dark:text-gray-300 bg-white/20 dark:bg-charcoal-800/30 border border-secondary-200/20 dark:border-primary-500/10 hover:bg-white/40 dark:hover:bg-charcoal-700/50 hover:border-primary-500/30"
                          }`}
                        >
                          <div
                            className={`flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md transition-all ${
                              selected
                                ? "bg-white/20"
                                : "bg-secondary-100/50 dark:bg-charcoal-700/50"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium flex-1">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className={`px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full ${
                                selected
                                  ? "bg-white/20 text-white"
                                  : "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}

          <li className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-secondary-200/50 dark:border-primary-500/20">
            <div className="space-y-1">
              {(NAV_BOTTOM as NavItem[]).map((item) => {
                const selected = isSelected(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`group flex w-full items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-left transition-all duration-200 active:scale-98 ${
                      selected
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/30 dark:shadow-primary-500/40 border border-primary-400/50"
                        : "text-secondary-700 dark:text-gray-300 bg-white/20 dark:bg-charcoal-800/30 border border-secondary-200/20 dark:border-primary-500/10 hover:bg-white/40 dark:hover:bg-charcoal-700/50 hover:border-primary-500/30 hover:shadow-glow-sm"
                    }`}
                    title={leftCollapsed && !mobileView ? item.label : undefined}
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
                    {(!leftCollapsed || mobileView) && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </li>

          <li className="mt-2 pt-2 border-t border-secondary-200/50 dark:border-primary-500/20">
            <button
              onClick={logout}
              className="group flex w-full items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-left text-secondary-700 dark:text-gray-300 bg-white/20 dark:bg-charcoal-800/30 border border-secondary-200/20 dark:border-primary-500/10 transition-all duration-200 hover:bg-primary-50/50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/30 hover:shadow-glow-sm active:scale-98"
              title={leftCollapsed && !mobileView ? "Logout" : undefined}
            >
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-lg bg-secondary-100/50 dark:bg-charcoal-700/50 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 transition-all">
                <LogOut className="h-4 w-4" />
              </div>
              {(!leftCollapsed || mobileView) && (
                <span className="text-sm font-medium">Logout</span>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
