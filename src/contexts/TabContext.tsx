import { createContext } from "react";
import type { TabContextType } from "../types/tab";

export const TabContext = createContext<TabContextType | undefined>(undefined);
