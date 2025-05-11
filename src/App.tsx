import "./App.css";

import { useState } from "react";

import Header from "./components/Header";
import FileUploadHandler from "./components/FileUploadHandler";
import FileTree from "./components/FileTree";
import EditorTabs from "./components/EditorTabs";
import MonacoEditorComponent from "./components/MonacoEditorComponent";

import type { TreeNode } from "./types/tree";

import { parseZipFile } from "./utils/zipParser";
import { buildFileTree } from "./utils/treeBuilder";

function App() {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [filePath, setFilePath] = useState<string>("");

  const handleZipUpload = async (file: File) => {
    const entries = await parseZipFile(file);
    const treeData = buildFileTree(entries);
    setTree(treeData);
  };

  const handleFileSelect = (filePath: string) => {
    setFilePath(filePath); // fileContent는 필요하지 않으므로 제거
  };

  return (
    <div className="app-container">
      <Header />
      <FileUploadHandler onZipUpload={handleZipUpload} />
      <div className="main-content">
        <div className="file-tree">
          <FileTree tree={tree} onFileSelect={handleFileSelect} />
        </div>
        <div className="editor-section">
          <EditorTabs />
          <MonacoEditorComponent filePath={filePath} />
        </div>
      </div>
    </div>
  );
}

export default App;
