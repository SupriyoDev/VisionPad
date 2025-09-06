import { cn } from "@/lib/utils";
import { useTeamStore } from "@/store/store";
import { Archive, Flag, Github, LayoutGrid } from "lucide-react";
import Link from "next/link";
import NewFileCreate from "./newfilecreate";

const bottomLinks = [
  { title: "getting started", icon: Flag, href: "" },
  { title: "github", icon: Github, href: "" },
  { title: "archive", icon: Archive, href: "" },
];

const SidebarTop = () => {
  const teamname = useTeamStore((state) => state.team_name);

  return (
    <div className="  flex flex-col h-[85vh]   px-2">
      {/* team name  */}
      <Link href={teamname ? "#" : "/teams/create"}>
        <div
          className={cn(
            " mb-2 bg-gradient-to-br  rounded-lg px-4 py-2",
            teamname
              ? "from-purple-700 shadow-md  shadow-amber-200 uppercase  to-white"
              : " from-blue-600 to-purple-600 capitalize  "
          )}
        >
          <p className="text-lg font-bold text-white  tracking-tight">
            {teamname ? teamname : "+ Create a team"}
          </p>
        </div>
      </Link>

      {/* allfiles  */}
      <div className=" flex flex-1 flex-col">
        <div className="bg-slate-300 border border-slate-400/40 shadow-md rounded-lg flex flex-row items-center py-2 px-4">
          <LayoutGrid size={20} />{" "}
          <p className=" ml-3 text-base font-medium">All Files</p>
        </div>
      </div>
      {/* bottom links  */}
      <div className=" flex flex-col gap-2  ">
        {bottomLinks.map((blink, i) => (
          <Link
            href={blink.href}
            className=" flex flex-row items-center py-2 px-4 bg-slate-300/40 hover:bg-slate-300 rounded-lg"
            key={i}
          >
            <blink.icon size={20} />{" "}
            <p className="ml-3 text-base font-medium capitalize">
              {blink.title}
            </p>
          </Link>
        ))}
        <NewFileCreate>
          <p className="rounded-lg w-full mt-2 mb-3 flex items-center justify-start px-8 text-base text-white bg-indigo-600 font-medium py-3">
            {" "}
            New File
          </p>
        </NewFileCreate>
        <div className="h-3  w-full rounded-full bg-gray-300 mt-2">
          <div className="w-[40%] bg-indigo-600 h-3  rounded-full" />
        </div>
        <p
          className={cn(
            "text-sm font-semibold"
            // totalteam! > 4 ? "text-red-500" : "text-indigo-600"
          )}
        >
          1 out of 5 files used
        </p>
        <p className=" bg-gradient-to-r from-purple-500 to-orange-500 rounded-full text-white px-2 py-1 text-xs font-medium text-center ">
          Upgrade your plan for unlimited access
        </p>
      </div>
    </div>
  );
};

export default SidebarTop;
