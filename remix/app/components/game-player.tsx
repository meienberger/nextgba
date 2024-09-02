import { playerTemplate } from "@/lib/player";
import debounce from "lodash.debounce";

import type { GameMetadata } from "@/server/data";
import Handlebars from "handlebars";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRevalidate } from "@/hooks/use-revalidate";
import Iframe from "./iframe";

export const GamePlayer = (props: { metadata: GameMetadata; saveStateToLoad: string }) => {
  const { metadata, saveStateToLoad } = props;

  const revalidate = useRevalidate();

  const saveGame = async (save: Uint8Array, screenshot: Uint8Array, auto: boolean = false) => {
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

      const res = await fetch(`/play/${metadata.gameId}/save`, {
        method: "POST",
        body: JSON.stringify({
          state: base64save,
          screenshot: base64screenshot,
          auto,
          gameId: metadata.gameId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        toast.error("Failed to save game");
      } else {
        toast.success("Game saved");
        revalidate();
      }
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
        debouncedSaveGame(event.data.payload.state, event.data.payload.screenshot);
      }

      if (event?.data?.type === "AUTO_SAVE_STATE") {
        debouncedSaveGame(event.data.payload.state, event.data.payload.screenshot, true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [debouncedSaveGame]);

  const template = Handlebars.compile(playerTemplate);

  const iframe = template({
    gameId: metadata.gameId,
    console: metadata.console,
    saveState: saveStateToLoad,
  });

  return <Iframe title={metadata.name} src={iframe} saveStateToLoad={saveStateToLoad} />;
};
