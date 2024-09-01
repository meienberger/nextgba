import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { Form, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { GameMetadata } from "@/server/data";
import { z } from "zod";
import toast from "react-hot-toast";

export const DeleteGameDialog = (props: { game: GameMetadata }) => {
  const { game } = props;
  const [open, setOpen] = useState(false);

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const res = z.object({ success: z.boolean() }).or(z.undefined()).parse(fetcher.data);

  useEffect(() => {
    if (res?.success) {
      setOpen(false);
      toast.success("Game deleted successfully");
    }
  }, [res?.success]);

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger>
        <div className={buttonVariants({ variant: "destructive" })}>Delete</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Delete game ${game.name}?`}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this game? All of your data will be permanently removed. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <fetcher.Form action="delete-game" method="post">
            <input type="hidden" name="gameId" value={game.gameId} />
            <Button variant="destructive" type="submit" disabled={isSubmitting} aria-disabled={isSubmitting}>
              Delete
            </Button>
          </fetcher.Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
