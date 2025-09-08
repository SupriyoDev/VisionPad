import { useUser } from "@clerk/nextjs";
import { PlusCircle, Search, Send } from "lucide-react";
import Image from "next/image";
import NewFileCreate from "./newfilecreate";

const DashHeader = () => {
  const user = useUser();
  return (
    <div className=" px-20 mt-10 flex justify-end items-center flex-row gap-4">
      <div>
        <NewFileCreate>
          <div className=" bg-green-600 flex px-4 py-2 rounded-lg gap-2">
            <PlusCircle className="text-white" />{" "}
            <p className="text-white font-medium">Create New</p>
          </div>
        </NewFileCreate>
      </div>

      <div className=" flex flex-row items-center gap-2 border border-gray-500 rounded-lg py-2 px-4 ">
        <Search size={20} />
        <input placeholder="Search.." className="focus:outline-none" />
      </div>
      <div>
        <Image
          src={user.user?.imageUrl!}
          alt="dsd"
          width={100}
          height={100}
          className="size-10 rounded-full"
        />
      </div>
      <div className="bg-indigo-600 flex flex-row items-center gap-1.5 px-4 py-2 rounded-lg">
        <Send className="text-white" size={16} />
        <p className="text-white text-base font-medium">Invite</p>
      </div>
    </div>
  );
};

export default DashHeader;
