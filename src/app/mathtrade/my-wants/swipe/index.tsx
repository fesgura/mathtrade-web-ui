"use client";
import { useContext } from "react";
import clsx from "clsx";
import I18N from "@/i18n";
import Thumbnail from "@/components/thumbnail";
import EmptyList from "@/components/emptyList";
import SectionCommon from "@/components/sections/common";
import CommitHeaderVisual from "@/components/want-components/commit/headers/header-visual";
import { PageContext } from "@/context/page";
import { PRIVATE_ROUTES } from "@/config/routes";
import useSwipe from "./useSwipe";
import SwipeFace from "./face";
import SwipeDeck from "./deck";
import type { Direction } from "./model";

const DirectionButton = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    className={clsx(
      "h-8 px-3 rounded-full border text-caption font-bold transition-colors",
      active
        ? "bg-want/10 border-want/40 text-[#0a7a4d]"
        : "bg-white border-gray-200 text-gray-500 hover:text-gray-800"
    )}
    onClick={onClick}
  >
    <I18N id={label} />
  </button>
);

const Swipe = ({ onOpenVisual = () => {} }: { onOpenVisual?: () => void }) => {
  const { mustConfirm, canI, isUserEarlyPay } = useContext(PageContext);
  // That legend describes the checkbox at the bottom of Visual. On Swipe it
  // is a way to get there, not a reason to leave this tab.
  const commitReview = Boolean(mustConfirm && canI.commit && !isUserEarlyPay);
  const {
    ready,
    canEdit,
    hasWants,
    hasItems,
    direction,
    setDirection,
    onlyMissing,
    setOnlyMissing,
    anchors,
    session,
    start,
    exit,
    swipe,
    undo,
    step,
  } = useSwipe();

  if (!ready) return null;

  const pickLabel =
    direction === "item" ? "swipe.pick.item" : "swipe.pick.want";
  const pickHint =
    direction === "item" ? "swipe.pick.hint.item" : "swipe.pick.hint.want";

  return (
    <SectionCommon topNotRounded>
      <div className="px-3 sm:px-8 pt-4 pb-[calc(14rem+env(safe-area-inset-bottom,0px))] lg:pb-28">
        {commitReview ? (
          <div className="max-w-3xl mx-auto text-center text-balance pb-5">
            <p className="font-bold text-danger mb-3">
              <I18N id="swipe.commit.lead" />
            </p>
            <button
              type="button"
              className="h-9 px-4 rounded-full bg-primary text-white text-sm font-bold hover:opacity-90"
              onClick={onOpenVisual}
            >
              <I18N id="swipe.commit.btn" />
            </button>
          </div>
        ) : (
          <CommitHeaderVisual />
        )}
        <div className="flex flex-wrap justify-center items-center gap-1.5 pb-3">
          {(["item", "want"] as Direction[]).map((value) => (
            <DirectionButton
              key={value}
              active={direction === value}
              label={
                value === "item" ? "swipe.direction.item" : "swipe.direction.want"
              }
              onClick={() => setDirection(value)}
            />
          ))}
          <button
            type="button"
            aria-pressed={onlyMissing}
            className={clsx(
              "h-8 px-3 rounded-full border text-caption font-bold transition-colors",
              onlyMissing
                ? "bg-primary text-white border-primary"
                : "bg-white border-gray-200 text-gray-500 hover:text-gray-800"
            )}
            onClick={() => setOnlyMissing(!onlyMissing)}
          >
            <I18N id="swipe.filter.missing" />
          </button>
        </div>

        {!hasWants ? (
          <EmptyList
            visible
            message="MyWants.EmptyList"
            icon="heart"
            ctaText="MyWants.EmptyList.cta"
            ctaHref={PRIVATE_ROUTES.OFFER.path}
          />
        ) : !hasItems ? (
          <EmptyList
            visible
            message="swipe.empty.items"
            icon="offer"
            ctaText="MyWants.EmptyList.cta"
            ctaHref={PRIVATE_ROUTES.OFFER.path}
          />
        ) : session ? (
          <div>
            <div className="max-w-sm mx-auto flex items-center gap-2 mb-3">
              <div className="w-11 h-11 shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <Thumbnail
                  fill
                  contain
                  elements={[
                    {
                      thumbnail: session.anchor.thumbnail,
                      name: session.anchor.title,
                    },
                  ]}
                  className="h-full rounded-none"
                />
              </div>
              <p className="min-w-0 flex-1 font-bold text-sm leading-snug line-clamp-2">
                {session.anchor.title}
              </p>
              <button
                type="button"
                className="shrink-0 h-8 px-3 rounded-full border border-gray-200 text-caption font-bold text-gray-600 hover:bg-gray-50"
                onClick={exit}
              >
                <I18N id="swipe.change" />
              </button>
            </div>

            {session.total === 0 ? (
              <div className="max-w-sm mx-auto text-center py-8">
                <p className="font-bold text-balance mb-4">
                  <I18N
                    id={
                      session.emptyReason === "tag"
                        ? "swipe.empty.tag"
                        : session.emptyReason === "missing"
                          ? "swipe.empty.missing"
                          : "swipe.empty.deck"
                    }
                  />
                </p>
                <DeckActions
                  nextId={session.nextId}
                  onNext={start}
                  onBack={exit}
                />
              </div>
            ) : session.done ? (
              <div className="max-w-sm mx-auto text-center py-6">
                <h3 className="text-lg font-bold mb-1">
                  <I18N id="swipe.done.title" />
                </h3>
                <p className="text-gray-600 mb-4">
                  <I18N
                    id="swipe.done.count"
                    values={[session.yesCount, session.total]}
                  />
                </p>
                <DeckActions
                  nextId={session.nextId}
                  onNext={start}
                  onBack={exit}
                  onAgain={() => start(session.anchor.id)}
                />
              </div>
            ) : session.card ? (
              <div>
                {!canEdit ? (
                  <p className="text-center text-caption font-semibold text-danger mb-2">
                    <I18N id="swipe.locked" />
                  </p>
                ) : null}
                <p className="text-center text-base sm:text-lg font-bold text-balance mb-1">
                  <I18N
                    id={session.promptId}
                    values={[session.anchor.title]}
                  />
                </p>
                <p className="text-center text-caption text-gray-500 mb-1">
                  <I18N
                    id="swipe.progress"
                    values={[session.index + 1, session.total]}
                  />
                </p>
                <div className="max-w-sm mx-auto h-1 rounded-full bg-gray-100 mb-3 overflow-hidden">
                  <div
                    className="h-full bg-want"
                    style={{
                      width: `${(session.index / session.total) * 100}%`,
                    }}
                  />
                </div>
                {session.card.wasYes ? (
                  <p className="text-center text-caption font-bold text-want mb-2">
                    <I18N id="swipe.already" />
                  </p>
                ) : null}
                <SwipeDeck
                  cardKey={session.card.pairKey}
                  title={session.card.face.title}
                  disabled={!canEdit}
                  canUndo={session.canUndo}
                  onSwipe={swipe}
                  onUndo={undo}
                  onStep={step}
                >
                  <SwipeFace face={session.card.face} />
                </SwipeDeck>
                {!canEdit ? (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="h-10 px-4 rounded-full border border-gray-300 bg-white font-bold disabled:opacity-40"
                      disabled={session.index === 0}
                      onClick={() => step(-1)}
                    >
                      <I18N id="swipe.prev" />
                    </button>
                    <button
                      type="button"
                      className="h-10 px-4 rounded-full border border-gray-300 bg-white font-bold"
                      onClick={() => step(1)}
                    >
                      <I18N id="swipe.done.next" />
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <h3 className="text-center font-bold mb-1">
              <I18N id={pickLabel} />
            </h3>
            <p className="text-center text-caption text-gray-500 text-balance mb-4 max-w-md mx-auto">
              <I18N id={pickHint} />
            </p>
            {anchors.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                <I18N id="swipe.empty.search" />
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {anchors.map((anchor) => (
                  <button
                    key={anchor.id}
                    type="button"
                    disabled={anchor.disabled}
                    title={anchor.disabled ? undefined : anchor.face.title}
                    className="text-left rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={() => start(anchor.id)}
                  >
                    <SwipeFace face={anchor.face} size="mini" />
                    <span
                      className={clsx(
                        "block px-1 pt-1 text-[11px] font-bold",
                        anchor.yesCount > 0 ? "text-want" : "text-gray-400"
                      )}
                    >
                      {anchor.disabled ? (
                        <I18N id="swipe.empty.tagShort" />
                      ) : (
                        <I18N id="swipe.score" values={[anchor.yesCount]} />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </SectionCommon>
  );
};

const DeckActions = ({
  nextId,
  onNext,
  onBack,
  onAgain,
}: {
  nextId: number | null;
  onNext: (id: number) => void;
  onBack: () => void;
  onAgain?: () => void;
}) => (
  <div className="flex flex-wrap items-center justify-center gap-2">
    {nextId != null ? (
      <button
        type="button"
        className="h-10 px-4 rounded-full bg-want text-white font-bold"
        onClick={() => onNext(nextId)}
      >
        <I18N id="swipe.done.next" />
      </button>
    ) : null}
    {onAgain ? (
      <button
        type="button"
        className="h-10 px-4 rounded-full border border-gray-300 bg-white font-bold"
        onClick={onAgain}
      >
        <I18N id="swipe.done.again" />
      </button>
    ) : null}
    <button
      type="button"
      className="h-10 px-4 rounded-full border border-gray-300 bg-white font-bold"
      onClick={onBack}
    >
      <I18N id="swipe.done.back" />
    </button>
  </div>
);

export default Swipe;
