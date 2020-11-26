export const GetFirstIndex = (
  start: number,
  MAX_IN_GRID: number,
  HIDDEN_ELEMENTS: number,
  count: number
) => {
  const rightPosition = start + MAX_IN_GRID + HIDDEN_ELEMENTS;
  // get elements before visible area. "Hidden elements" for getting proper scroll
  // if we're staying at the beginning let's get next elements
  const leftPosition =
    start -
    HIDDEN_ELEMENTS -
    (rightPosition > count ? rightPosition - count : 0);

  return leftPosition > 0 ? leftPosition : 0;
};

export const GetLastIndex = (
  start: number,
  MAX_IN_GRID: number,
  HIDDEN_ELEMENTS: number,
  count: number
) => {
  const rightPosition =
    start +
    MAX_IN_GRID +
    HIDDEN_ELEMENTS +
    // if we are in very beginning, let's add elements from the end
    (start < HIDDEN_ELEMENTS ? HIDDEN_ELEMENTS - start : 0);


  return (rightPosition > count) ? count : rightPosition
};
