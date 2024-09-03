import fs from "fs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlayButton } from "./PlayButton";
import { getGameMetadata, pathExists } from "@/lib/fs";

const findGames = async () => {
  const exists = await pathExists("/data/games");

  if (exists) {
    const folders = await fs.promises.readdir("/data/games");

    const metadata = await Promise.all(
      folders.map(async (gameId) => {
        return getGameMetadata(gameId);
      }),
    );

    return metadata;
  }

  return [];
};

export const GamesTable = async () => {
  const games = await findGames();

  return (
    <Table>
      <TableCaption>List of all your uploaded games</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Game</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => {
          if (!game) return null;

          return (
            <TableRow key={game.gameId}>
              <TableCell>{game.name}</TableCell>
              <TableCell className="text-right">
                <PlayButton gameId={game.gameId} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
