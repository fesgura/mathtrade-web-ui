"use client";
import { useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import { fadeLabelClass } from "./fadeLabel";
import { msLeftUntil, timeLeftLabel } from "@/utils/timeLeft";

const EventStatusCard = ({ collapsed = false }: { collapsed?: boolean }) => {
  const { canI, mathtrade } = useContext(PageContext);

  const stage = useMemo(() => {
    if (!mathtrade) return null;
    if (canI?.offer && mathtrade.freeze_geek_date) {
      return {
        titleId: "menu.stage.offer",
        msLeft: msLeftUntil(mathtrade.freeze_geek_date),
      };
    }
    if (canI?.want && mathtrade.freeze_wants_date) {
      return {
        titleId: "menu.stage.want",
        msLeft: msLeftUntil(mathtrade.freeze_wants_date),
      };
    }
    if (canI?.provisionalResults && !canI?.results) {
      return { titleId: "menu.stage.provisional", msLeft: null };
    }
    if (canI?.results) {
      return { titleId: "menu.stage.results", msLeft: null };
    }
    if (mathtrade.start_date) {
      return {
        titleId: "menu.stage.new",
        msLeft: msLeftUntil(mathtrade.start_date),
      };
    }
    return null;
  }, [canI, mathtrade]);

  if (!stage) return null;

  const title = `${getI18Ntext(stage.titleId)}${
    stage.msLeft === null ? "" : ` · ${timeLeftLabel(stage.msLeft)}`
  }`;

  return (
    <div
      className={clsx(
        "flex items-center bg-[#1c1d21] rounded-[10px] mb-1.5 mt-2 text-white text-xs font-semibold h-9 overflow-hidden transition-[width,padding,margin] duration-300 ease-out motion-reduce:transition-none [@media(max-height:800px)]:h-8 [@media(max-height:800px)]:mb-1 [@media(max-height:800px)]:mt-1.5",
        collapsed
          ? "w-11 justify-center mx-auto px-0"
          : "w-full px-2.5"
      )}
      title={collapsed ? title : undefined}
    >
      <Icon type="calendar" className="text-primary shrink-0" />
      <span className={clsx("min-w-0 truncate", fadeLabelClass(!collapsed))}>
        <I18N id={stage.titleId} />
        {stage.msLeft === null ? null : ` · ${timeLeftLabel(stage.msLeft)}`}
      </span>
    </div>
  );
};

export default EventStatusCard;
