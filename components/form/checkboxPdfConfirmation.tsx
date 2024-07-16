"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

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

const CheckboxPdfConfirmation = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="pdfConfirmation"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              defaultChecked
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Convertir los archivos a pdf</FormLabel>
            <FormDescription>
              Para convertir los archivos a formato pdf debes tener instalado en
              tu dispositivo libreoffice.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export { CheckboxPdfConfirmation };
