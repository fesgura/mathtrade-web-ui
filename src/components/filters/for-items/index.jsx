import {
  InputContainer,
  Select,
  Label,
  Input,
  RangeTwo,
  Switch,
  TagSelector,
} from "@/components/form";
import useFilterItems from "./useFilterItems";
import I18N from "@/i18n";
import NewItemTag from "@/components/item-tags/new-item-tag";
import BanUsers from "@/components/ban/users";
import Icon from "@/components/icon";

const FiltersForItems = () => {
  const {
    data,
    userList,
    loadingUserList,
    typeList,
    banOptions,
    tagList,
    statusList,
    locationList,
    languageList,
    dependencyList,
  } = useFilterItems();

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

        <InputContainer>
          <Label text="filter.Tag" name="tag" size="sm" />
          <TagSelector
            data={data}
            name="tag"
            options={tagList}
          />
          <NewItemTag />
        </InputContainer>
      </fieldset>

      <fieldset className="border-t border-gray-400">
        <legend className="text-center px-2 text-xs text-gray-500 mb-3">
          <I18N id="Users" />
        </legend>
        <InputContainer className="mb-0">
          <Switch data={data} name="hide_my_user">
            <div className="text-xs">
              <I18N id="hideOwnItems.label" />
            </div>
          </Switch>
        </InputContainer>
        <InputContainer>
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
      </fieldset>
      <fieldset className="border-t border-b pb-4 border-gray-400">
        <legend className="text-center px-2 text-xs text-gray-500 mb-3">
          <I18N id="Items" />
        </legend>
        <InputContainer className="mb-1">
          <Switch data={data} name="hide_wanted">
            <div className="text-xs flex items-center gap-1">
              <Icon type="heart" className="text-gray-600"/>
              <I18N id="hideWanted.items.label" />
            </div>
          </Switch>
        </InputContainer>
        <InputContainer>
          <Label text="ban.btn-filter.label.item" name="ignored" size="sm" />
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
          <Label text="filter.Value" name="value" size="sm" />
          <RangeTwo data={data} name="value" />
        </InputContainer>
        <InputContainer>
          <Label text="filter.Status" name="status" size="sm" />
          <Select
            data={data}
            name="status"
            options={statusList}
            multiple
            size="sm"
          />
        </InputContainer>
        <InputContainer>
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
        <InputContainer>
          <Label text="filter.Language" name="language" size="sm" />
          <Select
            data={data}
            name="language"
            options={languageList}
            multiple
            size="sm"
          />
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

export default FiltersForItems;
