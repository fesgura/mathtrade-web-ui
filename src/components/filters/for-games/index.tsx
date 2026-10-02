"use client";
import {
  InputContainer,
  Label,
  RangeTwo,
  Switch,
} from "@/components/form";
import useFilterGames from "./useFilterGames";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import BanUsers from "@/components/ban/users";
import UnignoreAll from "@/components/ban/unignore-all";
import HelpContext from "@/components/help-context";
import FilterBlock from "../block";
import TypeChips from "../typeChips";
import OptionChips from "../optionChips";
import { banOptionsValues } from "@/config/banOptions";

const FiltersForGames = () => {
  const { data, typeList, banOptions, dependencyList } = useFilterGames();

  return (
    <>
      <FilterBlock titleId="Users">
        <InputContainer className="mb-2">
          <Switch data={data} name="favorite">
            <div className="text-xs flex items-center gap-1">
              <Icon type="star" className="text-amber-500" />
              <I18N id="favorite.filter.games" />
            </div>
          </Switch>
        </InputContainer>
        <InputContainer className="mb-2">
          <Switch name="hide_my_user" data={data}>
            <div className="text-xs">
              <I18N id="hideOwnGames.label" />
            </div>
          </Switch>
        </InputContainer>
        <BanUsers />
      </FilterBlock>

      <FilterBlock titleId="Games">
        <TypeChips type="game" options={typeList} />
        {dependencyList.length ? (
          <div className="mt-3">
            <div className="text-xs font-semibold text-gray-500 mb-1.5">
              <I18N id="filter.Dependency" />
            </div>
            <OptionChips
              filterType="game"
              name="dependency"
              options={dependencyList}
              multiple
            />
          </div>
        ) : null}
      </FilterBlock>

      <details className="border-t border-gray-200 pt-2">
        <summary className="cursor-pointer text-sm font-semibold text-gray-500">
          <I18N id="filter.more" />
        </summary>
        <div className="pt-3 flex flex-col gap-4">
          <InputContainer className="mb-0">
            <Switch data={data} name="hide_wanted">
              <div className="text-xs flex items-center gap-1">
                <Icon type="heart" className="text-gray-600" />
                <I18N id="hideWanted.games.label" />
              </div>
            </Switch>
          </InputContainer>

          <div>
            <InputContainer className="mb-1">
              <Switch data={data} name="wantable">
                <div className="text-xs flex items-center gap-1">
                  <Icon type="eye-hide" className="text-gray-600" />
                  <I18N id="wantAble.games.label" />
                </div>
              </Switch>
            </InputContainer>
            <HelpContext id="wantAble" variant="link" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-gray-500">
                <I18N id="ban.btn-filter.label.game" />
              </span>
              <HelpContext id="whatIsThis.ban.game" variant="link" />
            </div>
            <OptionChips
              filterType="game"
              name="ignored"
              options={banOptions}
              mapIn={(value) =>
                value === true
                  ? banOptionsValues.true_value
                  : value === false
                    ? banOptionsValues.false_value
                    : banOptionsValues.undefined_value
              }
              mapOut={(value) =>
                value === banOptionsValues.true_value
                  ? true
                  : value === banOptionsValues.false_value
                    ? false
                    : undefined
              }
            />
            <UnignoreAll />
          </div>

          <InputContainer className="mb-0">
            <Label text="filter.Value" name="value" size="sm" />
            <RangeTwo data={data} name="value" />
          </InputContainer>
          <InputContainer className="mb-0">
            <Label text="filter.Rating" name="rate" size="sm" />
            <RangeTwo data={data} name="rate" min={1} />
          </InputContainer>
          <InputContainer className="mb-0">
            <Label text="filter.Weight" name="weight" size="sm" />
            <RangeTwo data={data} name="weight" min={1} max={5} />
          </InputContainer>
        </div>
      </details>
    </>
  );
};

export default FiltersForGames;
