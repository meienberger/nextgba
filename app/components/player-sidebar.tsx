import { cn } from "@/lib/utils";
import { IconDeviceFloppy, IconHome } from "@tabler/icons-react";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Link } from "@remix-run/react";
import { SaveStatesDialog } from "./save-states-dialog";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  gameId: string;
  saveStates: string[];
}

export function PlayerSidebar({ className, gameId, saveStates }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("pointer-events-auto", className)}>
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)} size="sm" variant="ghost" className="justify-start">
          <IconDeviceFloppy color="white" />
        </Button>
        <Link to="/" className={cn(buttonVariants({ size: "sm", variant: "ghost" }), "justify-start")}>
          <IconHome color="white" />
        </Link>
      </div>
      <SaveStatesDialog onOpenChange={(o) => setOpen(o)} open={open} saveStates={saveStates} gameId={gameId} />
    </div>
  );
}
