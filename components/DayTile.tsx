import { imagesPng, solutions } from "../components/Data.ts";
import { MiniPresent, MiniPresentType } from "../components/MiniPresent.tsx";

type DayTileProps = {
    dayId: number;
};

export function DayTile({ dayId }: DayTileProps) {
    const today = new Date();
    const image = imagesPng[dayId];

    const renderSolutions = (dayNr: number) => {
        if (solutions[dayNr]) {
            return solutions[dayNr].map((solution) => (
                <MiniPresent
                    type={MiniPresentType.Language}
                    id={solution}
                    onClick={() => {}}
                />
            ));
        }
    };

    return (
        <a href={`/day/${dayId + 1}`}>
            <div class="day-container">
                <div class="day-nr">
                    {dayId + 1}
                </div>
                <div
                    class="day"
                    style={`background: url(${image});background-size: contain; background-repeat: no-repeat; background-position: center; filter: grayscale(${
                        (today.getFullYear() == 2024 &&
                                today.getMonth() == 11 &&
                                today.getDate() >= dayId + 1) ||
                            today.getFullYear() > 2024
                            ? "0%"
                            : "95%"
                    }); opacity: ${
                        (today.getFullYear() == 2024 &&
                                today.getMonth() == 11 &&
                                today.getDate() >= dayId + 1) ||
                            today.getFullYear() > 2024
                            ? "1"
                            : "0.2"
                    }`}
                >
                </div>
                <div class="solutions">
                    {renderSolutions(dayId)}
                </div>
            </div>
        </a>
    );
}
