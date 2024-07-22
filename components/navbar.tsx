import { ThemeToggle } from "@/components/themeToggle";

const Navbar = () => {
  return (
    <nav className="flex">
      <ThemeToggle className="ml-auto" />
    </nav>
  );
};

export { Navbar };
