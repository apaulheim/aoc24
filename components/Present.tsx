import { Language, languageColors } from "./Data.ts";

type PresentProps = { language: number; onClick: (lang: number) => void };

export default function Present(
  { language, onClick }: PresentProps,
) {
  const colors = languageColors;
  const hslvalues = colors[language];

  return (
    <div class="present" onClick={() => onClick(language)}>
      <div class="language">{Language[language]}</div>
    </div>
  );
}
