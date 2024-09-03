import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

export const UploadGameDialog = () => {
  const [open, setOpen] = useState(false);

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  const res = z
    .object({ errors: z.record(z.string()), success: z.boolean() })
    .or(z.undefined())
    .parse(fetcher.data);

  useEffect(() => {
    if (res?.success) {
      setOpen(false);
      toast.success("Game uploaded successfully");
    }
  }, [res?.success]);

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger>
        <div className={buttonVariants()}>Upload a game</div>
      </DialogTrigger>
      <DialogContent>
        <fetcher.Form id="upload-game-form" method="post" action="/upload-game" encType="multipart/form-data">
          <DialogHeader>
            <DialogTitle>Upload a game</DialogTitle>
            <DialogDescription>GBA, GBC, and GB file types are supported.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 my-4">
            <Input type="file" name="game_file" required accept=".gba,.gbc,.gb" />
            {res?.errors.game_file && (
              <p id="game_file" className="ml-3 text-sm text-red-500 mb-2">
                {res.errors.game_file}
              </p>
            )}
            <Input type="text" name="name" placeholder="Name" required />
            {res?.errors.name && (
              <p id="name" className="ml-3 text-sm text-red-500">
                {res.errors.name}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} aria-disabled={isSubmitting}>
              Upload
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
};
