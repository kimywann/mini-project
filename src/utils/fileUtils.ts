export function isEditableFile(filePath?: string): boolean {
  if (!filePath || filePath.trim() === "") return false;

  const editableExtensions = [
    ".js",
    ".ts",
    ".json",
    ".txt",
    ".md",
    ".html",
    ".css",
  ];
  return editableExtensions.some((ext) => filePath.endsWith(ext));
}
