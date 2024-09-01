import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { GameMetadata } from "@/server/data";

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
              <TableCell className="text-right">{/* <PlayButton gameId={game.gameId} /> */}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
