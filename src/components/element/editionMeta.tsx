import LinkExternal from "@/components/link-external";
import I18N from "@/i18n";
import { NO_RANK_VALUE } from "@/config/no-bgggame";

type EditionMetaProps = {
  showRank?: boolean;
  rank?: number | null;
  publisher?: string | null;
  publisherLink?: string | null;
  versionNickname?: string | null;
};

// "Ranking 395 · SPIEL INSTABIL (2022) · Spanish deluxe edition".
// The nickname is the BGG version's own name. Copies without one stay as
// they were: rank and publisher only.
const EditionMeta = ({
  showRank = false,
  rank = null,
  publisher = null,
  publisherLink = null,
  versionNickname = null,
}: EditionMetaProps) => {
  const nickname = `${versionNickname ?? ""}`.trim();
  const rankText = rank === NO_RANK_VALUE || rank == null ? "-" : rank;
  const hasPublisher = Boolean(publisher);

  return (
    <>
      {showRank ? (
        <>
          <I18N id="element.BGG.rank" /> {rankText}
        </>
      ) : null}
      {hasPublisher ? (
        <>
          {showRank ? " · " : null}
          <LinkExternal href={publisherLink}>{publisher}</LinkExternal>
        </>
      ) : null}
      {nickname ? (
        <>
          {showRank || hasPublisher ? " · " : null}
          <LinkExternal href={publisherLink}>{nickname}</LinkExternal>
        </>
      ) : null}
    </>
  );
};

export default EditionMeta;
