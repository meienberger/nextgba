import Handlebars from "handlebars";
import fs from "fs";
import { playerTemplate } from "../player";
import { Player } from "../components/Player/Player";

export default async function Play({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const template = Handlebars.compile(playerTemplate);
  const game = searchParams?.game as string;
  const iframe = template({ gameName: game.split(".")[0] });

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="my-5 text-xl font-bold">Playing: {game}</div>
      <div className="rounded w-full flex justify-center"></div>
      <Player iframeSrc={iframe} game={game} />
    </div>
  );
}
