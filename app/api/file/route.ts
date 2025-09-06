import { db } from "@/drizzle";
import { filesTable } from "@/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    const res = await db
      .select()
      .from(filesTable)
      .where(
        eq(filesTable.created_by, user?.primaryEmailAddress?.emailAddress!)
      )
      .orderBy(desc(filesTable.created_at));
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 400 }
    );
  }
}
