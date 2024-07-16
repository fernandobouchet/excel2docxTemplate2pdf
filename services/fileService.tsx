import { createDocxFileFromUpdatedTemplate } from "./docxService";
import { convertDocxToPdf } from "./pdfService";

const getAndDownloadAllFiles = async (
  modifiedFiles: {
    report: Uint8Array;
    fileName: string;
  }[],
  toPdf: boolean
) => {
  for (const file of modifiedFiles) {
    try {
      const document = createDocxFileFromUpdatedTemplate(file);
      if (toPdf) {
        const pdfFile = await getPdfFile(document);
        downloadFile(pdfFile);
      } else {
        downloadFile(document);
      }
    } catch (error) {
      console.error(
        `Error creando el archivo ${file.fileName} para su descarga.`,
        error
      );
      throw error;
    }
  }
};

const getPdfFile = async (newFile: File) => {
  try {
    const pdfFile = await convertDocxToPdf(newFile);
    return pdfFile;
  } catch (error) {
    console.error(
      `Error creando el archivo ${newFile.name} en formato PDF.`,
      error
    );
    throw error;
  }
};

const downloadURL = (data: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const downloadFile = (file: File) => {
  const url = URL.createObjectURL(file);
  downloadURL(url, file.name);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};

export { getAndDownloadAllFiles };
