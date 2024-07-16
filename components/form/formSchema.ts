import { z } from "zod";

const FormSchema = z.object({
  excelFile:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .refine(
            (files) => files?.length > 0,
            "Se requiere el archivo de datos en formato *.xlsx."
          )
          .refine((files) => {
            const fileExtension = files[0]?.name.split(".").pop();
            return fileExtension && fileExtension === "xlsx";
          }, "El archivo debe tener el formato indicado: *.xlsx."),
  wordFile:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .refine(
            (files) => files?.length > 0,
            "Se requiere el archivo de plantilla en formato *.docx."
          )
          .refine((files) => {
            const fileExtension = files[0]?.name.split(".").pop();
            return fileExtension && fileExtension === "docx";
          }, "El archivo debe tener el formato indicado: *.docx."),
  pdfConfirmation: z.boolean().default(true),
});

export { FormSchema };
