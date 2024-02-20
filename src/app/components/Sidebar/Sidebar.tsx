"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconPlayerPlay,
} from "@tabler/icons-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  game: string;
}

export function Sidebar({ className, game }: SidebarProps) {
  const router = useRouter();

  const path = usePathname();
  const page = path.split("/").pop();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {game.charAt(0).toUpperCase() + game.slice(1)}
          </h2>
          <div className="space-y-1">
            <Button
              onClick={() => router.push(`/${game}/play`)}
              variant={page === "play" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <IconPlayerPlay className="mr-2" />
              Play
            </Button>
            <Button
              onClick={() => router.push(`/${game}/saves`)}
              variant={page === "saves" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <IconDeviceFloppy className="mr-2" />
              Save States
            </Button>
            <Button
              onClick={() => router.push(`/`)}
              variant="ghost"
              className="w-full justify-start"
            >
              <IconArrowLeft className="mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
