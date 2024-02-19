"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  game: string;
};

export const PlayButton = (props: Props) => {
  const { game } = props;
  const router = useRouter();

  const onClick = () => {
    router.push("/play?game=" + game);
  };

  return <Button onClick={onClick}>Play</Button>;
};
