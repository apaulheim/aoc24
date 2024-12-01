import { Language, languages } from "./Data.ts";

export enum MiniPresentType {
  Language,
  Navbar,
}

type MiniPresentProps = {
  type: MiniPresentType;
  id: number;
  onClick: (lang: number) => void;
};

export function MiniPresent(
  { type, id, onClick }: MiniPresentProps,
) {
  const renderContent = () => {
    if (type == MiniPresentType.Language) {
      return (
        <div
          class={"minipresent " + languages[id]}
          onClick={() => onClick(id)}
        >
          <div class="minipresent-lang">{Language[id]}</div>
        </div>
      );
    } else return <div class="navbarday">{id + 1}</div>;
  };

  return (
    renderContent()
  );
}
