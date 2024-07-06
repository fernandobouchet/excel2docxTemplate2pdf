import readXlsxFile from "read-excel-file";

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

export { getExcelDataToJson };
