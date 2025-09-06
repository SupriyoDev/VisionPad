"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTeamStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { useUser } from "@clerk/nextjs";
import { createFileAction } from "@/lib/action";
import { useQueryClient } from "@tanstack/react-query";

export interface FileFormState {
  errors?: {
    team_id?: string;
  };
  success?: boolean | null;
  message?: string;
}

const intialstate: FileFormState = {
  errors: {
    team_id: "",
  },
  success: null,
  message: "",
};

const NewFileCreate = ({ children }: { children: React.ReactNode }) => {
  const { teamId, teamName } = useTeamStore(
    useShallow((state) => ({
      teamId: state.team_id,
      teamName: state.team_name,
    }))
  );

  const [open, setOpen] = useState(false);
  const [filename, setFileName] = useState("");
  const queryclient = useQueryClient();

  const [state, formAction, isPending] = useActionState(
    createFileAction,
    intialstate
  );

  useEffect(() => {
    if (state.success === true) {
      setOpen(false);
      queryclient.invalidateQueries({ queryKey: ["all_files"] });
    }
  }, [state.success]);

  return (
    <div className=" w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Create new File</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>

          <form action={formAction}>
            <div>
              <Input
                name="file_name"
                className=""
                placeholder="name the file"
                value={filename}
                onChange={(e) => setFileName(e.currentTarget.value)}
              />
              <input
                readOnly
                name="team_id"
                value={teamId!}
                hidden
                type="text"
                placeholder="teamid"
              />
            </div>

            <DialogFooter className=" mt-4">
              {state.success === false && <p>{state.message}</p>}
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="" type="submit">
                {isPending ? "Creating" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewFileCreate;
