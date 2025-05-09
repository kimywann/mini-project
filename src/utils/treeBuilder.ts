import type { ZipEntry } from "./zipParser";

export interface TreeNode {
  name: string;
  isDirectory: boolean;
  children?: TreeNode[]; // 디렉토리일 경우
  content?: string; // 파일일 경우
}

export const buildFileTree = (entries: ZipEntry[]): TreeNode[] => {
  const root: TreeNode[] = [];

  entries.forEach(({ filename, isDirectory }) => {
    const parts = filename.split("/").filter(Boolean);
    let currentLevel = root;

    parts.forEach((part, index) => {
      const existingNode = currentLevel.find((node) => node.name === part);
      if (existingNode) {
        currentLevel = existingNode.children!;
      } else {
        const newNode: TreeNode = {
          name: part,
          isDirectory: index < parts.length - 1 || isDirectory,
          children: [],
        };
        currentLevel.push(newNode);
        currentLevel = newNode.children!;
      }
    });
  });

  return root;
};
