"use client";

import { uploadGame } from "@/app/actions/upload-game";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

type State = {
  success: boolean;
  errors: {
    game_file?: string;
    name?: string;
  };
};

const initialState: State = {
  success: false,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      Upload
    </Button>
  );
}

export const UploadGameDialog = () => {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(uploadGame, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Game uploaded successfully");
      setOpen(false);
    }
  }, [state.success]);

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger>
        <Button>Upload a game</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Upload a game</DialogTitle>
            <DialogDescription>
              GBA, GBC, and GB file types are supported.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 my-4">
            <Input
              type="file"
              name="game_file"
              required
              accept=".gba,.gbc,.gb"
            />
            {state.errors.game_file && (
              <p id="game_file" className="ml-3 text-sm text-red-500 mb-2">
                {state.errors.game_file}
              </p>
            )}
            <Input type="text" name="name" placeholder="Name" required />
            {state.errors.name && (
              <p id="name" className="ml-3 text-sm text-red-500">
                {state.errors.name}
              </p>
            )}
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
