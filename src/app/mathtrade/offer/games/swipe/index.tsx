"use client";
import { useEffect } from "react";
import clsx from "clsx";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import Thumbnail from "@/components/thumbnail";
import BGGlink from "@/components/bggInfo/bggLink";
import ConfirmModal from "@/components/confirmModal";
import SwipeDeck from "@/app/mathtrade/my-wants/swipe/deck";
import useOfferSwipe from "./useOfferSwipe";

const OfferSwipe = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const swipe = useOfferSwipe(onClose);

  useEffect(() => {
    const scroller = document.querySelector("[data-bug-report-capture]");
    if (!(scroller instanceof HTMLElement)) return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => {
      scroller.style.overflow = mq.matches ? "hidden" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      scroller.style.overflow = "";
    };
  }, []);

  return (
    <div className="max-lg:fixed max-lg:inset-0 max-lg:z-modal max-lg:flex max-lg:flex-col max-lg:bg-gray-100 max-lg:px-4 max-lg:pt-[max(0.75rem,env(safe-area-inset-top))] max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="max-w-sm mx-auto w-full max-lg:max-w-none flex items-center gap-2 mb-3">
        <button
          type="button"
          className="lg:hidden h-10 w-10 shrink-0 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center"
          onClick={swipe.close}
        >
          <span className="sr-only">
            <I18N id="offer.swipe.back" />
          </span>
          <Icon type="chevron-left" />
        </button>
        <p className="min-w-0 flex-1 font-bold text-sm leading-snug">
          <I18N id="offer.swipe.title" />
        </p>
        <button
          type="button"
          className="max-lg:hidden shrink-0 h-8 px-3 rounded-full border border-gray-200 text-caption font-bold text-gray-600 hover:bg-gray-50"
          onClick={swipe.close}
        >
          <I18N id="offer.swipe.back" />
        </button>
      </div>

      {swipe.booting || swipe.waiting ? (
        <p className="max-w-sm mx-auto text-center text-gray-500 py-10">
          <I18N id="offer.swipe.loading" />
        </p>
      ) : swipe.error && !swipe.card ? (
        <p className="max-w-sm mx-auto text-center text-caption font-semibold text-danger py-10">
          <I18N id="offer.swipe.error" />
        </p>
      ) : swipe.empty ? (
        <div className="max-w-sm mx-auto text-center py-8">
          <p className="font-bold mb-4">
            <I18N id="offer.swipe.empty" />
          </p>
        </div>
      ) : swipe.done ? (
        <div className="max-w-sm mx-auto text-center py-6 max-lg:flex-1 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
          <h3 className="text-lg font-bold mb-1">
            <I18N id="offer.swipe.done.title" />
          </h3>
          <p className="text-gray-600 mb-4">
            <I18N
              id="offer.swipe.done.count"
              values={[
                swipe.counts.ignored,
                swipe.counts.favored,
                swipe.counts.wanted,
                swipe.counts.skipped,
              ]}
            />
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              className="h-10 px-4 rounded-full border border-gray-300 bg-white font-bold"
              onClick={swipe.close}
            >
              <I18N id="offer.swipe.back" />
            </button>
          </div>
        </div>
      ) : swipe.card ? (
        <div className="max-lg:flex-1 max-lg:min-h-0 max-lg:flex max-lg:flex-col">
          <p className="text-center text-caption text-gray-500 mb-2">
            <I18N
              id="swipe.progress"
              values={[swipe.index + 1, swipe.total]}
            />
          </p>
          {swipe.error ? (
            <p className="text-center text-caption font-semibold text-danger mb-2">
              <I18N id="offer.swipe.error" />
            </p>
          ) : null}
          <SwipeDeck
            cardKey={`${swipe.card.bggId}-${swipe.retry}`}
            title={swipe.card.title}
            disabled={swipe.busy}
            canUndo={swipe.canUndo}
            onSwipe={swipe.onSwipe}
            onUndo={swipe.onUndo}
            onSkip={swipe.onSkip}
            onDown={swipe.onWant}
            onBeforeDown={swipe.prepareWant}
            downEnabled={swipe.canWant}
            onBeforeSwipe={swipe.prepare}
            stampYes="offer.swipe.favorite"
            stampNo="offer.swipe.ignore"
            stampSkip="offer.swipe.skip"
            stampDown="offer.swipe.want"
            yesIcon="star"
            noIcon="eye-hide"
            yesButtonClass="h-14 w-14 rounded-full bg-amber-500 text-white text-xl flex items-center justify-center hover:bg-amber-600 disabled:opacity-40"
            stampYesClass="border-amber-500 text-amber-600 -rotate-12"
            stampNoClass="border-rose-500 text-rose-600 rotate-12"
            hintId="offer.swipe.hint"
            fill
          >
            <article
              className={clsx(
                "relative rounded-2xl border border-gray-200 overflow-hidden flex flex-col min-w-0 w-full bg-white",
                "max-lg:flex-1 max-lg:min-h-0"
              )}
            >
              <div className="relative overflow-hidden h-[26dvh] min-h-[7.5rem] max-h-72 sm:h-64 max-lg:h-auto max-lg:max-h-none max-lg:min-h-0 max-lg:flex-1">
                <Thumbnail
                  fill
                  contain
                  elements={[
                    {
                      thumbnail: swipe.card.thumbnail,
                      name: swipe.card.title,
                    },
                  ]}
                  className="h-full"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start gap-2">
                  <h3 className="min-w-0 flex-1 font-bold text-base leading-snug line-clamp-2">
                    {swipe.card.title}
                  </h3>
                  {swipe.card.titleLink ? (
                    <div
                      className="shrink-0"
                      onPointerDown={(event) => event.stopPropagation()}
                    >
                      <BGGlink href={swipe.card.titleLink} />
                    </div>
                  ) : null}
                </div>
                <p className="text-caption text-gray-500 mt-1">
                  {swipe.card.year ? <span>{swipe.card.year}</span> : null}
                  {swipe.card.year ? " · " : null}
                  <I18N
                    id={
                      swipe.card.copies === 1
                        ? "offer.swipe.copies.one"
                        : "offer.swipe.copies.many"
                    }
                    values={[swipe.card.copies]}
                  />
                </p>
                {swipe.card.favoriteId ? (
                  <p className="text-caption font-bold text-amber-600 mt-1">
                    <I18N id="offer.swipe.alreadyFavorite" />
                  </p>
                ) : null}
                {swipe.wanted ? (
                  <p className="text-caption font-bold text-want mt-1">
                    <I18N id="offer.swipe.alreadyWanted" />
                  </p>
                ) : null}
                {swipe.card.banId ? (
                  <p className="text-caption font-bold text-rose-600 mt-1">
                    <I18N id="offer.swipe.alreadyIgnored" />
                  </p>
                ) : null}
              </div>
            </article>
          </SwipeDeck>
        </div>
      ) : null}

      <ConfirmModal
        isOpen={swipe.confirming}
        onCancel={swipe.cancelConfirm}
        onConfirm={swipe.confirm}
        title="ban.confirm.game.title"
        description="ban.confirm.game.wanted"
        confirmId="ban.confirm.yes"
      />
    </div>
  );
};

export default OfferSwipe;
