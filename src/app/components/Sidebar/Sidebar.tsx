"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IconDeviceFloppy, IconHome } from "@tabler/icons-react";
import { SaveStatesDialog } from "../SaveStates/SaveStatesDialog";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  gameId: string;
  saveStates: string[];
}

export function Sidebar({ className, gameId, saveStates }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <div className={cn("", className)}>
      <div className="flex gap-2">
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          variant="ghost"
          className="justify-start"
        >
          <IconDeviceFloppy color="white" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="justify-start"
          onClick={() => router.push("/")}
        >
          <IconHome color="white" />
        </Button>
      </div>
      <SaveStatesDialog
        onOpenChange={(o) => setOpen(o)}
        open={open}
        saveStates={saveStates}
        gameId={gameId}
      />
    </div>
  );
}
