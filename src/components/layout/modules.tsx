import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  ListOrdered,
  Droplet,
  Wrench,
  Settings,
  Sliders,
} from "lucide-react";

export type NavItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
  badge?: string;
};

export type NavGroup = {
  label: string;
  icon?: React.ReactNode;
  items: NavItem[];
};

export const NAV_MAIN: NavGroup[] = [
  {
    label: "Survey",
    icon: <Droplet className="h-4 w-4" />,
    items: [
      {
        label: "Dashboard",
        path: "/survey/dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />
      },
      {
        label: "Jobs",
        path: "/jobs",
        icon: <Briefcase className="h-4 w-4" />,
        badge: "3"
      },
      {
        label: "Runs",
        path: "/runs",
        icon: <ListOrdered className="h-4 w-4" />
      },
      {
        label: "Wells",
        path: "/wells",
        icon: <Droplet className="h-4 w-4" />
      },
    ],
  },
  {
    label: "Service",
    icon: <Wrench className="h-4 w-4" />,
    items: [
      {
        label: "Dashboard",
        path: "/service/dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />
      },
      {
        label: "SRO",
        path: "/service/sros",
        icon: <Briefcase className="h-4 w-4" />
      },
    ],
  },
];

export const NAV_BOTTOM: NavItem[] = [
  {
    label: "Configuration",
    path: "/configuration",
    icon: <Sliders className="h-4 w-4" />
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <Settings className="h-4 w-4" />
  },
];
