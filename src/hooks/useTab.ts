import { useContext } from "react";
import { TabContext } from "../contexts/TabContext";

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context)
    throw new Error(
      "useTab은 TabProvider 컴포넌트 안에서만 사용할 수 있습니다."
    );
  return context;
};
