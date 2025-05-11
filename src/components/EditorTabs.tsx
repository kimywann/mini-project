import { useTab } from "../hooks/useTab";
import styled from "@emotion/styled";

const TabBar = styled.div`
  display: flex;
  background-color: rgb(245, 245, 245);
  border-bottom: 1px solid #ddd;
  gap: 0.1rem;
  min-height: 40px;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 0.6rem 0.8rem;
  background-color: ${({ active }) => (active ? "#ffffff" : "#e0e0e0")};
  border-top: 2px solid ${({ active }) => (active ? "#7736f8" : "transparent")};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
`;

const EditorTabs = () => {
  const { tabs, activeTab, setActiveTab, closeTab } = useTab();

  return (
    <TabBar>
      {tabs.map((tab) => (
        <Tab
          key={tab.path}
          active={tab.path === activeTab?.path}
          onClick={() => setActiveTab(tab)}
        >
          {tab.name}
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.path);
            }}
          >
            ×
          </CloseButton>
        </Tab>
      ))}
    </TabBar>
  );
};

export default EditorTabs;
