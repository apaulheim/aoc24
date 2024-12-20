// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $day_dayNr_ from "./routes/day/[dayNr].tsx";
import * as $index from "./routes/index.tsx";
import * as $DayIsland from "./islands/DayIsland.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/day/[dayNr].tsx": $day_dayNr_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/DayIsland.tsx": $DayIsland,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
