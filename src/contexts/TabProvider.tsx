import { useState } from "react";
import type { ReactNode } from "react";
import { TabContext } from "./TabContext";

export interface Tab {
  name: string;
  path: string;
}

export interface TabContextType {
  tabs: Tab[];
  activeTab: Tab | null;
  setActiveTab: (tab: Tab) => void;
  openTab: (tab: Tab) => void;
  closeTab: (path: string) => void;
}

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
