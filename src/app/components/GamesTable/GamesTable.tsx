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
  let list: string[] = [];

  if (fs.existsSync("/data/games")) {
    console.log("Reading games from /data/games");
    list = await fs.promises.readdir("/data/games", {
      withFileTypes: false,
    });
    console.log("Games found:", list);
  } else {
    console.log("No games found in /data/games");
  }

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
        {list.map((game) => (
          <TableRow key={game}>
            <TableCell>{game}</TableCell>
            <TableCell className="text-right">
              <PlayButton game={game} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
