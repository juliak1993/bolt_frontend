import React, { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NAV_MAIN, NavGroup } from "./modules";
import { Header } from "./Header";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { Zap, Clock, Star, HelpCircle } from "lucide-react";

const LEFT_W = 280;
const LEFT_W_COLLAPSED = 80;
const RIGHT_W = 260;
const RIGHT_W_COLLAPSED = 72;

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(true);
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = React.useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    (NAV_MAIN as NavGroup[]).forEach((g) => (initial[g.label] = false));
    return initial;
  });

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  const quickItems = useMemo(
    () => [
      {
        label: "Quick Actions",
        path: "/jobs",
        icon: <Zap className="h-4 w-4" />,
      },
      {
        label: "Recent",
        path: "/jobs",
        icon: <Clock className="h-4 w-4" />,
      },
      {
        label: "Pinned",
        path: "/jobs",
        icon: <Star className="h-4 w-4" />,
      },
      {
        label: "Help",
        path: "/configuration",
        icon: <HelpCircle className="h-4 w-4" />,
      },
    ],
    []
  );

  const leftWidth = leftCollapsed ? LEFT_W_COLLAPSED : LEFT_W;
  const rightWidth = rightCollapsed ? RIGHT_W_COLLAPSED : RIGHT_W;

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-secondary-100 dark:from-charcoal-950 dark:via-charcoal-900 dark:to-charcoal-800 transition-colors duration-300">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/5 via-transparent to-transparent dark:from-primary-600/20 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-400/5 via-transparent to-transparent dark:from-primary-700/15 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-[0.02] dark:opacity-[0.05] pointer-events-none"></div>

      <Header
        leftCollapsed={leftCollapsed}
        setLeftCollapsed={setLeftCollapsed}
        setMobileLeftOpen={setMobileLeftOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        logout={logout}
      />

      <LeftSidebar
        leftCollapsed={leftCollapsed}
        leftWidth={leftWidth}
        openGroups={openGroups}
        toggleGroup={toggleGroup}
        logout={logout}
      />

      <RightSidebar
        rightCollapsed={rightCollapsed}
        setRightCollapsed={setRightCollapsed}
        rightWidth={rightWidth}
        quickItems={quickItems}
      />

      <main
        className="pt-14 sm:pt-16 transition-all duration-300 ease-in-out relative md:pl-[280px] md:pr-[260px]"
        style={{
          paddingLeft: window.innerWidth >= 768 ? leftWidth : 0,
          paddingRight: window.innerWidth >= 768 ? rightWidth : 0,
        }}
      >
        <div className="px-3 sm:px-6 py-4 sm:py-6">
          <Outlet />
        </div>
      </main>

      {mobileLeftOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileLeftOpen(false)}
          ></div>
          <div className="fixed left-0 top-14 sm:top-16 z-50 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-72 md:hidden">
            <LeftSidebar
              leftCollapsed={false}
              leftWidth={280}
              openGroups={openGroups}
              toggleGroup={toggleGroup}
              logout={logout}
              mobileView={true}
              onNavigate={() => setMobileLeftOpen(false)}
            />
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 767px) {
          main {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(200, 200, 200, 0.5);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(200, 200, 200, 0.7);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(236, 27, 36, 0.3);
          border-radius: 3px;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 27, 36, 0.5);
        }
      `}</style>
    </div>
  );
};
