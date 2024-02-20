import { SaveState } from "@/app/components/SaveStates/SaveState";

export default async function SavesPage({
  params,
}: {
  params: { game: string };
}) {
  return <SaveState gameId={params.game} />;
}
