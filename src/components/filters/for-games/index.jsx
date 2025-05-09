import {
  InputContainer,
  Select,
  Label,
  Input,
  RangeTwo,
  Switch,
} from "@/components/form";
import useFilterGames from "./useFilterGames";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import BanUsers from "@/components/ban/users";
import HelpContext from "@/components/help-context";

const FiltersForGames = () => {
  const { data, typeList, banOptions, dependencyList } = useFilterGames();

  return (
    <>
      <fieldset>
        <InputContainer>
          <Label text="filter.Search" name="keyword" size="sm" />
          <Input
            data={data}
            name="keyword"
            type="search"
            placeholder="filter.Search.placeholder"
            autocomplete="Search"
            ariaLabel="filter.Search"
            icon="search"
            size="sm"
          />
        </InputContainer>
      </fieldset>

      <fieldset className="border-t border-gray-400">
        <legend className="text-center px-2 text-xs text-gray-500 mb-3">
          <I18N id="Users" />
        </legend>
        <InputContainer className="mb-0">
          <Switch name="hide_my_user" data={data}>
            <div className="text-xs">
              <I18N id="hideOwnGames.label" />
            </div>
          </Switch>
        </InputContainer>
        <BanUsers />
      </fieldset>
      <fieldset className="border-t border-b pb-4 border-gray-400">
        <legend className="text-center px-2 text-xs text-gray-500 mb-3">
          <I18N id="Games" />
        </legend>
        <InputContainer className="mb-1">
          <Switch data={data} name="hide_wanted">
            <div className="text-xs flex items-center gap-1">
              <Icon type="heart" className="text-gray-600" />
              <I18N id="hideWanted.games.label" />
            </div>
          </Switch>
        </InputContainer>
        <div className="border-t border-b py-3 border-gray-400 mb-1">
          <InputContainer className="mb-1">
            <Switch data={data} name="wantable">
              <div className="text-xs flex items-center gap-1">
                <Icon type="eye-hide" className="text-gray-600" />
                <I18N id="wantAble.games.label" />
              </div>
            </Switch>
          </InputContainer>
          <HelpContext id="wantAble" />
        </div>

        <InputContainer>
          <div className="flex items-center gap-2 mb-2 pt-4">
            <Label text="ban.btn-filter.label.game" name="ignored" size="sm" />
            <HelpContext id="whatIsThis.ban.game" />
          </div>
          <Select
            data={data}
            name="ignored"
            options={banOptions}
            icon="trash"
            size="sm"
          />
        </InputContainer>

        <InputContainer>
          <Label text="filter.Type" name="type" size="sm" />
          <Select data={data} name="type" options={typeList} size="sm" />
        </InputContainer>
        <InputContainer>
          <Label text="filter.Dependency" name="dependency" size="sm" />
          <Select
            data={data}
            name="dependency"
            options={dependencyList}
            multiple
            size="sm"
          />
        </InputContainer>
        <InputContainer>
          <Label text="filter.Value" name="value" size="sm" />
          <RangeTwo data={data} name="value" />
        </InputContainer>
        <InputContainer>
          <Label text="filter.Rating" name="rate" size="sm" />
          <RangeTwo data={data} name="rate" min={1} />
        </InputContainer>
        <InputContainer>
          <Label text="filter.Weight" name="weight" size="sm" />
          <RangeTwo data={data} name="weight" min={1} max={5} />
        </InputContainer>
      </fieldset>
    </>
  );
};

export default FiltersForGames;
