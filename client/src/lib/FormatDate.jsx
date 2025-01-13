const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
};

export default formatDate;
