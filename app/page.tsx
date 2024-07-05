import { ConvertForm } from "@/components/convertForm";
import { ThemeToggle } from "@/components/themeToggle";

export default function Home() {
  return (
    <main>
      <ThemeToggle />
      <h1>Bienvenido a la herramienta de conversión de archivos.</h1>
      <section>
        <ConvertForm />
      </section>
    </main>
  );
}
