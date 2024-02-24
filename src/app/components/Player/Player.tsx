"use client";

import { saveStateAction } from "@/app/actions/save-state";
import { useAction } from "next-safe-action/hooks";
import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { ProxyContext } from "@/components/ProxyProvider/ProxyProvider";

type Props = {
  iframeSrc: string;
  gameId: string;
};

export const Player = (props: Props) => {
  const { iframeSrc, gameId } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  const [, set] = useContext(ProxyContext);

  const saveMutation = useAction(saveStateAction, {
    onSuccess: ({ auto }) => {
      if (!auto) {
        toast.success("Game saved");
      }
      router.refresh();
    },
    onError: (e) => {
      console.error(e);
      toast.error("Failed to save game");
    },
  });

  const saveGame = (
    save: Uint8Array,
    screenshot: Uint8Array,
    auto: boolean = false,
  ) => {
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
        auto,
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

      if (event?.data?.type === "AUTO_SAVE_STATE") {
        debouncedSaveGame(
          event.data.payload.state,
          event.data.payload.screenshot,
          true,
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [debouncedSaveGame]);

  useEffect(() => {
    setTimeout(() => {
      toast.success("Game will auto save every minute", { icon: "🕒" });
    }, 1000);

    const triggerSave = () => {
      console.log("Auto saving game...");
      iframeRef.current?.contentWindow?.postMessage(
        { type: "AUTO_SAVE_STATE" },
        "*",
      );
    };

    const interval = setInterval(() => {
      triggerSave();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        allowFullScreen
        onLoad={() =>
          set(
            "Did you save your game? Leaving this page will lose your progress!",
          )
        }
        seamless
        className="h-full absolute inset-0 z-10 "
        srcDoc={iframeSrc}
        style={{ minWidth: "100%", width: "1px" }}
      />
    </>
  );
};
