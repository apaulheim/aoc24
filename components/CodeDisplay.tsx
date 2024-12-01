import { useEffect, useState } from "preact/hooks";
import Prism from "https://esm.sh/prismjs@1.29.0";
import { Language, languages } from "./Data.ts";

interface CodeDisplayProps {
  language: Language;
  day: number;
}

const CodeDisplay = ({ language, day }: CodeDisplayProps) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchCode = async () => {
      const lang = languages[language];
      const url = `/${lang}/${day}.${lang}`;
      console.log(url);
      const response = await fetch(
        url,
      );
      const text = await response.text();
      const parsed = Prism.highlight(text, Prism.languages[lang], lang);
      setCode(parsed);
    };

    fetchCode();
  }, [language, day]);

  return (
    <pre
      data-lang={languages[language]}
      className={`language-${languages[language]}`}
    >
      <code
        dangerouslySetInnerHTML={{
          __html: code,
        }}
      />
    </pre>
  );
};

export default CodeDisplay;
