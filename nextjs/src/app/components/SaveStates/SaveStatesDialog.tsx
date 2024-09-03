import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SaveState } from "./SaveState";
import { useRouter } from "next/navigation";

type Props = {
  gameId: string;
  saveStates: string[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const SaveStatesDialog = ({
  gameId,
  saveStates,
  open,
  onOpenChange,
}: Props) => {
  const router = useRouter();

  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saved States</DialogTitle>
          <DialogDescription>
            Load a saved state from the list below
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md p-4">
          <SaveState
            gameId={gameId}
            saveStates={saveStates}
            onLoad={(save) => {
              router.push(`/${gameId}/play?save=${save.replace(".state", "")}`);
              onOpenChange?.(false);
            }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
