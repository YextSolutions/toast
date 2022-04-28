export const formatSearchResultsTitle = (s: string): string => {
  return s.replaceAll("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
};
