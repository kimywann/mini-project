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
