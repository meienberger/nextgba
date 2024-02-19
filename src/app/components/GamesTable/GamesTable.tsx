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

export const GamesTable = async () => {
  const list = await fs.promises.readdir("public/games");
  const games = list.filter((game) => game.endsWith(".gba"));

  return (
    <Table>
      <TableCaption>List of all your uploaded games</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Game</TableHead>
          <TableHead>Save file</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {games.map((game) => (
            <>
              <TableCell key={game}>{game}</TableCell>
              <TableCell className="font-bold">
                {list.includes(game.replace(".gba", ".state")) ? "Yes" : "No"}
              </TableCell>
              <TableCell className="text-right">
                <PlayButton game={game} />
              </TableCell>
            </>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};
