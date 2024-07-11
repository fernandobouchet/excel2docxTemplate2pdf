const getAndDownloadAllFiles = (
  modifiedFiles: {
    report: Uint8Array;
    fileName: string;
  }[]
) => {
  for (const file of modifiedFiles) {
    try {
      saveDataToDocxFile(file.report, file.fileName);
    } catch (error) {
      console.error(
        `Error creando el archivo ${file.fileName} para su descarga:`,
        error
      );
      throw error;
    }
  }
};

const saveDataToDocxFile = (
  data: string | Blob | ArrayBuffer | ArrayBufferView,
  fileName: string
) => {
  try {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (error) {
    console.error(`Error creando el archivo ${fileName}:`, error);
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

export { getAndDownloadAllFiles };
