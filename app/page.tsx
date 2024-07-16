import { ConvertForm } from "@/components/form/convertForm";
import { ThemeToggle } from "@/components/themeToggle";

export default function Home() {
  return (
    <main className="flex flex-col">
      <nav className="flex">
        <ThemeToggle className="ml-auto" />
      </nav>
      <div className="flex flex-col items-center">
        <h1>Bienvenido a la herramienta de conversión de archivos.</h1>
        <section className="flex flex-col items-center py-8">
          <ConvertForm />
        </section>
      </div>
    </main>
  );
}
