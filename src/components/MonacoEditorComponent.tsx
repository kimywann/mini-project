import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styled from "@emotion/styled";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #1e1e1e;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const getLanguageFromExtension = (filePath: string): string => {
  const ext = filePath.split(".").pop()?.toLowerCase();
  console.log("Detected file extension:", ext); // 파일 확장자 로그 출력
  switch (ext) {
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "json":
      return "json";
    case "html":
      return "html";
    case "css":
      return "css";
    case "md":
      return "markdown";
    case "txt":
      return "plaintext";
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return "image";
    default:
      return "plaintext";
  }
};

interface MonacoEditorComponentProps {
  filePath: string;
  fileContent: string;
}

const MonacoEditorComponent = ({
  filePath,
  fileContent,
}: MonacoEditorComponentProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (!editorRef.current || !fileContent) return;

    const language = getLanguageFromExtension(filePath);

    if (language === "image") {
      // 이미지 파일인 경우 에디터를 숨기고 이미지를 표시
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
        editorInstanceRef.current = null;
      }
      return;
    }

    if (!editorInstanceRef.current) {
      editorInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: fileContent,
        language,
        theme: "vs-dark",
        automaticLayout: true,
      });
    } else {
      const model = monaco.editor.createModel(fileContent, language);
      editorInstanceRef.current.setModel(model);
    }

    return () => {
      editorInstanceRef.current?.dispose();
      editorInstanceRef.current = null;
    };
  }, [fileContent, filePath]);

  if (!filePath) return null; // filePath가 없으면 컴포넌트 렌더링하지 않음

  const language = getLanguageFromExtension(filePath);
  if (language === "image") {
    return (
      <ImageContainer>
        <ImagePreview
          src={`data:image/${filePath.split(".").pop()};base64,${fileContent}`}
          alt={filePath}
        />
      </ImageContainer>
    );
  }

  return <div ref={editorRef} style={{ height: "100%", width: "100%" }} />;
};

export default MonacoEditorComponent;
