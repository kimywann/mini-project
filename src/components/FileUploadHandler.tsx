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
`;

const UploadLabel = styled.label`
  font-weight: bold;
  color: rgb(114, 114, 114);
  cursor: pointer;
  margin-bottom: 5px;
  padding: 4px;
`;

const UploadInput = styled.input`
  display: block;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DownloadSection = styled.div`
  border: 1px solid rgb(220, 220, 220);
  padding: 1rem;
  background-color: #f9f9f9;
  text-align: center;
`;

const DownloadButton = styled.button`
  background-color: #7736f8;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.8rem;
`;

interface FileUploadHandlerProps {
  onZipUpload: (file: File) => void;
}

const FileUploadHandler: React.FC<FileUploadHandlerProps> = ({
  onZipUpload,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".zip")) {
      onZipUpload(file);
    }
  };

  return (
    <Wrapper>
      <UploadContainer>
        <UploadLabel htmlFor="zip-upload">
          <UploadInput
            id="zip-upload"
            type="file"
            accept=".zip"
            onChange={handleChange}
          />
        </UploadLabel>
      </UploadContainer>

      <DownloadSection>
        <p>
          수정된 파일을 모두 저장한 후, 아래 버튼을 눌러 ZIP 파일로 다운로드할
          수 있습니다.
        </p>
        <DownloadButton>ZIP 파일 다운로드</DownloadButton>
      </DownloadSection>
    </Wrapper>
  );
};

export default FileUploadHandler;
