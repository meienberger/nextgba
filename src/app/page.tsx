import { Button } from "@/components/ui/button";
import { GamesTable } from "./components/GamesTable/GamesTable";

export default function Home() {
  return (
    <section>
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
        <div className="flex w-full mx-auto text-left">
          <div className="relative inline-flex items-center mx-auto align-middle">
            <div className="text-center">
              <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter md:text-5xl lg:text-6xl lg:max-w-7xl bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                NextGBA
              </h1>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
                Play your favorite GBA games on the web.
                <br />
                Powered by <b>EmulatorJS</b>.
              </p>
              <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                <div className="mt-3 rounded-lg sm:mt-0">
                  <Button>Upload a game</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto border-2 p-2 border-dashed mt-24 rounded">
          <GamesTable />
        </div>
      </div>
    </section>
  );
}
