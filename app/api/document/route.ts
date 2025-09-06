import { db } from "@/drizzle";
import { filesTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const fileId = searchParams.get("fileId");

    const [res] = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.id, Number(fileId)));

    return NextResponse.json({ doc: res.document }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
