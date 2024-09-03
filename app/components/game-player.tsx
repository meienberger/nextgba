import { playerTemplate } from "@/lib/player";
import debounce from "lodash.debounce";

import type { GameMetadata } from "@/server/data";
import Handlebars from "handlebars";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRevalidate } from "@/hooks/use-revalidate";
import Iframe from "./iframe";
import { useFetcher } from "@remix-run/react";

export const GamePlayer = (props: {
  metadata: GameMetadata;
  saveStateToLoad: string;
}) => {
  const { metadata, saveStateToLoad } = props;

  const revalidate = useRevalidate();
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data === "OK") {
      revalidate();
      toast.success("Game saved");
    } else if (fetcher.state === "idle" && fetcher.data === "Error") {
      toast.error("Failed to save game");
    }
  }, [fetcher.state, fetcher.data, revalidate]);

  const saveGame = async (save: Uint8Array, screenshot: Uint8Array, auto = false) => {
    try {
      let binaryString = "";

      for (const byte of save) {
        binaryString += String.fromCharCode(byte);
      }

      const base64save = btoa(binaryString);

      binaryString = "";

      for (const byte of screenshot) {
        binaryString += String.fromCharCode(byte);
      }

      const base64screenshot = btoa(binaryString);

      fetcher.submit(
        {
          state: base64save,
          screenshot: base64screenshot,
          auto,
          gameId: metadata.gameId,
        },
        {
          action: `/play/${metadata.gameId}/save`,
          method: "POST",
          encType: "application/json",
        },
      );
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
