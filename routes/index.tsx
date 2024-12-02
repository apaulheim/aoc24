import { DayTile } from "../components/DayTile.tsx";

export default function Home() {
  const randomize = () => {
    let ret = [];
    for (let i = 0; i < 25; i++) {
      ret.push(i);
    }
    ret.sort(() => (Math.random() > .5) ? 1 : -1);
    return ret;
  };

  const randomizedDays = randomize();

  const renderDay = (dayNr: number) => {
    return <DayTile dayId={dayNr} />;
  };

  return (
    <div class="container">
      <div class="title">
        <div class="main-title">
          Anni's AOC 2024
        </div>
        <div>
          <a href="https://adventofcode.com/2024" target="_blank">
            <img src="./aoc.png" />
          </a>
          <a href="https://github.com/apaulheim/aoc24" target="_blank">
            <img src="./github.png" />
          </a>
        </div>
      </div>
      <div class="calendar">
        {randomizedDays.map((index) => renderDay(index))}
      </div>
    </div>
  );
}
