"use server";

import { FormState } from "@/app/(root)/teams/create/page";
import { FileFormState } from "@/components/shared/newfilecreate";
import { db } from "@/drizzle";
import { filesTable, teamsTable } from "@/drizzle/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export const createTeamAction = async (
  initialState: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { userId } = await auth();
  if (!userId)
    return {
      success: false,
      message: "User Authentication Failed!!!",
    };

  const user = await currentUser();

  const fullname = `${user?.fullName}`;

  const teamname = formdata.get("team_name") as string;
  if (!teamname || teamname.trim() === "") {
    return {
      errors: {
        team_name: "Please provide team_name",
      },
      success: false,
    };
  }

  console.log("team name", teamname);

  try {
    await db.insert(teamsTable).values({
      created_by: user?.primaryEmailAddress?.emailAddress!,
      team_name: teamname,
    });
  } catch (error) {
    return {
      success: false,
    };
  }

  return { success: true };
};

export const createFileAction = async (
  initialState: FileFormState,
  formdata: FormData
): Promise<FileFormState> => {
  try {
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) {
      return { success: false, message: "User is not authenticated!" };
    }
    const user = await currentUser();

    const file_name = formdata.get("file_name")?.toString();

    const team_id = formdata.get("team_id")?.toString();
    const teamidnum = parseInt(team_id as string, 10);

    if (!file_name || !team_id) {
      return {
        success: false,
        message: "create a file under a team id",
      };
    }

    await db.insert(filesTable).values({
      fileName: file_name,
      created_by: user?.emailAddresses[0].emailAddress!,
      team_id: teamidnum,
    });

    return {
      success: true,
      message: "File created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something error happend!",
    };
  }
};

export async function saveDocToRemote(fileid: string, data: string) {
  try {
    await db
      .update(filesTable)
      .set({
        document: data,
      })
      .where(eq(filesTable.id, Number(fileid)));
  } catch (error) {
    return Response.json({ message: error });
  }
}

export async function createFileArchive(formdata: FormData) {
  try {
    const user = await currentUser();
    const fileId = formdata.get("file_id");
    await db
      .update(filesTable)
      .set({ is_archive: true })
      .where(
        and(
          eq(filesTable.id, Number(fileId)),
          eq(filesTable.created_by, user?.primaryEmailAddress?.emailAddress!)
        )
      );
  } catch (error) {
    return Response.json({ message: error });
  }
}
