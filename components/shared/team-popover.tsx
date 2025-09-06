"use client";

import { useShallow } from "zustand/react/shallow";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTeamStore } from "@/store/store";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
export function TeamPopover({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  const { selectTeamid, selectTeamname, teamId, setTeamNo } = useTeamStore(
    useShallow((state) => ({
      selectTeamid: state.selectTeamId,
      selectTeamname: state.selectTeamName,
      teamId: state.team_id,
      setTeamNo: state.setTotalTeam,
    }))
  );

  const { data, isPending, isError } = useQuery({
    queryKey: ["all_teams"],
    queryFn: async () => {
      const res = await axios.get("/api/team");
      selectTeamid(res.data.data[0].id);
      selectTeamname(res.data.data[0].team_name);
      setTeamNo(res.data.data.length as number);
      return res.data.data;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className=" flex flex-col gap-1">
              {!isError &&
                !isPending &&
                data.map((s: any, i: number) => (
                  <button
                    onClick={() => {
                      selectTeamid(s.id);
                      selectTeamname(s.team_name);
                    }}
                    key={i}
                    className={cn(
                      "leading-none font-normal text-left px-4 py-1  text-white text-base capitalize rounded-md",
                      teamId === s.id
                        ? " bg-indigo-600 text-white"
                        : "bg-transparent text-gray-800"
                    )}
                  >
                    {s.team_name}
                  </button>
                ))}
            </div>

            <Separator className="my-3 bg-slate-200" />

            <div className=" flex flex-col gap-0.5 ">
              <Link href={"/teams/create"}>
                <div className=" flex flex-row items-center gap-3 hover:bg-primary hover:text-white px-3 rounded-md py-2">
                  <Users className="size-6" /> <p>Join or Create Team</p>
                </div>
              </Link>
              <div className=" flex flex-row items-center gap-3 hover:bg-primary hover:text-white px-3 rounded-md py-2">
                <Settings className="size-6" /> <p>Settings</p>
              </div>
              <SignOutButton>
                <div className=" flex flex-row items-center gap-3 hover:bg-primary hover:text-white px-3 rounded-md py-2">
                  <LogOut className="size-6" /> <p className="">Logout</p>
                </div>
              </SignOutButton>
            </div>

            <Separator className="my-3 bg-slate-200 " />

            <div className="flex flex-row items-center gap-2">
              <Image
                src={user?.imageUrl!}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-lg font-bold text-gray-7 00 capitalize">
                  {user?.fullName}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
