"use client";
import ItemChange from "./item";
import UserHub, { UserCaption } from "./user";
import I18N from "@/i18n";
import Chip from "@/components/chip";
import { FlowArrow } from "@/components/svg/trade-arrows";

const ChangeSection = ({ result }: { result: any }) => {
  const {
    item_from,
    item_to,
    membership_from,
    membership_to,
    delivered,
    received,
  } = result || {};

  return (
    <div className="py-5 border-b border-gray-200">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto_minmax(0,1fr)] gap-x-1.5 sm:gap-x-3 sm:max-w-xl sm:mx-auto">
        <h3 className="col-start-1 row-start-1 text-sm font-bold text-want mb-2">
          <I18N id="results.col.receive" />
        </h3>
        <h3 className="col-start-5 row-start-1 text-sm font-bold text-secondary mb-2">
          <I18N id="results.col.offer" />
        </h3>

        <div className="col-start-1 row-start-2 min-w-0 h-full">
          <ItemChange item={item_from} />
        </div>
        <div className="col-start-2 row-start-2 self-center">
          <FlowArrow tone="want" />
        </div>
        <div className="col-start-3 row-start-2 self-center">
          <UserHub />
        </div>
        <div className="col-start-4 row-start-2 self-center">
          <FlowArrow tone="give" />
        </div>
        <div className="col-start-5 row-start-2 min-w-0 h-full">
          <ItemChange item={item_to} />
        </div>

        {received || delivered ? (
          <>
            <div className="col-start-1 row-start-3 mt-1.5">
              {received ? (
                <Chip tone="want">
                  <I18N id="received.already" />
                </Chip>
              ) : null}
            </div>
            <div className="col-start-5 row-start-3 mt-1.5">
              {delivered ? (
                <Chip tone="done">
                  <I18N id="delivered.already" />
                </Chip>
              ) : null}
            </div>
          </>
        ) : null}

        <div className="col-start-1 row-start-4 min-w-0">
          <UserCaption user={membership_from} side="from" />
        </div>
        <div className="col-start-5 row-start-4 min-w-0">
          <UserCaption user={membership_to} side="to" />
        </div>
      </div>
    </div>
  );
};

export default ChangeSection;
