import { Sidebar } from "@/app/components/Sidebar/Sidebar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { game: string };
}) {
  return (
    <div className="w-full">
      <div className="w-full flex flex-row flex-wrap py-4 ">
        <aside className="w-full lg:w-1/4 xl:w-1/5 px-2">
          <Sidebar game={params.game} />
        </aside>
        <main role="main" className="w-full lg:w-3/4 xl:w-4/5 pt-1 px-2">
          {children}
        </main>
      </div>
    </div>
  );
}
