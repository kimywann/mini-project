import type { ZipEntry } from "../types/zip";
import type { TreeNode } from "../types/tree";

export const buildFileTree = (entries: ZipEntry[]): TreeNode[] => {
  const root: TreeNode[] = [];

  entries.forEach(({ filename, isDirectory, content }) => {
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
          content: index === parts.length - 1 ? content : undefined,
        };
        currentLevel.push(newNode);
        currentLevel = newNode.children!;
      }
    });
  });

  return root;
};
