import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { LibreOfficeFileConverter } from "libreoffice-file-converter";
import fs from "fs/promises";
import fsSync from "fs";

const inputDir = join(process.cwd(), "tmp");

if (!fsSync.existsSync(inputDir)) {
  fsSync.mkdirSync(inputDir);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    let pdfPath: string;

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          status: "error",
          message: "El tipo de archivo a convertir a PDF es invalido.",
        },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const inputPath = join(inputDir, file.name);
    await fs.writeFile(inputPath, buffer);

    const libreOfficeFileConverter = new LibreOfficeFileConverter({
      childProcessOptions: {
        timeout: 60 * 1000,
      },
    });

    await libreOfficeFileConverter.convertFile(inputPath, inputDir, "pdf");

    pdfPath = inputPath.replace(".docx", ".pdf");

    const pdfBuffer = await fs.readFile(pdfPath);

    await fs.unlink(inputPath);
    await fs.unlink(pdfPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: error,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
