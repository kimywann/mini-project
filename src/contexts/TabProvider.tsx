import { useState } from "react";
import { TabContext } from "./TabContext";

import type { ReactNode } from "react";
import type { Tab } from "../types/tab";

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTabState] = useState<Tab | null>(null);

  const openTab = (tab: Tab) => {
    setTabs((prev) => {
      const exists = prev.find((t) => t.path === tab.path);
      return exists ? prev : [...prev, tab];
    });
    setActiveTabState(tab);
  };

  const closeTab = (path: string) => {
    setTabs((prev) => prev.filter((t) => t.path !== path));
    if (activeTab?.path === path) {
      const remaining = tabs.filter((t) => t.path !== path);
      setActiveTabState(remaining[remaining.length - 1] || null);
    }
  };

  const setActiveTab = (tab: Tab) => {
    setActiveTabState(tab);
  };

  return (
    <TabContext.Provider
      value={{ tabs, activeTab, openTab, closeTab, setActiveTab }}
    >
      {children}
    </TabContext.Provider>
  );
};
