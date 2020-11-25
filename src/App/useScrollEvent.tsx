import { useState } from "react";

export const useScrollEvent = (cols: number, rows: number, HIDDEN_ELEMENTS: number) => {
  const [startPoint, setStartPoint] = useState({
    x: 0,
    y: 0,
    xPrev: 0,
    yPrev: 0,
    yPrevAction: 0,
  });

  return {
    startPoint,
    onScroll: (e:React.UIEvent<HTMLDivElement, UIEvent>) => {
      e.preventDefault()
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
      newStartPoint.xPrev = scrollLeft;
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
      }

      if (scrollTop < 20 && startPoint.y > 0) {
        newStartPoint.y = 0;
        newStartPoint.yPrev = 0;
      }

      if (
        scrollTop + height > scrollHeight - 20 &&
        startPoint.y < rows - HIDDEN_ELEMENTS
      ) {
        newStartPoint.y = rows - HIDDEN_ELEMENTS;
        newStartPoint.yPrev = scrollTop;
      }

      if (
        scrollTop > startPoint.yPrev + 5 &&
        startPoint.y < rows - HIDDEN_ELEMENTS
      ) {
        if (startPoint.yPrevAction !== -1) {
          newStartPoint.y += 2;
          newStartPoint.yPrevAction = 1
        } else {
          newStartPoint.yPrevAction = 0
        }
        newStartPoint.yPrev = scrollTop;
      }

      if (scrollTop < startPoint.yPrev - 5 && startPoint.y > 0) {
        if (startPoint.yPrevAction !== 1) {
          newStartPoint.y -= 2;
          newStartPoint.yPrevAction = -1
        } else {
          newStartPoint.yPrevAction = 0
        }
        newStartPoint.yPrev = scrollTop;
      }
      setStartPoint(newStartPoint);
    }
  }
}