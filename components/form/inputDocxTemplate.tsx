"use client";

import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  form: UseFormReturn<
    {
      excelFile?: any;
      wordFile?: any;
      pdfConfirmation: boolean;
    },
    any,
    undefined
  >;
}
const InputDocxTemplate = ({ form }: Props) => {
  const wordFileRef = form.register("wordFile");

  return (
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
            Este es el archivo en formato &lsquo;*.docx &lsquo; que servirá de
            plantilla donde se colocarán los datos.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { InputDocxTemplate };
