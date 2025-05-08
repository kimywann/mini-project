import styled from "@emotion/styled";

const TabBar = styled.div`
  display: flex;
  background-color: rgb(245, 245, 245);
  border-bottom: 1px solid #ddd;
  gap: 0.1rem;
`;

const Tab = styled.div`
  padding: 0.6rem 0.8rem;
  background-color: rgb(224, 224, 224);
  font-size: 1rem;
`;

const EditorTabs = () => {
  return (
    <TabBar>
      <Tab>main.py</Tab>
      <Tab>input.txt</Tab>
    </TabBar>
  );
};

export default EditorTabs;
