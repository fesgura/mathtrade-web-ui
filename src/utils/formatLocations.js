const normalizeNumKeys = (arrData) => {
  if (!arrData) {
    return {};
  }
  return arrData.reduce((obj, loc) => {
    obj[loc.id] = loc;
    return obj;
  }, {});
};

export const formatLocations = (locationsFromAPI, filterLocationsRaw) => {
  const list = [];

  const filterLocations = normalizeNumKeys(filterLocationsRaw);

  let currentProvince = "none";

  const groupNums = {};

  if (locationsFromAPI) {
    locationsFromAPI.forEach(({ id, name, province }) => {
      if (province !== currentProvince) {
        currentProvince = province;
        list.push({
          type: "group",
          value: province,
          text: province,
          num: 0,
        });
        groupNums[province] = 0;
      }

      let num = 0;
      if (filterLocations && filterLocations[id]) {
        num = filterLocations[id]?.items || 0;
        groupNums[province] += num;
      }

      list.push({
        value: id,
        text: name,
        num,
      });
    });
  }
  return list.map((st) => {
    if (st?.type === "group") {
      return {
        ...st,
        num: groupNums[st.text] || 0,
      };
    }
    return st;
  });
};
