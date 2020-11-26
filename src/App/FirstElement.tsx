import React from "react";

interface IFirstLineProps {
  HIDDEN_ELEMENTS: number;
  currentStartPosition: number;
  ELEMENT_SIZE: number;
  style: string;
}

export const FirstElement = React.memo(({
  HIDDEN_ELEMENTS,
  currentStartPosition,
  ELEMENT_SIZE,
  style,
}: IFirstLineProps) => {
  return currentStartPosition > HIDDEN_ELEMENTS ? (
    <div
      style={{
        [style]: `${(currentStartPosition - HIDDEN_ELEMENTS) * ELEMENT_SIZE}px`,
      }}
    ></div>
  ) : (
    <></>
  );
});
