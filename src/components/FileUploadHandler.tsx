import styled from "@emotion/styled";

const UploadContainer = styled.div`
  background-color: rgb(250, 250, 250);
  border: 2px dashed rgb(192, 192, 192);
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  margin: 1rem;
  transition: background-color 0.2s ease;
  flex-direction: column;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const UploadLabel = styled.button`
  font-weight: bold;
  color: rgb(114, 114, 114);
  cursor: pointer;
  margin-bottom: 5px;
  padding: 4px;
`;

const UploadInput = styled.input`
  display: none;
`;

const FileUploadHandler = () => {
  return (
    <UploadContainer>
      <UploadLabel>파일 선택</UploadLabel>
      <p>또는 드래그해서 파일을 업로드 하세요</p>
      <UploadInput id="zip-upload" type="file" accept=".zip" />
    </UploadContainer>
  );
};

export default FileUploadHandler;
