export const segmentsToColumns = (segments) => {
  if (!segments) {
    return [];
  }

  const list = segments
    .sort((a, b) => {
      return a.item_segment < b.item_segment ? -1 : 1;
    })
    .map((seg) => {
      return [`${seg.item_segment}\nejemplares`, seg.users_count];
    });

  return list;
};
