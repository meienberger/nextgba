import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { GameMetadata } from "@/server/data";
import { buttonVariants } from "./ui/button";
import { Link } from "@remix-run/react";
import { DeleteGameDialog } from "./delete-game-dialog";

export const GamesTable = (props: { games: GameMetadata[] }) => {
  const { games } = props;

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
                <div className="flex gap-2 justify-end">
                  <Link className={buttonVariants()} to={`play/${game.gameId}`}>
                    Play
                  </Link>
                  <DeleteGameDialog game={game} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
