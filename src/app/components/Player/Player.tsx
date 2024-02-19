"use client";

import { saveStateAction } from "@/app/actions/save-state";
import { useAction } from "next-safe-action/hooks";

type Props = {
  iframeSrc: string;
  game: string;
};

export const Player = (props: Props) => {
  const { iframeSrc, game } = props;

  const saveMutation = useAction(saveStateAction);

  if (typeof window !== "undefined") {
    window.addEventListener("message", (event) => {
      if (event?.data?.type === "SAVE_STATE") {
        console.log("Message save received", event);
        const save = event.data.payload.state;
        const base64save = btoa(JSON.stringify(save));

        saveMutation.execute({ state: base64save, game: game.split(".")[0] });
      }
    });
  }

  return <iframe srcDoc={iframeSrc} width="640px" height="480px" />;
};
