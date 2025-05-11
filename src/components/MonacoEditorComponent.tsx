import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

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
    default:
      return "plaintext";
  }
};

const MonacoEditorComponent = ({ filePath }: { filePath: string }) => {
  const [fileContent, setFileContent] = useState<string>("");
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (!filePath) return;

    const loadFileContent = async () => {
      console.log("Fetching file from:", filePath);
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load file: ${response.statusText}`);
        }
        const text = await response.text();
        console.log("File content loaded:", text); // 파일 내용 확인
        setFileContent(text);
      } catch (error) {
        console.error("파일 로딩 실패:", error);
        setFileContent("// 파일을 불러오지 못했습니다.");
      }
    };

    loadFileContent();
  }, [filePath]);

  useEffect(() => {
    if (!editorRef.current || !fileContent) return;

    const language = getLanguageFromExtension(filePath);

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

  return <div ref={editorRef} style={{ height: "100%", width: "100%" }} />;
};

export default MonacoEditorComponent;
