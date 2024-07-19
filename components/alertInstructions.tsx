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
import { Button } from "@/components/ui/button";

const AlertInstructions = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="font-bold underline">
        <Button
          variant={"link"}
          className="p-0 h-fit text-inherit text-md font-semibold"
        >
          instrucciones
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Instrucciones</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <ol className="list-inside list-decimal flex flex-col gap-4 py-4">
                <li>
                  Selecciona el archivo XLSX que contiene los datos. Solo se
                  obtendrán los datos de la primera hoja del archivo. La primera
                  fila de esta hoja se utilizará como nombres de columnas
                  (claves), y cada fila subsiguiente representará un conjunto de
                  datos correspondiente a esas claves (valores), para asignar un
                  nombre específico al archivo resultante debe haber una clave
                  llamada &quot;codigo&quot; y/o &quot;valor&quot; en la hoja.
                  El nombre del archivo resultante será en el formato:
                  &quot;codigo-nombre.docx/pdf&quot;.
                </li>
                <li>
                  Selecciona el archivo DOCX que servirá como plantilla para
                  volcar los datos. Asegúrate de que los marcadores de posición
                  para los datos obtenidos en el paso anterior estén etiquetados
                  entre llaves: {`{{claveAReemplazar}}`}.
                </li>
                <li>
                  Puedes optar por convertir los archivos resultantes a formato
                  PDF. De lo contrario serán descargados en el formato de la
                  plantilla: (&quot;.docx&quot;).
                </li>
                <li>
                  Para iniciar la conversión, haz clic en el botón
                  &quot;Iniciar&quot;. Los archivos convertidos se descargarán
                  automáticamente en tu carpeta de descargas (deberás otorgar
                  permiso la primera vez).
                </li>
              </ol>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>De acuerdo</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { AlertInstructions };
