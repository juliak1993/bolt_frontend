import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  Sun,
  Moon,
  Settings,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

interface HeaderProps {
  leftCollapsed: boolean;
  setLeftCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
  setMobileLeftOpen: (value: boolean) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  logout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  leftCollapsed,
  setLeftCollapsed,
  setMobileLeftOpen,
  darkMode,
  setDarkMode,
  userMenuOpen,
  setUserMenuOpen,
  logout,
}) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16">
      <div className="absolute inset-0 bg-white/40 dark:bg-charcoal-900/60 backdrop-blur-2xl border-b border-secondary-200/30 dark:border-primary-500/20 shadow-glass"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 dark:via-primary-500/10"></div>

      <div className="relative h-full px-3 sm:px-6">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="inline-flex md:hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 text-secondary-700 dark:text-white/90 transition-all duration-200 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-primary-500/40 hover:shadow-glow-sm active:scale-95"
              onClick={() => setMobileLeftOpen(true)}
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <button
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 text-secondary-700 dark:text-white/90 transition-all duration-200 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-primary-500/40 hover:shadow-glow-sm active:scale-95"
              onClick={() => setLeftCollapsed((p) => !p)}
            >
              {leftCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-gradient-to-br dark:from-primary-600 dark:via-primary-500 dark:to-primary-700 shadow-lg shadow-primary-500/20 dark:shadow-primary-500/30 ring-1 ring-primary-500/20 dark:ring-primary-400/30">
                <img
                  src="/TASK_LOGO_PNG.png"
                  alt="TASK"
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm sm:text-base font-bold text-secondary-900 dark:text-white tracking-tight">
                  TASK Survey
                </h1>
                <p className="text-xs font-medium text-secondary-500 dark:text-gray-400">
                  Premium ERP Dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 text-secondary-700 dark:text-white/90 transition-all duration-200 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-primary-500/40 hover:shadow-glow-sm active:scale-95">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600 ring-2 ring-white dark:ring-charcoal-900 shadow-glow-sm"></span>
              </span>
            </button>

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 text-secondary-700 dark:text-amber-400 transition-all duration-200 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-amber-500/40 dark:hover:border-amber-500/40 hover:shadow-glow-sm active:scale-95"
            >
              <div
                className={`transition-transform duration-500 ${
                  darkMode ? "rotate-180" : "rotate-0"
                }`}
              >
                {darkMode ? <Moon className="h-4 w-4 sm:h-5 sm:w-5" /> : <Sun className="h-4 w-4 sm:h-5 sm:w-5" />}
              </div>
            </button>

            <button
              onClick={() => navigate("/configuration")}
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 text-secondary-700 dark:text-white/90 transition-all duration-200 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-primary-500/40 hover:shadow-glow-sm hover:rotate-90 active:scale-95"
            >
              <Settings className="h-5 w-5" />
            </button>

            <div className="hidden sm:block h-6 sm:h-8 w-px bg-gradient-to-b from-transparent via-secondary-300/50 dark:via-primary-500/30 to-transparent mx-1"></div>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((p) => !p)}
                className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 px-2 sm:px-3 py-1.5 sm:py-2 transition-all duration-200 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-primary-500/40 hover:shadow-glow-sm active:scale-98"
              >
                <div className="relative">
                  <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl overflow-hidden border-2 border-primary-500/30 dark:border-primary-500/50 shadow-md bg-gradient-to-br from-primary-500 to-primary-700">
                    <img
                      src="https://ui-avatars.com/api/?name=User&background=ec1b24&color=fff&size=128"
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2 w-2 sm:h-3 sm:w-3 rounded-full border-2 border-white dark:border-charcoal-900 bg-emerald-500 shadow-glow-sm"></span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-secondary-900 dark:text-white">
                    User
                  </div>
                  <div className="text-xs text-secondary-500 dark:text-gray-400">
                    Administrator
                  </div>
                </div>
                <ChevronDown
                  className={`hidden md:block h-4 w-4 text-secondary-400 dark:text-gray-500 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-12 sm:top-14 w-56 sm:w-64 z-50 overflow-hidden rounded-xl sm:rounded-2xl border border-secondary-200/50 dark:border-primary-500/30 bg-white/95 dark:bg-charcoal-800/95 backdrop-blur-2xl shadow-glass">
                    <div className="border-b border-secondary-100/50 dark:border-primary-500/20 bg-gradient-to-br from-secondary-50/50 to-white/30 dark:from-charcoal-900/80 dark:to-charcoal-800/60 p-3 sm:p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden border-2 border-primary-500/30 dark:border-primary-500/50 shadow-md bg-gradient-to-br from-primary-500 to-primary-700">
                          <img
                            src="https://ui-avatars.com/api/?name=User&background=ec1b24&color=fff&size=128"
                            alt="User"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-secondary-900 dark:text-white">
                            User
                          </div>
                          <div className="text-xs text-secondary-500 dark:text-gray-400">
                            user@example.com
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        className="flex w-full items-center gap-3 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm font-medium text-secondary-700 dark:text-gray-300 transition-all duration-200 hover:bg-secondary-100/80 dark:hover:bg-charcoal-700/80 active:scale-98"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/settings");
                        }}
                      >
                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-secondary-100 dark:bg-charcoal-700/80">
                          <User className="h-4 w-4 text-secondary-600 dark:text-gray-400" />
                        </div>
                        <span>Profile Settings</span>
                      </button>
                      <button
                        className="flex w-full items-center gap-3 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm font-medium text-secondary-700 dark:text-gray-300 transition-all duration-200 hover:bg-secondary-100/80 dark:hover:bg-charcoal-700/80 active:scale-98"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/configuration");
                        }}
                      >
                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-secondary-100 dark:bg-charcoal-700/80">
                          <Settings className="h-4 w-4 text-secondary-600 dark:text-gray-400" />
                        </div>
                        <span>Settings & Privacy</span>
                      </button>
                      <button
                        className="flex w-full items-center gap-3 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm font-medium text-primary-600 dark:text-primary-400 transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:shadow-glow-sm active:scale-98"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                      >
                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/30">
                          <LogOut className="h-4 w-4" />
                        </div>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
