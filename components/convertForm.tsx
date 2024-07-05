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

const FormSchema = z.object({
  excelFile: z.any(),
  wordFile: z.any(),
});

const ConvertForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      excelFile: "",
      wordFile: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

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
                <Input {...field} type="file" />
              </FormControl>
              <FormDescription>
                Este es el archivo en formato &lsquo;.xlsx &lsquo; de donde se
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
                <Input {...field} type="file" accept=".xlsx" />
              </FormControl>
              <FormDescription>
                Este es el archivo en formato &lsquo;.docx &lsquo; que servirá
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
