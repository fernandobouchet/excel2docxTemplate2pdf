"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./formSchema";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { getXlsxDataToJson } from "@/services/xlxsService";
import { getFilledTemplates } from "@/services/docxService";
import { getAndDownloadAllFiles } from "@/services/fileService";
import { CheckboxPdfConfirmation } from "@/components/form/checkboxPdfConfirmation";
import { InputXlxsFile } from "./inputXlxsFile";
import { InputDocxTemplate } from "./inputDocxTemplate";
import { LoadingToast } from "../loadingToast";
import { SubmitButton } from "./submitButton";
import { useState } from "react";

const ConvertForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pdfConfirmation: true,
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      let xlxsData = data.excelFile;
      let docxTemplate = data.wordFile[0];
      let convertToPdf = data.pdfConfirmation;

      const excelData: string = await LoadingToast(
        "excelData",
        getXlsxDataToJson(xlxsData),
        `Obteniendo los datos del archivo: "${xlxsData[0].name}"...`,
        `Se obtuvieron correctamente los datos del archivo: "${xlxsData[0].name}"...`,
        `Error al obtener los datos del archivo: "${xlxsData[0].name}".`
      );

      const modifiedFiles: {
        report: Uint8Array;
        fileName: string;
      }[] = await LoadingToast(
        "modifiedFiles",
        getFilledTemplates(docxTemplate, excelData),
        `Creando los nuevos documentos con los datos obtenidos en ${xlxsData[0].name} utilizando la plantilla ${docxTemplate.name}...`,
        "Los nuevos documentos se han creado exitosamente.",
        `Error al crear los nuevos documentos con los datos obtenidos en ${xlxsData[0].name} utilizando la plantilla ${docxTemplate.name}.`
      );

      const files = await LoadingToast(
        "files",
        getAndDownloadAllFiles(modifiedFiles, convertToPdf),
        `Convirtiendo y descargando cada uno de los archivos en formato ${
          convertToPdf ? "PDF" : "DOCX"
        }...`,
        "Los archivos fueron convertidos y descargados exitosamente!",
        `Error al convertir y descargar los archivos en formato ${
          convertToPdf ? "PDF" : "DOCX"
        }.`
      );

      toast.success(
        `Operación exitosa! Se convirtieron en total ${modifiedFiles.length} archivos!`
      );
    } catch (error) {
      toast.error("Hubo un error, por favor intentelo nuevamente.");
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-4/5 space-y-6"
      >
        <InputXlxsFile form={form} />
        <InputDocxTemplate form={form} />
        <CheckboxPdfConfirmation form={form} />
        <SubmitButton type="submit" loading={loading} />
      </form>
    </Form>
  );
};

export { ConvertForm };
