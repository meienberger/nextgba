"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  game: string;
};

export const PlayButton = (props: Props) => {
  const { game } = props;
  const router = useRouter();

  return (
    <div className="flex gap-2 justify-end">
      <Button variant="default" onClick={() => router.push(`/${game}/play`)}>
        Play
      </Button>
      <Button variant="default" onClick={() => router.push(`/${game}/saves`)}>
        Save States
      </Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
};
