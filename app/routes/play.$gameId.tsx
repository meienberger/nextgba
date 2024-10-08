import { GamePlayer } from "@/components/game-player";
import { PlayerSidebar } from "@/components/player-sidebar";
import { getGameMetadata, getGameSaveStates } from "@/server/data";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.gameId, "Missing gameId param");

  const metadata = await getGameMetadata(params.gameId);

  invariant(metadata, "Game not found");

  const saveStates = await getGameSaveStates(params.gameId);

  const url = new URL(request.url);
  const saveUrl = url.searchParams.get("save");

  let saveToLoad = saveStates[0];
  if (saveUrl && saveStates.includes(saveUrl)) {
    saveToLoad = saveUrl;
  }

  return json({ metadata, saveToLoad, saveStates });
};

export default function Index() {
  const { metadata, saveToLoad, saveStates } = useLoaderData<typeof loader>();
  return (
    <div className="bg-black h-full w-full absolute">
      <div className="relative h-full w-full">
        <GamePlayer metadata={metadata} saveStateToLoad={saveToLoad} />
        <div className="flex absolute top-0 right-0 left-0 z-20 pointer-events-none p-2 justify-center md:justify-start gap-2">
          <PlayerSidebar gameId={metadata.gameId} saveStates={saveStates} />
        </div>
      </div>
    </div>
  );
}
