"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getExcelDataToJson, onTemplateChosen } from "@/lib/functions";

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
});

const ConvertForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const excelData = await getExcelDataToJson(data.excelFile);
      onTemplateChosen(data.wordFile[0], excelData);
    } catch (error) {
      console.log(error);
    }
  }

  const excelFileRef = form.register("excelFile");
  const wordFileRef = form.register("wordFile");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="excelFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datos</FormLabel>
              <FormControl>
                <Input
                  {...excelFileRef}
                  type="file"
                  accept=".xlsx"
                  onChange={(e) => {
                    field.onChange(e.target?.files?.[0] ?? undefined);
                  }}
                  className="input_file"
                />
              </FormControl>
              <FormDescription>
                Este es el archivo en formato &lsquo;*.xlsx &lsquo; de donde se
                obtendrán los datos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wordFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plantilla</FormLabel>
              <FormControl>
                <Input
                  {...wordFileRef}
                  type="file"
                  accept=".docx"
                  onChange={(e) => {
                    field.onChange(e.target?.files?.[0] ?? undefined);
                  }}
                  className="input_file"
                />
              </FormControl>
              <FormDescription>
                Este es el archivo en formato &lsquo;*.docx &lsquo; que servirá
                de plantilla donde se colocarán los datos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Inciar</Button>
      </form>
    </Form>
  );
};

export { ConvertForm };
