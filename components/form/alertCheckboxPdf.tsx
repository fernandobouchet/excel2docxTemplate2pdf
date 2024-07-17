import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import Link from "next/link";

const AlertCheckboxPdf = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="font-bold underline">
        <Button variant={"link"} className="p-0 h-fit text-inherit">
          requisitos
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Conversión a PDF</AlertDialogTitle>
          <AlertDialogDescription>
            Para poder convertir los archivos a PDF es necesario tener instalado
            el paquete{" "}
            <Link
              href="https://es.libreoffice.org/"
              target="_blank"
              className="font-bold underline"
            >
              libreoffice
            </Link>{" "}
            en el sistema operativo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { AlertCheckboxPdf };
