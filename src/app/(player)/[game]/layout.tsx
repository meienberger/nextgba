export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  params: { game: string };
}) {
  return <div className="m-0">{children}</div>;
}
