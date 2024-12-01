import { useState } from "preact/hooks";
import {
  imagesPng,
  Language,
  languages,
  solutions,
  titles,
} from "../components/Data.ts";
import { MiniPresent } from "../components/MiniPresent.tsx";
import { MiniPresentType } from "../components/MiniPresent.tsx";
import CodeDisplay from "../components/CodeDisplay.tsx";

interface DayIslandProps {
  dayNr: number;
}

export default function DayIsland({ dayNr }: DayIslandProps) {
  const [selectedLang, setSelectedLang] = useState(
    dayNr - 1 < solutions.length && solutions[dayNr - 1].length > 0 ? 0 : -1,
  );

  const renderGithubEmbed = () => {
    if (selectedLang >= 0) {
      return <CodeDisplay language={selectedLang} day={dayNr} />;
    }
    return null;
  };

  const renderSolutions = (dayNr: number) => {
    if (solutions[dayNr - 1]?.length > 0) {
      return solutions[dayNr - 1].map((solution) => (
        <MiniPresent
          type={MiniPresentType.Language}
          id={solution}
          onClick={(lang: Language) => {
            setSelectedLang(lang);
          }}
        />
      ));
    } else return <div class="no-solution">No solutions implemented yet</div>;
  };

  const renderTitle = (dayNr: number) => {
    let ret = `Day ${dayNr}`;
    if (titles.length >= dayNr && titles[dayNr - 1]?.length > 0) {
      return `${ret}: ${titles[dayNr - 1]}`;
    } else return ret;
  };

  return (
    <>
      <div class="navbar-container">
        <a href="/">
          {"\< Back to calendar"}
        </a>
      </div>
      <div class="day-title">{renderTitle(dayNr)}</div>
      <div class="day-aoc">
        <a href={`https://adventofcode.com/2024/day/${dayNr}`}>
          <img class="aoc" src="../../aoc.png" />
          <div>{"Go to puzzle"}</div>
        </a>
      </div>
      <div class="solutions day">
        {renderSolutions(dayNr)}
      </div>
      <div class="container-code">
        {renderGithubEmbed()}
      </div>
      {
        /* <div class="decoration">
        <img src={images[dayNr - 1]} width="250px" />
      </div> */
      }
    </>
  );
}
