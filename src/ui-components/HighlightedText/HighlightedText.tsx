export function HighlightedText({
  text,
  searchedText,
}: {
  text: string;
  searchedText: string;
}) {
  const textParts = text.split(new RegExp(`(${searchedText})`, "gi"));
  return (
    <span>
      {textParts.map((part, index) => (
        <span
          key={index}
          className={
            part.toLowerCase() === searchedText.toLowerCase() ? "font-bold" : ""
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
}
