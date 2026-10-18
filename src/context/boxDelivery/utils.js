export const codeNumToString = (codeNum) => {
  const str = "000" + codeNum;
  return str.slice(-4);
};

// Referrers see origin sequence + dest-lane number from the API.
export const formatBoxNumber = (originNumber, destNumber) => {
  if (destNumber == null || destNumber === "") return null;
  if (originNumber == null || originNumber === "") return `${destNumber}`;
  return `${originNumber}-${destNumber}`;
};

// If the API omitted origin_number, recover it from close order so a
// closed box never renders as "—".
export const assignDisplayNumbers = (boxes) => {
  const closed = (boxes || [])
    .filter((box) => box.closed_at && box.number != null && box.number !== "")
    .slice()
    .sort((a, b) => {
      if (a.origin_number != null && b.origin_number != null) {
        return a.origin_number - b.origin_number;
      }
      const closedA = new Date(a.closed_at).getTime();
      const closedB = new Date(b.closed_at).getTime();
      if (closedA !== closedB) return closedA - closedB;
      return Number(a.id) - Number(b.id);
    });

  const originById = {};
  closed.forEach((box, index) => {
    originById[`${box.id}`] =
      box.origin_number != null ? box.origin_number : index + 1;
  });

  return (boxes || []).map((box) => {
    const originNumber = originById[`${box.id}`] ?? box.origin_number;
    return {
      ...box,
      origin_number: originNumber ?? box.origin_number,
      displayNumber: formatBoxNumber(originNumber, box.number),
    };
  });
};
