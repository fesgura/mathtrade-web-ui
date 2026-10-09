import { getI18Ntext } from "@/i18n";

// "ready / total" copies; a single number when every copy is ready.
// With onClick it is a button (e.g. to show the member's items).
const Copies = ({
  ready = 0,
  total = 0,
  onClick,
}: {
  ready?: number;
  total?: number;
  onClick?: () => void;
}) => {
  const content =
    ready === total ? (
      <>{total}</>
    ) : (
      <span className="whitespace-nowrap">
        {ready} <span className="text-gray-400">/ {total}</span>
      </span>
    );
  const title = ready === total ? undefined : getI18Ntext("adminUsers.copies.help");

  return onClick ? (
    <button
      type="button"
      className="underline decoration-dotted underline-offset-2 hover:text-primary cursor-pointer"
      title={getI18Ntext("adminUsers.copies.help")}
      onClick={onClick}
    >
      {content}
    </button>
  ) : (
    <span title={title}>{content}</span>
  );
};

export default Copies;
