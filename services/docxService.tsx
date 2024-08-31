import createReport from "docx-templates";

const getTemplateIntoArrayBuffer = async (file: File): Promise<Uint8Array> => {
  try {
    const reader = new FileReader();

    return await new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new Error("Error al obtener los datos del plantilla."));
      };
      reader.onload = () => {
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      };
      reader.readAsArrayBuffer(file);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateTemplate = async (template: Uint8Array, fileData: any) => {
  const fileName =
    fileData.Codigo && fileData.Nombre
      ? `${fileData.Codigo}-${fileData.Nombre}.docx`
      : "Codigo-Nombre.docx";
  try {
    const report = await createReport({
      template,
      data: fileData,
      cmdDelimiter: ["{{", "}}"],
      processLineBreaksAsNewText: true,
    });

    return {
      report,
      fileName: fileName,
    };
  } catch (error) {
    console.error(
      `Error modificando los datos de la plantilla ${
        fileName.split(".docx")[0]
      }:`,
      error
    );
    throw error;
  }
};

const getFilledTemplates = async (file: File, fileData: string) => {
  try {
    const parsedData = JSON.parse(fileData);
    const template = await getTemplateIntoArrayBuffer(file);
    const generatedFiles = [];

    for (const fileData of parsedData) {
      const updatedFile = await updateTemplate(template, fileData);
      generatedFiles.push(updatedFile);
    }
    return generatedFiles;
  } catch (error) {
    console.error("Error al obtener las plantillas modificadas:", error);
    throw error;
  }
};

const createDocxFileFromUpdatedTemplate = (file: {
  report: Uint8Array;
  fileName: string;
}) => {
  const newFile = new File([file.report], file.fileName, {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    lastModified: Date.now(),
  });

  return newFile;
};

export { getFilledTemplates, createDocxFileFromUpdatedTemplate };
