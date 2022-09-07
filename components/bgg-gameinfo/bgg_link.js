import { useId } from "react";
import { UncontrolledTooltip } from "reactstrap";
import Icon from "components/icon";

const twoPointsReg = new RegExp(":", "g");

const BggLink = ({ bgg_id = "" }) => {
  const id = useId("a").replace(twoPointsReg, "");
  return (
    <>
      <a
        href={`https://boardgamegeek.com/boardgame/${bgg_id}/`}
        target="_blank"
        className="bgg-link"
        id={`bgg-link-${id}`}
      >
        BGG <Icon type="external-link" />
      </a>
      <UncontrolledTooltip target={`bgg-link-${id}`}>
        <div className="bgg-game-info_tooltip">Abrir página en la BGG</div>
      </UncontrolledTooltip>
    </>
  );
};

export default BggLink;
