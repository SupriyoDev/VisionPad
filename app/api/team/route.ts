import { db } from "@/drizzle";
import { teamsTable } from "@/drizzle/schema";
import { auth, currentUser } from "@clerk/nextjs/server";

import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "User authentication failed" });
    }

    const user = await currentUser();
    //database requets

    const res = await db
      .select()
      .from(teamsTable)
      .where(
        eq(teamsTable.created_by, user?.primaryEmailAddress?.emailAddress!)
      );

    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" });
  }
}
