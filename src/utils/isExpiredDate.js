const isExpiredDate = (expiresDate) => {
  const date = new Date();
  const currentTime = date.getTime();

  return currentTime >= expiresDate;
};

export default isExpiredDate;
