import { Links, Meta, Outlet, Scripts } from "@remix-run/react";

import appStylesHref from "./tailwind.css?url";

import type { LinksFunction } from "@remix-run/node";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Scripts />
        <Outlet />
      </body>
    </html>
  );
}
