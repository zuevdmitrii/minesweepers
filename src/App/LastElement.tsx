import React from "react";

interface ILastLineProps {
  HIDDEN_ELEMENTS: number;
  currentStartPosition: number;
  ELEMENT_SIZE: number;
  count: number;
  MAX_IN_GRID: number;
  style: string;
}

export const LastElement = React.memo(({
  HIDDEN_ELEMENTS,
  currentStartPosition,
  ELEMENT_SIZE,
  count,
  MAX_IN_GRID,
  style,
}: ILastLineProps) => {
  const rightPosition = currentStartPosition + MAX_IN_GRID + HIDDEN_ELEMENTS;
  return rightPosition < count ? (
    <div
      style={{
        [style]: `${(count - rightPosition) * ELEMENT_SIZE}px`,
      }}
    ></div>
  ) : (
    <></>
  );
});
