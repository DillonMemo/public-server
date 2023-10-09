export const convertObjectToAPIString = (obj: object): string => {
  return Object.entries(obj).join('&').replace(/,/g, '=');
};
