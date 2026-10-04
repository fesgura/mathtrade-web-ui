"use client";
import {
  InputContainer,
  Select,
  Label,
  RangeTwo,
  Switch,
} from "@/components/form";
import useFilterItems from "./useFilterItems";
import useApplyToggleFilter from "../useApplyToggleFilter";
import I18N, { getI18Ntext } from "@/i18n";
import BanUsers from "@/components/ban/users";
import UnignoreAll from "@/components/ban/unignore-all";
import Icon from "@/components/icon";
import HelpContext from "@/components/help-context";
import FilterBlock from "../block";
import TypeChips from "../typeChips";
import OptionChips from "../optionChips";
import { banOptionsValues } from "@/config/banOptions";

const FiltersForItems = () => {
  const {
    data,
    userList,
    loadingUserList,
    typeList,
    banOptions,
    statusBoxOptions,
    statusComponentsOptions,
    locationList,
    languageList,
    dependencyList,
  } = useFilterItems();
  const applyToggle = useApplyToggleFilter("item");

  return (
    <>
      <FilterBlock titleId="Users">
        <InputContainer className="mb-2">
          <Switch
            data={data}
            name="favorite"
            onChange={(checked) => applyToggle("favorite", checked)}
          >
            <div className="text-xs flex items-center gap-1">
              <Icon type="star" className="text-amber-500" />
              <I18N id="favorite.filter.items" />
            </div>
          </Switch>
        </InputContainer>
        <InputContainer className="mb-2">
          <Switch
            data={data}
            name="hide_my_user"
            onChange={(checked) => applyToggle("hide_my_user", checked)}
          >
            <div className="text-xs">
              <I18N id="hideOwnItems.label" />
            </div>
          </Switch>
        </InputContainer>
        <InputContainer className="mb-2">
          <Label text="filter.User" name="user" size="sm" />
          <Select
            data={data}
            name="user"
            options={userList}
            loading={loadingUserList}
            icon="user"
            size="sm"
          />
        </InputContainer>
        <BanUsers />
      </FilterBlock>

      <FilterBlock titleId="Items">
        <TypeChips type="item" options={typeList} />
        <InputContainer className="mb-2">
          <Label text="filter.Language" name="language" size="sm" />
          <Select
            data={data}
            name="language"
            options={languageList}
            multiple
            size="sm"
            icon="language"
          />
        </InputContainer>
        <InputContainer className="mb-0">
          <Label text="filter.Location" name="location" size="sm" />
          <Select
            data={data}
            name="location"
            options={locationList}
            multiple
            size="sm"
            icon="location"
          />
        </InputContainer>
      </FilterBlock>

      <details className="border-t border-gray-200 pt-2">
        <summary className="cursor-pointer text-sm font-semibold text-gray-500">
          <I18N id="filter.more" />
        </summary>
        <div className="pt-3 flex flex-col gap-4">
          <InputContainer className="mb-0">
            <Switch
              data={data}
              name="hide_wanted"
              onChange={(checked) => applyToggle("hide_wanted", checked)}
            >
              <div className="text-xs flex items-center gap-1">
                <Icon type="heart" className="text-gray-600" />
                <I18N id="hideWanted.items.label" />
              </div>
            </Switch>
          </InputContainer>

          <div>
            <InputContainer className="mb-1">
              <Switch
                data={data}
                name="wantable"
                onChange={(checked) => applyToggle("wantable", checked)}
              >
                <div className="text-xs flex items-center gap-1">
                  <Icon type="eye-hide" className="text-gray-600" />
                  <I18N id="wantAble.items.label" />
                </div>
              </Switch>
            </InputContainer>
            <HelpContext id="wantAble" variant="link" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-gray-500">
                <I18N id="ban.btn-filter.label.item" />
              </span>
              <HelpContext id="whatIsThis.ban.item" variant="link" />
            </div>
            <OptionChips
              filterType="item"
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
            <div className="flex items-center gap-2 mb-1">
              <Label text="filter.Value" name="value" size="sm" />
              <HelpContext id="whatIsThis.value.item" variant="link" />
            </div>
            <RangeTwo data={data} name="value" />
          </InputContainer>

          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1.5">
              <I18N id="filter.box.Status" />
            </div>
            <OptionChips
              filterType="item"
              name="box_status"
              options={statusBoxOptions}
              allowEmpty
              emptyLabel={getI18Ntext("filter.Type.All")}
            />
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1.5">
              <I18N id="filter.components.Status" />
            </div>
            <OptionChips
              filterType="item"
              name="component_status"
              options={statusComponentsOptions}
              allowEmpty
              emptyLabel={getI18Ntext("filter.Type.All")}
            />
          </div>

          {dependencyList.length ? (
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-1.5">
                <I18N id="filter.Dependency" />
              </div>
              <OptionChips
                filterType="item"
                name="dependency"
                options={dependencyList}
                multiple
              />
            </div>
          ) : null}

          <InputContainer className="mb-0">
            <Label text="filter.Rating.geek" name="rate" size="sm" />
            <RangeTwo data={data} name="rate" min={1} />
          </InputContainer>
          <InputContainer className="mb-0">
            <Label text="filter.Rating.avg" name="average_rate" size="sm" />
            <RangeTwo data={data} name="average_rate" min={1} />
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

export default FiltersForItems;
