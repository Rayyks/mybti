export const formatDate = (date, locale = "en-US", options = {}) => {
  if (!date) return null;
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return new Date(date).toLocaleString(locale, {
    ...defaultOptions,
    ...options,
  });
};
