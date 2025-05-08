import styled from "@emotion/styled";

const SidebarContainer = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
`;

const FileTree = () => {
  return (
    <>
      <SidebarContainer>
        <div>FileTree</div>
      </SidebarContainer>
    </>
  );
};

export default FileTree;
