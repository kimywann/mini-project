export interface ZipEntry {
  filename: string;
  isDirectory: boolean;
}

export const parseZipFile = async (file: File): Promise<ZipEntry[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  const entries: ZipEntry[] = [];

  let i = 0;
  while (i < bytes.length) {
    if (
      bytes[i] === 0x50 &&
      bytes[i + 1] === 0x4b &&
      bytes[i + 2] === 0x03 &&
      bytes[i + 3] === 0x04
    ) {
      const fileNameLength = bytes[i + 26] | (bytes[i + 27] << 8);
      const extraFieldLength = bytes[i + 28] | (bytes[i + 29] << 8);
      const fileNameStart = i + 30;
      const fileNameEnd = fileNameStart + fileNameLength;

      const filename = new TextDecoder().decode(
        bytes.slice(fileNameStart, fileNameEnd)
      );

      // '__MACOSX' 폴더는 제외
      if (filename.startsWith("__MACOSX")) {
        i =
          fileNameEnd +
          extraFieldLength +
          (bytes[i + 18] | (bytes[i + 19] << 8));
        continue;
      }

      entries.push({
        filename,
        isDirectory: filename.endsWith("/"),
      });

      const compressedSize =
        bytes[i + 18] |
        (bytes[i + 19] << 8) |
        (bytes[i + 20] << 16) |
        (bytes[i + 21] << 24);
      i = fileNameEnd + extraFieldLength + compressedSize;
    } else {
      i++;
    }
  }

  return entries;
};
