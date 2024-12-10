import { useState } from "preact/hooks";
import CodeDisplay from "../components/CodeDisplay.tsx";
import { Language, solutions, titles } from "../components/Data.ts";
import { MiniPresent, MiniPresentType } from "../components/MiniPresent.tsx";

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
    const renderLink = (left: boolean) => {
      let text = "";
      if (left && dayNr > 1) text = `< ${dayNr - 1}`;
      if (!left && dayNr < 25) text = `${dayNr + 1} >`;
      let href = `/day/${left ? dayNr - 1 : dayNr + 1}`;

      return (
        <div>
          <a href={href}>{text}</a>
        </div>
      );
    };
    const aocTitle = () => {
      if (titles.length >= dayNr && titles[dayNr - 1]?.length > 0) {
        return (
          <>
            <br />
            {titles[dayNr - 1]}
          </>
        );
      }
      return null;
    };
    return (
      <div class="day-title">
        {renderLink(true)}
        <div>Day {dayNr}{aocTitle()}</div>
        {renderLink(false)}
      </div>
    );
  };

  return (
    <>
      <div class="sticky">
        <div class="navbar-container">
          <a href="/">
            {"\< Back to calendar"}
          </a>
        </div>
        {renderTitle(dayNr)}
        <div class="day-aoc">
          <a href={`https://adventofcode.com/2024/day/${dayNr}`}>
            <img class="aoc" src="../../aoc.png" />
            <div>{"Go to puzzle"}</div>
          </a>
        </div>
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
