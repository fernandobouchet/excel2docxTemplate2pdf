const convertDocxToPdf = async (docxFileBlob: File) => {
  const formData = new FormData();
  formData.append("file", docxFileBlob);

  const response = await fetch("/api/file", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(
      `Error al convertir el archivo ${docxFileBlob.name} a formato PDF.`
    );
  }

  const pdfFileBlob = await response.blob();

  const convertedFile = new File(
    [pdfFileBlob],
    docxFileBlob.name.replace(".docx", ".pdf"),
    {
      type: pdfFileBlob.type,
      lastModified: Date.now(),
    }
  );
  return convertedFile;
};

export { convertDocxToPdf };
