import { Player } from "@/app/components/Player/Player";
import { playerTemplate } from "@/app/player";
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
  const savesFolderExists = await fs.promises
    .access(`/data/games/${params.game}/saves/`)
    .then(() => true)
    .catch(() => false);

  let saveStateList: string[] = [];

  if (savesFolderExists) {
    const list = await fs.promises.readdir(`/data/games/${params.game}/saves/`);
    saveStateList = list.filter((file) => file.endsWith(".state")).reverse();
  }

  const iframe = template({
    gameName: params.game,
    saveState: searchParams.save || saveStateList[0],
  });

  return <Player iframeSrc={iframe} gameId={params.game} />;
}
