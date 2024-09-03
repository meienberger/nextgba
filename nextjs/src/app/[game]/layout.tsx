import { ProxyProvider } from "@/components/ProxyProvider/ProxyProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  params: { game: string };
}) {
  return <>{children}</>;
}
