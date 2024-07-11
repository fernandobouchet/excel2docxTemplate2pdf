import readXlsxFile from "read-excel-file";

const getDataFromXlsx = async (excelFile: FileList) => {
  try {
    const data = await readXlsxFile(excelFile[0]);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del archivo:", error);
    throw error;
  }
};

const getXlsxDataToJson = async (excelFile: FileList) => {
  try {
    const rows = await getDataFromXlsx(excelFile);
    const data = rows
      .slice(1)
      .map((row) =>
        Object.fromEntries(rows[0].map((key, index) => [key, row[index]]))
      );

    const jsonData = JSON.stringify(data);
    return jsonData;
  } catch (error) {
    console.error(
      "Error al intentar convertir los datos del archivo a JSON:",
      error
    );
    throw error;
  }
};

export { getXlsxDataToJson };
