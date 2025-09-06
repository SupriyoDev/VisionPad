import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useTeamStore } from "@/store/store";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Archive, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createFileArchive } from "@/lib/action";

const FileTable = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["all_files"],
    queryFn: async () => {
      const res = await axios.get("/api/file");
      return res.data.data;
    },
  });

  const user = useUser();

  const teamID = useTeamStore((state) => state.team_id);
  const router = useRouter();

  return (
    <div>
      <Table className="">
        <TableHeader className="">
          <TableRow className="bg-gray-200 hover:bg-gray-200 ">
            <TableHead className="w-[300px] text-lg">File Name</TableHead>
            <TableHead className="text-lg">Created At</TableHead>

            <TableHead className=" text-lg">Author</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isError &&
            !isPending &&
            data
              .filter((file: any) => file.team_id === teamID)
              .map((file: any, i: number) => {
                const date = new Date(file.created_at);
                const formatted = new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(date);

                return (
                  <TableRow
                    key={i}
                    className="hover:bg-gray-200/70"
                    onClick={() => router.push(`/workspace/${file.id}`)}
                  >
                    <TableCell className="font-medium">
                      {file.file_name}
                    </TableCell>

                    <TableCell> {formatted}</TableCell>

                    <TableCell className="">
                      <Image
                        alt=""
                        src={user.user?.imageUrl!}
                        width={50}
                        height={50}
                        className="size-8 rounded-full"
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div className="hover:bg-gray-300 p-1  rounded-sm">
                            <Ellipsis />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-20 ">
                          <DropdownMenuItem className="p-0">
                            <form
                              action={async () => {
                                createFileArchive;
                              }}
                              className="size-full"
                            >
                              <div>
                                <input
                                  value={file.id}
                                  name="file_id"
                                  type="text"
                                  hidden
                                  readOnly
                                />
                              </div>
                              <Button
                                className="size-full"
                                type="submit"
                                variant={"ghost"}
                              >
                                <Archive className="size-4 text-gray-700" />{" "}
                                Archive
                              </Button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileTable;
