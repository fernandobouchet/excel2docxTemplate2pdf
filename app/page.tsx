import { AlertInstructions } from "@/components/alertInstructions";
import { ConvertForm } from "@/components/form/convertForm";
import { ThemeToggle } from "@/components/themeToggle";

export default function Home() {
  return (
    <main className="flex flex-col py-2 px-4">
      <nav className="flex">
        <ThemeToggle className="ml-auto" />
      </nav>
      <div className="flex flex-col items-center">
        <h1 className="text-center py-4">
          Bienvenido a la herramienta de conversión de archivos.
        </h1>
        <section>
          <p>
            Por favor antes de comenzar lee las <AlertInstructions /> .
          </p>
        </section>
        <section className="flex flex-col items-center pt-4">
          <ConvertForm />
        </section>
      </div>
    </main>
  );
}
