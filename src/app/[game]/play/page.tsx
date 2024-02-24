import { Player } from "@/app/components/Player/Player";
import { Sidebar } from "@/app/components/Sidebar/Sidebar";
import { playerTemplate } from "@/app/player";
import { getGameMetadata, pathExists } from "@/lib/fs";
import fs from "fs";
import Handlebars from "handlebars";

export default async function Play({
  params,
  searchParams,
}: {
  params: { game: string };
  searchParams: { save: string };
}) {
  const template = Handlebars.compile(playerTemplate);

  const metadata = await getGameMetadata(params.game);

  if (!metadata) {
    return <div>Game not found</div>;
  }

  const savesFolderExists = await pathExists(
    `/data/games/${metadata.gameId}/saves/`,
  );

  let saveStateList: string[] = [];

  if (savesFolderExists) {
    const list = await fs.promises.readdir(
      `/data/games/${metadata.gameId}/saves/`,
    );
    saveStateList = list
      .filter((file) => file.endsWith(".state"))
      .reverse()
      .map((file) => file.replace(".state", ""));
  }

  const iframe = template({
    gameId: metadata.gameId,
    console: metadata.console,
    saveState: searchParams.save || saveStateList[0],
  });

  return (
    <div className="bg-black h-full w-full absolute">
      <div className="relative h-full w-full">
        <Player iframeSrc={iframe} gameId={metadata.gameId} />;
        <div className="flex absolute top-0 right-0 left-0 z-20 pointer-events-none p-2 justify-center md:justify-start gap-2">
          <Sidebar gameId={metadata.gameId} saveStates={saveStateList} />
        </div>
      </div>
    </div>
  );
}
