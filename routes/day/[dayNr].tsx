import { PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import DayIsland from "../../islands/DayIsland.tsx";

export default function DayPage(props: PageProps) {
  const { dayNr } = props.params;

  return (
    <>
      <Head>
        <title>Annis AOC24</title>
        <link rel="stylesheet" href={asset("/global.css")} />
      </Head>
      <main class="container-day">
        <DayIsland dayNr={parseInt(dayNr)} />
      </main>
    </>
  );
}
