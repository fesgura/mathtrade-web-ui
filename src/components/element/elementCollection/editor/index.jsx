import InnerButton from "@/components/button/inner-button";
import I18N from "@/i18n";
import useElementEditor from "./useElementEditor";
import Thumbnail from "@/components/thumbnail";
import BGGinfo from "@/components/bggInfo";
import {
  Form,
  Input,
  InputContainer,
  Label,
  Select,
  Hidden,
} from "@/components/form";
import { languagesOptions } from "@/config";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import PhotoUploader from "@/components/photoUploader";
import Icon from "@/components/icon";
import { boxSizesOptions } from "@/config/boxSizes";
import BoxSize from "@/components/boxSize";
import RadioList from "@/components/form/inputTypes/radioList";
import Question from "@/components/question";
import BGGlink from "@/components/bggInfo/bggLink";

const boxSizesOptionsList = boxSizesOptions.map((option) => {
  const { value } = option;
  return { value, text: <BoxSize value={value} /> };
});

const ElementEditor = ({ newBGGinfo, toggleEditingMode }) => {
  const {
    loading,
    error,
    noGame,
    //
    name,
    thumbnail,
    bgg_version_id,
    box_size,
    language,
    publisher,
    year,
    setName,
    setThumbnail,
    setBgg_version_id,
    setBox_size,
    setLanguage,
    setPublisher,
    setYear,
    //
    game,
    item_id,
    hiddenInputs,
    //
    versions,
    //
    thumbnailAlt,
    setThumbnailAlt,
    //
    onLoadedNewThumbnail,
    //
    onCancel,
    //
    validations,
    onSubmit,
  } = useElementEditor({
    newBGGinfo,
    toggleEditingMode,
  });

  return (
    <div className="relative">
      <Form validations={validations} onSubmit={onSubmit}>
        <div className="sm:flex">
          <div className="w-52 sm:mb-0 mb-4 mx-auto text-center">
            <InputContainer
              validate="thumbnail"
              customErrorText="error.thumbnail"
            >
              <Thumbnail
                elements={[{ thumbnail, name }]}
                src={thumbnailAlt}
                className="rounded-lg w-52"
              />
            </InputContainer>

            <div className="px-3">
              <PhotoUploader
                className=" border border-gray-300 text-gray-500 rounded-full block w-full p-1 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                onLoaded={onLoadedNewThumbnail}
              >
                <InnerButton>
                  <Icon type="photo" />
                  <span className="text-[10px] font-bold">
                    <I18N id="btn.thumbnail.load" />
                  </span>
                </InnerButton>
              </PhotoUploader>
            </div>
          </div>
          <div className="sm:pl-6 flex-grow">
            {!noGame && (
              <>
                <div className="pr-[60px]">
                  <div className="uppercase text-[10px] font-bold text-gray-400">
                    <I18N id={`element-type-badge-${game?.type || 1}`} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <h3 className="text-lg font-bold">{name}</h3>
                    <BGGlink
                      href={`https://boardgamegeek.com/boardgame/${game.bgg_id}/`}
                    />
                  </div>
                </div>
                <div className="py-3">
                  <div className="pb-5 border-b border-gray-300">
                    <BGGinfo game={game} contextFor="element" />
                  </div>
                </div>
              </>
            )}

            {hiddenInputs.map((k) => {
              return <Hidden data={game} name={k} key={k} />;
            })}
            <Hidden data={{ thumbnail }} name="thumbnail" />
            {item_id ? <Hidden data={{ item_id }} name="item_id" /> : null}

            {!noGame ? (
              <>
                <InputContainer validate="bgg_version_id">
                  <Label
                    text="element.Edition"
                    name="bgg_version_id"
                    required
                  />
                  <Select
                    data={{ bgg_version_id }}
                    name="bgg_version_id"
                    options={versions}
                    icon="book"
                    onMouseOverOption={(opt) => {
                      setThumbnailAlt(opt.thumbnail);
                    }}
                    onMouseOut={() => {
                      setThumbnailAlt(null);
                    }}
                    onChange={(optVal, opt) => {
                      setBgg_version_id(optVal);
                      if (opt) {
                        setThumbnail(opt.thumbnail);
                        setLanguage(opt.language);
                        setPublisher(opt.publisher);
                        setYear(opt.year);
                      }
                    }}
                  />
                </InputContainer>
                <Hidden data={{ name }} name="name" />
              </>
            ) : (
              <>
                <Hidden data={{ bgg_version_id }} name="bgg_version_id" />

                <InputContainer validate="name">
                  <Label text="element.Name" name="name" required />
                  <Input
                    data={{ name }}
                    name="name"
                    onChange={({ target }) => {
                      setName(target.value);
                    }}
                  />
                </InputContainer>
              </>
            )}

            {bgg_version_id ? (
              <>
                <InputContainer validate="language">
                  <Label text="element.Language" name="language" required />
                  <Select
                    data={{ language }}
                    name="language"
                    options={languagesOptions}
                    icon="language"
                    multiple
                    //disabledInput={bgg_version_id !== "other"}
                    onChange={setLanguage}
                  />
                </InputContainer>
                <div className="md:flex gap-3">
                  <div className="flex-grow">
                    <InputContainer validate="publisher">
                      <Label
                        text="element.Publisher"
                        name="publisher"
                        required
                      />
                      <Input
                        data={{ publisher }}
                        name="publisher"
                        icon="publisher"
                        disabledInput={bgg_version_id !== "other"}
                        onChange={(v) => {
                          setPublisher(v.target.value);
                        }}
                      />
                    </InputContainer>
                  </div>
                  <div className="w-32">
                    <InputContainer validate="year">
                      <Label text="element.Year" name="year" required />
                      <Input
                        data={{ year }}
                        name="year"
                        icon="calendar"
                        disabledInput={bgg_version_id !== "other"}
                        onChange={(v) => {
                          setYear(v.target.value);
                        }}
                      />
                    </InputContainer>
                  </div>
                </div>
              </>
            ) : null}

            <div className="mb-5">
              <InputContainer validate="box_size">
                <div className="flex items-center gap-1 mb-3">
                  <Label text="boxSizes.title" name="box_size" required />
                  <Question text="boxSizes.description" />
                </div>

                <RadioList
                  name="box_size"
                  data={{ box_size }}
                  options={boxSizesOptionsList}
                  onChange={setBox_size}
                />
              </InputContainer>
            </div>

            <ErrorAlert error={error} />
            <div className="flex items-center justify-center gap-4 pt-2 pb-5">
              <button
                className="border border-gray-200 text-gray-400 font-bold text-lg px-6 py-1 rounded-full hover:bg-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  onCancel();
                }}
              >
                <I18N id="btn.Cancel" />
              </button>
              <button
                type="submit"
                className=" text-white bg-primary font-bold text-lg px-6 py-1 rounded-full hover:bg-sky-700 hover:text-white transition-colors"
              >
                <I18N id="btn.Save" />
              </button>
            </div>
          </div>
        </div>
      </Form>

      <LoadingBox loading={loading} />
    </div>
  );
};

export default ElementEditor;
