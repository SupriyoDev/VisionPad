"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { createTeamAction } from "@/lib/action";
import { useQueryClient } from "@tanstack/react-query";
import { Users } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useActionState } from "react";

export type FormState = {
  errors?: {
    team_name: string;
  };
  success?: boolean;
  message?: string;
};

export const initialState: FormState = {
  errors: {
    team_name: "",
  },
};

const TeamCreatePage = () => {
  const [state, formAction, isPending] = useActionState(
    createTeamAction,
    initialState
  );
  const queryClient = useQueryClient();

  if (state.success === true) {
    queryClient.invalidateQueries({ queryKey: ["all_teams"] });
    redirect("/dashboard");
  }

  return (
    <div className="max-w-7xl mx-auto h-screen   pt-8">
      <div className=" flex flex-row items-center relative">
        <Image src={"/logo.png"} alt="" width={80} height={80} />
        <p className=" absolute left-16 text-2xl  font-bold text-transparent bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text">
          VisionPad
        </p>
      </div>

      {/* create team  */}

      <div className=" flex flex-col items-center mt-6">
        <div className=" bg-green-600/40 w-fit flex flex-row items-center gap-2 py-2 px-4 rounded-lg text-green-700">
          <Users strokeWidth={2} /> <p className="font-medium">Team Name</p>
        </div>

        <p className="text-4xl font-bold mt-6 text-gray-800">
          What should we call your team?
        </p>
        <p className="mt-5 text-gray-500">
          You can always change this later from settings
        </p>
      </div>

      {/* form  */}
      <div className=" flex flex-col  items-center mt-12">
        <form action={formAction} className="w-[38%]">
          <Label className="mb-2 text-base text-gray-400">Team Name</Label>
          <Input
            required
            name="team_name"
            placeholder="Enter your team name"
            className="placeholder:text-gray-400 "
          />
          {state.errors?.team_name && (
            <p className="text-red-500 text-sm font-medium mt-2">
              {state.errors.team_name}
            </p>
          )}
          <div className="flex items-center justify-center mt-14">
            <Button type="submit" className="w-72 h-10 text-lg bg-indigo-600 ">
              {isPending ? (
                <Spinner variant="infinite" size={100} className="text-white" />
              ) : (
                "Create Team"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* end */}
    </div>
  );
};

export default TeamCreatePage;
