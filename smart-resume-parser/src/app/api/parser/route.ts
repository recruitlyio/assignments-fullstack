import { NextResponse } from "next/server";
import { parseResumeWithGemini } from "../../../lib/openai";

export async function POST(req: Request) {
  let data;

  try {
    data = await req.json();
  } catch (err) {
    console.error("Invalid JSON:", err);
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  if (!data) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }

  if (!data.resumeText || typeof data.resumeText !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid resume text" },
      { status: 400 }
    );
  }

  try {
    const parsed = await parseResumeWithGemini(data.resumeText);
    return NextResponse.json(parsed);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Resume parse error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
