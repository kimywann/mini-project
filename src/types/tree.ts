export interface TreeNode {
  name: string;
  isDirectory: boolean;
  children?: TreeNode[];
  content?: string;
}
