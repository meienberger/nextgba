"use client";

import { saveStateAction } from "@/app/actions/save-state";

import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export type ProxyInstance = [string | undefined];

type Props = {
  iframeSrc: string;
  gameId: string;
};

export const Player = (props: Props) => {
  const { iframeSrc, gameId } = props;

  const saveMutation = useAction(saveStateAction, {
    onSuccess: () => {
      toast.success("Game saved!");
    },
    onError: (e) => {
      console.error(e);
      toast.error("Failed to save game");
    },
  });

  const saveGame = (save: Uint8Array, screenshot: Uint8Array) => {
    console.log("Saving game state...");
    try {
      let binaryString = "";
      save.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
      });

      const base64save = btoa(binaryString);

      binaryString = "";

      screenshot.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
      });

      const base64screenshot = btoa(binaryString);

      saveMutation.execute({
        state: base64save,
        screenshot: base64screenshot,
        gameId,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const debouncedSaveGame = debounce(saveGame, 5000);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event?.data?.type === "SAVE_STATE") {
        debouncedSaveGame(
          event.data.payload.state,
          event.data.payload.screenshot,
        );
      }
    });

    return () => {
      console.log("Removing event listener");
      window.removeEventListener("message", () => {});
    };
  }, []);

  return (
    <AspectRatio ratio={16 / 9} className="bg-black rounded-xl">
      <iframe
        className="w-full h-full border-none overflow-hidden "
        srcDoc={iframeSrc}
      />
    </AspectRatio>
  );
};
