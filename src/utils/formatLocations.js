export const formatLocations = (locationsFromAPI) => {
  const list = [];

  let currentProvince = "none";

  if (locationsFromAPI) {
    locationsFromAPI.forEach(({ id, name, province }) => {
      if (province !== currentProvince) {
        currentProvince = province;
        list.push({
          type: "group",
          value: province,
          text: province,
        });
      }
      list.push({
        value: id,
        text: name,
      });
    });
  }

  return list;
};
