import FiltersComp from "components/filters";
import { languageList, statusList, dependencyList } from "config";

const minRate = 1;
const maxRate = 10;

const minWeight = 1;
const maxWeight = 5;

const Filters_MT_Games = ({ filters, setFilters }) => {
  return (
    <FiltersComp
      filters={filters}
      clearFilters={() => {
        const newFilters = {};
        [
          "keyword",
          "language[]",
          "dependency[]",
          "status[]",
          "rate-from",
          "rate-to",
          "weight-from",
          "weight-to",
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
          label: "Buscar",
          icon: "search",
          size: "md",
          placeholder: "Escribí alguna palabra...",
          hr: true,
          data: {
            keyword: filters?.query?.keyword || "",
          },
        },
        {
          type: "select-multiple",
          name: "status",
          label: "Estado",
          options: statusList,
          placeholder: "Seleccioná...",
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
          name: "language",
          label: "Idioma",
          placeholder: "Seleccioná...",
          options: languageList,
          data: (() => {
            const d = { language: "" };
            if (typeof filters?.query["language[]"] !== "undefined") {
              let list = filters.query["language[]"];
              if (typeof filters.query["language[]"].forEach === "undefined") {
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
          label: "Dependencia de idioma",
          placeholder: "Seleccioná...",
          options: dependencyList.options,
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
          label: "Rating BGG",
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
          label: "Dificultad BGG",
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
  );
};

export default Filters_MT_Games;
