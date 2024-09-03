"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DeleteGameDialog } from "./DeleteGameDialog";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { deleteGameAction } from "@/app/actions/delete-game";
import toast from "react-hot-toast";

type Props = {
  gameId: string;
};

export const PlayButton = ({ gameId }: Props) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const deleteMutation = useAction(deleteGameAction, {
    onSuccess: () => {
      router.refresh();
      toast.success("Game deleted");
    },
    onError: (e) => {
      toast.error(`Failed to delete game: ${e.serverError}`);
    },
  });

  return (
    <div className="flex gap-2 justify-end">
      <Button variant="default" onClick={() => router.push(`/${gameId}/play`)}>
        Play
      </Button>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <DeleteGameDialog
        open={open}
        onOpenChange={setOpen}
        onDelete={() => deleteMutation.execute({ gameId })}
      />
    </div>
  );
};
