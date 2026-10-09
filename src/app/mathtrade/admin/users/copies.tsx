import { getI18Ntext } from "@/i18n";

// "ready / total" copies; a single number when every copy is ready.
const Copies = ({ ready = 0, total = 0 }: { ready?: number; total?: number }) =>
  ready === total ? (
    <>{total}</>
  ) : (
    <span title={getI18Ntext("adminUsers.copies.help")} className="whitespace-nowrap">
      {ready} <span className="text-gray-400">/ {total}</span>
    </span>
  );

export default Copies;
