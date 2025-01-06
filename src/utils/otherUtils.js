export const capitalizeFirstLetter = (word) => {
  const firstLetter = word.charAt(0);
  const remainingLetters = word.slice(1);
  return firstLetter.toUpperCase() + remainingLetters;
};

export const getQuestionTileId = (category, level) => {
  return `${category}${level}`;
};
