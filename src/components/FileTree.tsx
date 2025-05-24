import styled from "@emotion/styled";

import { useState } from "react";
import { useTab } from "../hooks/useTab";

import type { TreeNode } from "../types/tree";

interface FileTreeProps {
  tree: TreeNode[];
  onFileSelect?: (filePath: string, fileContent: string) => void;
}

const SidebarContainer = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #e4e4e4;
  padding: 1rem;
  overflow-y: auto;
`;

const NodeWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  margin-bottom: 6px;
  cursor: pointer;
`;

const Arrow = styled.span`
  display: inline-block;
  width: 1.4rem;
`;

const Node = styled.div<{ isDirectory: boolean }>`
  font-weight: ${({ isDirectory }) => (isDirectory ? "bold" : "normal")};
`;

const FileTree = ({ tree, onFileSelect }: FileTreeProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const { openTab } = useTab(); // 👈 탭 열기 함수 사용

  const toggle = (path: string) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleFileClick = (node: TreeNode, nodePath: string) => {
    if (!node.isDirectory) {
      openTab({ name: node.name, path: nodePath });
      if (onFileSelect) {
        // node.content가 없으면 빈 문자열로 전달
        onFileSelect(nodePath, node.content || "");
      }
    }
  };

  const renderTree = (nodes: TreeNode[], path = "") =>
    nodes.map((node) => {
      const nodePath = `${path}/${node.name}`;
      const isExpanded = expanded[nodePath];

      return (
        <div key={nodePath}>
          <NodeWrapper
            onClick={() => {
              if (node.isDirectory) {
                toggle(nodePath);
              } else {
                handleFileClick(node, nodePath);
              }
            }}
          >
            {node.isDirectory && <Arrow>{isExpanded ? "▼" : "▶"}</Arrow>}
            {!node.isDirectory && <Arrow />} {/* 빈 자리 맞추기 */}
            <Node isDirectory={node.isDirectory}>{node.name}</Node>
          </NodeWrapper>

          {node.isDirectory && isExpanded && node.children && (
            <div style={{ paddingLeft: "1rem" }}>
              {renderTree(node.children, nodePath)}
            </div>
          )}
        </div>
      );
    });

  return <SidebarContainer>{renderTree(tree)}</SidebarContainer>;
};

export default FileTree;
