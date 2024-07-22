import { GithubIcon } from "./icons";

const Footer = () => {
  return (
    <footer className="flex items-center w-full h-12 p-4 mt-auto">
      <div className="ml-auto">
        <a
          href="https://github.com/fernandobouchet/excel2docxTemplate2pdf"
          target="_blank"
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
};

export { Footer };
