"use client";

import { saveStateAction } from "@/app/actions/save-state";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import IframeResizer from "iframe-resizer-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "../Sidebar/Sidebar";

export type ProxyInstance = [string | undefined];

type Props = {
  iframeSrc: string;
  gameId: string;
};

export const Player = (props: Props) => {
  const { iframeSrc, gameId } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const debouncedSaveGame = debounce(saveGame, 500, {
    leading: true,
    trailing: false,
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event?.data?.type === "SAVE_STATE") {
        debouncedSaveGame(
          event.data.payload.state,
          event.data.payload.screenshot,
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [debouncedSaveGame]);

  return (
    <>
      <iframe
        allowFullScreen
        seamless
        className="h-full absolute inset-0 z-10 "
        srcDoc={iframeSrc}
        style={{ minWidth: "100%", width: "1px" }}
        allow="Fullscreen; picture-in-picture;"
      />
    </>
  );
};
