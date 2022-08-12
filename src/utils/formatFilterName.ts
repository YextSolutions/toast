const replaceDashes = (str: string): string => {
  return str.replace(/-/g, " ");
};

const formatFilterName = (str: string): string => {
  str = replaceDashes(str);
  return str
    .replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
    .replace(/\s+/g, " ");
};

export default formatFilterName;
