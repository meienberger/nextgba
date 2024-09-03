import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";

type Props = {
  saveId: string;
};

export const DeleteSaveStateDialog = (props: Props) => {
  const { saveId } = props;
  const [open, setOpen] = useState(false);

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  const res = z.object({ success: z.boolean() }).or(z.undefined()).parse(fetcher.data);

  useEffect(() => {
    if (res?.success) {
      toast.success("Save state deleted successfully");
      setOpen(false);
    }
  }, [res?.success]);

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger>
        <div className={buttonVariants({ variant: "destructive", size: "sm" })}>Delete</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete save state?</DialogTitle>
          <DialogDescription>Are you sure you want to delete this save? You won't be able to recover it.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <fetcher.Form action="delete-save" method="post">
            <input type="hidden" name="saveId" value={saveId} />
            <Button variant="destructive" type="submit" disabled={isSubmitting} aria-disabled={isSubmitting}>
              Delete
            </Button>
          </fetcher.Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
