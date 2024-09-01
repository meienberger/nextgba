import { playerTemplate } from "@/lib/player";
import type { GameMetadata } from "@/server/data";
import Handlebars from "handlebars";

export const GamePlayer = (props: { metadata: GameMetadata; saveStateToLoad: string }) => {
  const { metadata, saveStateToLoad } = props;

  const template = Handlebars.compile(playerTemplate);

  const iframe = template({
    gameId: metadata.gameId,
    console: metadata.console,
    saveState: saveStateToLoad,
  });

  return (
    <iframe
      title={metadata.name}
      allowFullScreen
      seamless
      className="h-full absolute inset-0 z-10 "
      srcDoc={iframe}
      style={{ minWidth: "100%", width: "1px" }}
    />
  );
};
