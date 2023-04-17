import FiltersComp from "components/filters";
import { useState, useEffect } from "react";
import storage from "utils/storage";
import { dependencyList } from "config";
import { Input } from "components/form";
import { Row, Col, Alert } from "reactstrap";
import I18N, { getI18Ntext } from "i18n";
import BannedElements from "components/ban/bannedElements";
import ShowBanned from "components/ban/showBanned";

const minValue = 0;
const maxValue = 10;

const minRate = 1;
const maxRate = 10;

const minWeight = 1;
const maxWeight = 5;

const Filters_MT_Games = ({ filters, setFilters, afterAnyChange }) => {
  const [userId, setUserId] = useState(null);
  const [IshideOwnUser, setIshideOwnUser] = useState(false);
  const [IshideOwnUserAlert, setIshideOwnUserAlert] = useState(false);

  useEffect(() => {
    setIshideOwnUser(filters.query.user ? true : false);
  }, [filters]);

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
      {userId ? (
        <div className="hide-own-user-in-filter pt-0">
          <Input
            value={IshideOwnUser}
            classNameLabelCheckbox="hide-own-user-in-filter_label"
            classNameContainer="m-0"
            type="switch"
            labelCheckbox="hideOwnGames.label"
            name="hideOwnUser"
            //questionMin
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
              <I18N id="hideOwnGames.help" />
            </div>
          </Alert>
        </div>
      ) : null}
      <ShowBanned filters={filters} setFilters={setFilters} type="game" />
      <BannedElements afterAnyChange={afterAnyChange} />
      <FiltersComp
        filters={filters}
        clearFilters={() => {
          const newFilters = {};
          [
            "page",
            "keyword",
            "type",
            "value-from",
            "value-to",
            "rate-from",
            "rate-to",
            "weight-from",
            "weight-to",
            "dependency[]",
          ].forEach((filterName) => {
            newFilters[filterName] = undefined;
          });
          setFilters(newFilters);
        }}
        setFilters={(formData) => {
          const newFilters = { page: undefined };
          if (formData.keyword !== "") {
            newFilters.keyword = formData.keyword;
          } else {
            newFilters.keyword = undefined;
          }
          if (formData.type !== "") {
            newFilters.type = formData.type;
          } else {
            newFilters.type = undefined;
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
            type: "select",
            name: "type",
            label: "filter.Type",
            placeholder: "filter.Type.All",
            options: [
              {
                value: "1",
                text: getI18Ntext("filter.Type.Game"),
              },
              {
                value: "2",
                text: getI18Ntext("filter.Type.Expansion"),
              },
            ],
            // icon: "user",
            size: "md",
            notTranslateOptions: true,
            data: {
              type: filters?.query?.type || "",
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
        ]}
      />
    </>
  );
};

export default Filters_MT_Games;
