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

  const exists = await fs.promises
    .access("./public/games")
    .then(() => true)
    .catch(() => false);

  if (exists) {
    await fs.promises.writeFile("app.log", "Games folder exists");
    list = await fs.promises.readdir("./public/games");
  } else {
    await fs.promises.writeFile("app.log", "Games folder does not exist");
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
