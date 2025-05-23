import type { ZipEntry } from "../types/zip";

const isImageFile = (filename: string): boolean => {
  const ext = filename.split(".").pop()?.toLowerCase();
  return ["png", "jpg", "jpeg", "gif", "svg"].includes(ext || "");
};

function arrayBufferToBase64(buffer: Uint8Array): Promise<string> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([buffer]);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // data:image/png;base64,xxxx
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
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

      const compressedSize =
        bytes[i + 18] |
        (bytes[i + 19] << 8) |
        (bytes[i + 20] << 16) |
        (bytes[i + 21] << 24);

      const contentStart = fileNameEnd + extraFieldLength;
      const contentEnd = contentStart + compressedSize;

      // 파일 내용 추출
      let content: string | undefined;
      if (!filename.endsWith("/")) {
        const contentBytes = bytes.slice(contentStart, contentEnd);
        if (isImageFile(filename)) {
          content = await arrayBufferToBase64(contentBytes);
        } else {
          content = new TextDecoder().decode(contentBytes);
        }
      }

      entries.push({
        filename,
        isDirectory: filename.endsWith("/"),
        content,
      });

      i = contentEnd;
    } else {
      i++;
    }
  }

  return entries;
};
