export const CheckLocation = (location) => {
  const postViewPath = /^\/p\/[a-zA-Z0-9]+$/;
  return !postViewPath.test(location);
};
