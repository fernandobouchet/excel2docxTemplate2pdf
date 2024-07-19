import { NextRequest, NextResponse } from "next/server";
import { Chromiumly, LibreOffice } from "chromiumly";

Chromiumly.configure({
  endpoint: process.env.GOTENBERG_ENDPOINT!,
  username: process.env.GOTENBERG_USER!,
  password: process.env.GOTENBERG_PASS!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

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

    const inputFileBuffer = Buffer.from(await file.arrayBuffer());

    const outputFileBuffer = await LibreOffice.convert({
      files: [{ data: inputFileBuffer, ext: "pdb" }],
    });

    return new NextResponse(outputFileBuffer, {
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
