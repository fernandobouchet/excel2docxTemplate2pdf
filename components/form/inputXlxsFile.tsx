import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

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

const InputXlxsFile = ({ form }: Props) => {
  const excelFileRef = form.register("excelFile");

  return (
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
  );
};

export { InputXlxsFile };
