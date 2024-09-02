import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SaveStateCard } from "./save-state-card";

type Props = {
  gameId: string;
  saveStates: string[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const SaveStatesDialog = ({ gameId, saveStates, open, onOpenChange }: Props) => {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saved States</DialogTitle>
          <DialogDescription>Load a saved state from the list below</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md p-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {saveStates.map((save) => (
              <SaveStateCard key={save} saveState={save} gameId={gameId} onLoad={() => onOpenChange?.(false)} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
