export const getSafeImageUrl = (url) => {
  return url
    ? import.meta.env.VITE_API_URL + url
    : "https://i.pinimg.com/736x/17/1e/80/171e801d1087fb607bc835f7e5aecc8e.jpg";
};
