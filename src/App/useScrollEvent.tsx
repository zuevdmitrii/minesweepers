import { useState } from "react";

export const useScrollEvent = (
  cols: number,
  rows: number,
  HIDDEN_ELEMENTS: number,
  ELEMENT_SIZE: number,
  MAX_IN_GRID: number
) => {
  const [startPoint, setStartPoint] = useState({
    x: 0,
    y: 0,
    xPrev: 0,
    yPrev: 0,
    yPrevAction: 0,
  });

  return {
    startPoint,
    onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      e.preventDefault();
      //@ts-ignore
      const scrollLeft = e.target.scrollLeft;
      //@ts-ignore
      const scrollTop = e.target.scrollTop;
      //@ts-ignore
      const width = e.target.offsetWidth;
      //@ts-ignore
      const scrollWidth = e.target.scrollWidth;
      //@ts-ignore
      const height = e.target.offsetHeight;
      //@ts-ignore
      const scrollHeight = e.target.scrollHeight;

      const newStartPoint = { ...startPoint };

      /*newStartPoint.xPrev = scrollLeft;
      if (
        scrollLeft + width > scrollWidth - 20 &&
        startPoint.x < cols - HIDDEN_ELEMENTS
      ) {
        newStartPoint.x = cols - HIDDEN_ELEMENTS;
      }

      if (scrollLeft < 20 && startPoint.x > 0) {
        newStartPoint.x = 0;
      }

      if (
        scrollLeft > startPoint.xPrev &&
        startPoint.x < cols - HIDDEN_ELEMENTS
      ) {
        newStartPoint.x+=1;
      }

      if (scrollLeft < startPoint.xPrev && startPoint.x > 0) {
        newStartPoint.x-=1;
      }*/

      let tempX = Math.round(
        (scrollLeft - HIDDEN_ELEMENTS * ELEMENT_SIZE) / ELEMENT_SIZE
      );
      if (tempX > cols - MAX_IN_GRID - HIDDEN_ELEMENTS) {
        tempX = cols - MAX_IN_GRID - HIDDEN_ELEMENTS;
      }
      newStartPoint.x = tempX > 0 ? tempX : 0;

      let temp = Math.round(
        (scrollTop - HIDDEN_ELEMENTS * ELEMENT_SIZE) / ELEMENT_SIZE
      );
      if (temp > rows - MAX_IN_GRID - HIDDEN_ELEMENTS) {
        temp = rows - MAX_IN_GRID - HIDDEN_ELEMENTS;
      }

      newStartPoint.y = temp > 0 ? temp : 0;

      setStartPoint(newStartPoint);
    },
  };
};
