import readXlsxFile from "read-excel-file";
import createReport from "docx-templates";

const getDataFromExcel = async (excelFile: FileList) => {
  const data = await readXlsxFile(excelFile[0]);
  return data;
};

const getExcelDataToJson = async (excelFile: FileList) => {
  const rows = await getDataFromExcel(excelFile);
  const data = rows
    .slice(1)
    .map((row) =>
      Object.fromEntries(rows[0].map((key, index) => [key, row[index]]))
    );

  const jsonData = JSON.stringify(data);

  return jsonData;
};

const readFileIntoArrayBuffer = (fileBlob: Blob): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.readAsArrayBuffer(fileBlob);
  });

const onTemplateChosen = async (file: File, templateData: string) => {
  try {
    const parsedData = JSON.parse(templateData);
    const template = await readFileIntoArrayBuffer(file);

    for (const item of parsedData) {
      try {
        const report = await createReport({
          template,
          data: item,
          cmdDelimiter: ["{{", "}}"],
        });
        saveDataToFile(
          report,
          `${item.Codigo}-${item.Nombre}.docx`,
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
      } catch (reportError) {
        console.error(
          `Error creating report for ${item.Codigo}-${item.Nombre}:`,
          reportError
        );
      }
    }
  } catch (error) {
    console.error("Error processing template:", error);
  }
};

const saveDataToFile = (
  data: string | Blob | ArrayBuffer | ArrayBufferView,
  fileName: string,
  mimeType: string
) => {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  downloadURL(url, fileName);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};

const downloadURL = (data: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export { getExcelDataToJson, onTemplateChosen };
