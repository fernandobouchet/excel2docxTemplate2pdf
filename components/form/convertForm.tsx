"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./formSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { getXlsxDataToJson } from "@/services/xlxsService";
import { getFilledTemplates } from "@/services/docxService";
import { getAndDownloadAllFiles } from "@/services/fileService";
import { CheckboxPdfConfirmation } from "@/components/form/checkboxPdfConfirmation";
import { InputXlxsFile } from "./inputXlxsFile";
import { InputDocxTemplate } from "./inputDocxTemplate";

const ConvertForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pdfConfirmation: true,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      let convertToPdf = data.pdfConfirmation;

      const excelData = await getXlsxDataToJson(data.excelFile);
      const modifiedFiles = await getFilledTemplates(
        data.wordFile[0],
        excelData
      );

      const files = await getAndDownloadAllFiles(modifiedFiles, convertToPdf);

      toast.success(
        `Se convirtieron ${modifiedFiles.length} archivos exitosamente!.`
      );
    } catch (error) {
      toast.error("Hubo un error, por favor intentelo nuevamente.");
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-2/3 space-y-6"
      >
        <InputXlxsFile form={form} />
        <InputDocxTemplate form={form} />
        <CheckboxPdfConfirmation form={form} />
        <Button type="submit">Iniciar</Button>
      </form>
    </Form>
  );
};

export { ConvertForm };
