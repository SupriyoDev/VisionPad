"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { TeamPopover } from "./team-popover";

import SidebarTop from "./sidebartop";

const SideNav = () => {
  return (
    <div className="bg-gray-200/70 h-full border-r p-6 fixed xl:w-1/5  ">
      <div className="flex flex-row items-center  relative group  rounded-2xl">
        <Image src={"/logo.png"} alt="" width={100} height={100} />
        <h3 className="flex absolute left-[80px] text-3xl font-semibold text-transparent bg-gradient-to-r from-purple-600  to-orange-500 bg-clip-text  tracking-tight ">
          Vision{" "}
          <span className="text-transparent ml-0.5 tracking-tight">Pad</span>{" "}
          <TeamPopover>
            <ChevronDown className="text-gray-800 ml-4" />
          </TeamPopover>
        </h3>
      </div>

      <SidebarTop />
    </div>
  );
};

export default SideNav;
