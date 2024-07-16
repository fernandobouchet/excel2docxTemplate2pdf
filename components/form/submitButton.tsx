import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props extends React.HTMLProps<"button"> {
  loading: boolean;
}

const SubmitButton = ({ loading }: Props) => {
  return (
    <Button disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Procesando
        </>
      ) : (
        "Iniciar"
      )}
    </Button>
  );
};

export { SubmitButton };
