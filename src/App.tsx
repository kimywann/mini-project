import "./App.css";

import Header from "./components/Header";
import FileUploadHandler from "./components/FileUploadHandler";

import FileTree from "./components/FileTree";
import EditorTabs from "./components/EditorTabs";
import Editor from "./components/Editor";

function App() {
  return (
    <div className="app-container">
      <Header />
      <FileUploadHandler />
      <div className="main-content">
        <div className="file-tree">
          <FileTree />
        </div>
        <div className="editor-section">
          <EditorTabs />
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default App;
