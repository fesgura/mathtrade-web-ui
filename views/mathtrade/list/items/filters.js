import FiltersComp from "components/filters";
import { useState, useEffect } from "react";
import storage from "utils/storage";
import Icon from "components/icon";
import { getTextColorByBackgroundColor } from "utils";
import { languageList, statusList, dependencyList } from "config";
import { Row, Col, Alert } from "reactstrap";
import { Input } from "components/form";
import I18N from "i18n";

const minValue = 0;
const maxValue = 10;

const minRate = 1;
const maxRate = 10;

const minWeight = 1;
const maxWeight = 5;

const Filters_MT_Items = ({ filters, setFilters, locations, tagList }) => {
  const [tagSelected, setTagSelected] = useState(null);
  const [userId, setUserId] = useState(null);
  const [IshideOwnUser, setIshideOwnUser] = useState(false);
  const [IshideOwnUserAlert, setIshideOwnUserAlert] = useState(false);

  useEffect(() => {
    if (filters.query.tag) {
      const currentTagArray = tagList.filter((tg) => {
        return `${tg.id}` === `${filters.query.tag}`;
      });
      if (currentTagArray[0]) {
        setTagSelected(currentTagArray[0]);
      }
    } else {
      setTagSelected(null);
    }
    setIshideOwnUser(filters.query.user ? true : false);
  }, [filters, tagList]);

  useEffect(() => {
    const storeData = storage.get();
    setUserId(storeData?.user?.data?.id);

    const storeOptions = storage.getOptions();
    if (!storeOptions?.hideOwnUserAlert) {
      setIshideOwnUserAlert(true);
    }
  }, []);

  return (
    <>
      {tagSelected ? (
        <div className="tag-in-filter">
          <div
            className="tag-in-filter_content"
            style={{
              backgroundColor: tagSelected?.color || "#999999",
              color: getTextColorByBackgroundColor(
                tagSelected?.color || "#000"
              ),
            }}
          >
            <Row className="align-items-center">
              <Col>
                <div className="tag-in-filter_text">
                  {`${tagSelected.name} (${tagSelected.items.length})`}
                </div>
              </Col>
              <Col xs="auto">
                <div
                  className="tag-in-filter_close"
                  onClick={() => {
                    setFilters({ tag: undefined });
                  }}
                >
                  <Icon />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : null}
      {userId ? (
        <div className="hide-own-user-in-filter">
          <Input
            value={IshideOwnUser}
            classNameLabelCheckbox="hide-own-user-in-filter_label"
            classNameContainer="m-0"
            type="switch"
            labelCheckbox="hideOwnItems.label"
            name="hideOwnUser"
            onChange={(v) => {
              setIshideOwnUser(v);
              if (v) {
                storage.setToOptions({
                  hideOwnUser: true,
                });
                setFilters({ user: `-${userId}` });
              } else {
                storage.setToOptions({
                  hideOwnUser: false,
                });
                setFilters({ user: undefined });
              }
            }}
          />
          <Alert
            color="info"
            isOpen={IshideOwnUserAlert}
            toggle={() => {
              storage.setToOptions({
                hideOwnUserAlert: true,
              });
              setIshideOwnUserAlert(false);
            }}
          >
            <div className="hide-own-user-in-filter_help">
              <I18N id="hideOwnItems.help" />
            </div>
          </Alert>
        </div>
      ) : null}
      <FiltersComp
        className="pt-0"
        filters={filters}
        clearFilters={() => {
          const newFilters = { page: undefined };
          [
            "keyword",
            "value-from",
            "value-to",
            "language[]",
            "dependency[]",
            "status[]",
            "location[]",
            "rate-from",
            "rate-to",
            "weight-from",
            "weight-to",
            "tag",
          ].forEach((filterName) => {
            newFilters[filterName] = undefined;
          });
          setFilters(newFilters);
        }}
        setFilters={(formData) => {
          const newFilters = {};
          if (formData.keyword !== "") {
            newFilters.keyword = formData.keyword;
          } else {
            newFilters.keyword = undefined;
          }
          if (formData.value) {
            const valueValues = formData.value.split(",");
            if (
              valueValues[0] !== `${minValue}` ||
              valueValues[1] !== `${maxValue}`
            ) {
              newFilters["value-from"] = valueValues[0];
              newFilters["value-to"] = valueValues[1];
            } else {
              newFilters["value-from"] = undefined;
              newFilters["value-to"] = undefined;
            }
          }
          if (formData.language !== "") {
            newFilters["language[]"] = formData.language.split(",");
          } else {
            newFilters["language[]"] = undefined;
          }
          if (formData.dependency !== "") {
            newFilters["dependency[]"] = formData.dependency
              .split(",")
              .map((text) => {
                return dependencyList.labels.indexOf(text);
              });
          } else {
            newFilters["dependency[]"] = undefined;
          }
          if (formData.status !== "") {
            newFilters["status[]"] = formData.status.split(",");
          } else {
            newFilters["status[]"] = undefined;
          }
          if (formData.location !== "") {
            newFilters["location[]"] = formData.location
              .split(",")
              .map((locName) => {
                const locArr = locations.filter((loc) => {
                  return loc.text === locName;
                });
                return locArr[0].id;
              });
          } else {
            newFilters["location[]"] = undefined;
          }
          if (formData.rate) {
            const rateValues = formData.rate.split(",");
            if (
              rateValues[0] !== `${minRate}` ||
              rateValues[1] !== `${maxRate}`
            ) {
              newFilters["rate-from"] = rateValues[0];
              newFilters["rate-to"] = rateValues[1];
            } else {
              newFilters["rate-from"] = undefined;
              newFilters["rate-to"] = undefined;
            }
          }
          if (formData.weight) {
            const weightValues = formData.weight.split(",");
            if (
              weightValues[0] !== `${minWeight}` ||
              weightValues[1] !== `${maxWeight}`
            ) {
              newFilters["weight-from"] = weightValues[0];
              newFilters["weight-to"] = weightValues[1];
            } else {
              newFilters["weight-from"] = undefined;
              newFilters["weight-to"] = undefined;
            }
          }
          setFilters(newFilters);
        }}
        model={[
          {
            name: "keyword",
            label: "filter.Search",
            icon: "search",
            size: "md",
            placeholder: "filter.Search.placeholder",
            hr: true,
            data: {
              keyword: filters?.query?.keyword || "",
            },
          },
          {
            type: "range-multiple",
            name: "value",
            label: "filter.Value",
            min: minValue,
            max: maxValue,
            data: (() => {
              const d = { value: `${minValue},${maxValue}` };
              if (typeof filters?.query["value-from"] !== "undefined") {
                d.value = `${filters.query["value-from"]},${filters.query["value-to"]}`;
              }
              return d;
            })(),
          },
          {
            type: "select-multiple",
            name: "status",
            label: "filter.Status",
            options: statusList,
            placeholder: "form.SelectOptInstruction",
            notTranslateOptions: true,
            data: (() => {
              const d = { status: "" };

              if (typeof filters?.query["status[]"] !== "undefined") {
                let list = filters.query["status[]"];
                if (typeof filters.query["status[]"].forEach === "undefined") {
                  list = [filters.query["status[]"]];
                }
                d.status = list.join(",");
              }
              return d;
            })(),
          },
          {
            type: "select-multiple",
            name: "location",
            label: "filter.Location",
            placeholder: "form.SelectOptInstruction",
            options: locations,
            notTranslateOptions: true,
            data: (() => {
              const d = { location: "" };

              if (typeof filters?.query["location[]"] !== "undefined") {
                let list = filters.query["location[]"];
                if (
                  typeof filters.query["location[]"].forEach === "undefined"
                ) {
                  list = [filters.query["location[]"]];
                }
                d.location = list
                  .map((id) => {
                    const locArr = locations.filter((loc) => {
                      return `${loc.id}` === `${id}`;
                    });
                    return locArr[0].value;
                  })
                  .join(",");
              }
              return d;
            })(),
          },
          {
            type: "select-multiple",
            name: "language",
            label: "filter.Language",
            placeholder: "form.SelectOptInstruction",
            options: languageList,
            translateType: "language",
            data: (() => {
              const d = { language: "" };
              if (typeof filters?.query["language[]"] !== "undefined") {
                let list = filters.query["language[]"];
                if (
                  typeof filters.query["language[]"].forEach === "undefined"
                ) {
                  list = [filters.query["language[]"]];
                }
                d.language = list.join(",");
              }
              return d;
            })(),
          },
          {
            type: "select-multiple",
            name: "dependency",
            label: "filter.Dependency",
            placeholder: "form.SelectOptInstruction",
            options: dependencyList.options,
            notTranslateOptions: true,
            data: (() => {
              const d = { dependency: "" };
              if (typeof filters?.query["dependency[]"] !== "undefined") {
                let list = filters.query["dependency[]"];
                if (
                  typeof filters.query["dependency[]"].forEach === "undefined"
                ) {
                  list = [filters.query["dependency[]"]];
                }
                d.dependency = list
                  .map((i) => {
                    return dependencyList.options[i].value;
                  })
                  .join(",");
              }
              return d;
            })(),
          },
          {
            type: "range-multiple",
            name: "rate",
            label: "filter.Rating",
            min: minRate,
            max: maxRate,
            data: (() => {
              const d = { rate: `${minRate},${maxRate}` };
              if (typeof filters?.query["rate-from"] !== "undefined") {
                d.rate = `${filters.query["rate-from"]},${filters.query["rate-to"]}`;
              }
              return d;
            })(),
          },
          {
            type: "range-multiple",
            name: "weight",
            label: "filter.Weight",
            min: minWeight,
            max: maxWeight,
            data: (() => {
              const d = { weight: `${minWeight},${maxWeight}` };
              if (typeof filters?.query["weight-from"] !== "undefined") {
                d.weight = `${filters.query["weight-from"]},${filters.query["weight-to"]}`;
              }
              return d;
            })(),
          },
        ]}
      />
    </>
  );
};

export default Filters_MT_Items;
