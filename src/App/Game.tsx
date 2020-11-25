import React, { useState, useMemo } from "react";
import { Generator, ICellContent, OpenCell } from "../Classes/Generator";
import { Cell } from "./Cell";
import "./Game.less";

const MAX_IN_GRID = 20;
const HIDDEN_ELEMENTS = 10;
const ELEMENT_SIZE = 50;

export interface IGameProps {
  cols: number;
  rows: number;
  bombs: number;
  onStart: () => void;
  onStop: () => void;
}

export const Game = (props: IGameProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [map, setMap] = useState<ICellContent[][] | null>(null);
  const [startPoint, setStartPoint] = useState({
    x: 0,
    y: 0,
    xPrev: 0,
    yPrev: 0,
  });

  const grid = useMemo(() => {
    const array: number[][] = [];
    for (let i = 0; i < props.rows; i++) {
      array[i] = [];
      for (let j = 0; j < props.cols; j++) {
        array[i][j] = j;
      }
    }
    return array;
  }, [props.cols, props.rows]);

  return (
    <div
      className="grid"
      onClick={(e) => {
        //@ts-ignore
        const element = e.nativeEvent.toElement;
        const iPos = +element.attributes.ipos.value;
        const jPos = +element.attributes.jpos.value;
        if (isStarted) {
          setMap(OpenCell(map, iPos, jPos, props.rows, props.cols));
        } else {
          setIsStarted(true);
          props.onStart();
          const generatedMap = Generator(
            props.rows,
            props.cols,
            props.bombs,
            iPos,
            jPos
          );
          setMap(OpenCell(generatedMap, iPos, jPos, props.rows, props.cols));
        }
      }}
      onScroll={(e) => {
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
          startPoint.x < props.cols - HIDDEN_ELEMENTS
        ) {
          newStartPoint.x = props.cols - HIDDEN_ELEMENTS;
        }

        if (scrollLeft < 20 && startPoint.x > 0) {
          newStartPoint.x = 0;
        }

        if (
          scrollLeft > startPoint.xPrev &&
          startPoint.x < props.cols - HIDDEN_ELEMENTS
        ) {
          newStartPoint.x++;
        }

        if (scrollLeft < startPoint.xPrev && startPoint.x > 0) {
          newStartPoint.x--;
        }

        if (scrollTop < 20 && startPoint.y > 0) {
          newStartPoint.y = 0;        
          newStartPoint.yPrev = 0;
        }

        if (
          scrollTop + height > scrollHeight - 20 &&
          startPoint.y < props.rows - HIDDEN_ELEMENTS
        ) {
          newStartPoint.y = props.rows - HIDDEN_ELEMENTS;
          newStartPoint.yPrev = scrollTop;
        }

        //if (startPoint.yPrev !== -1) {
          if (
            scrollTop > startPoint.yPrev + 5 &&
            startPoint.y < props.rows - HIDDEN_ELEMENTS
          ) {
            
            newStartPoint.yPrev = scrollTop;
            newStartPoint.y+=1;
            //newStartPoint.yPrev = -1; //mark as ignore it
          }

          if (scrollTop < startPoint.yPrev - 5 && startPoint.y > 0) {
            newStartPoint.y-=1;
            newStartPoint.yPrev = scrollTop;
            //newStartPoint.yPrev = -1; //mark as ignore it
          }
       // }
        setStartPoint(newStartPoint);
      }}
    >
      {startPoint.y > HIDDEN_ELEMENTS ? <div style={{
        height: `${startPoint.yPrev}px`
      }}></div> : null}
      {grid.map((row, index) => {
        if (
          index <
            startPoint.y -
              HIDDEN_ELEMENTS -
              (startPoint.y + MAX_IN_GRID + HIDDEN_ELEMENTS > props.rows
                ? startPoint.y + MAX_IN_GRID + HIDDEN_ELEMENTS - props.rows
                : 0) ||
          index >
            startPoint.y +
              MAX_IN_GRID +
              HIDDEN_ELEMENTS +
              (startPoint.y < HIDDEN_ELEMENTS
                ? HIDDEN_ELEMENTS - startPoint.y
                : 0)
        ) {
          return null;
        }
        return (
          <div className={`grid__row ${index}`} key={index}>
            {row.map((cell, indexCell) => {
              const customAttr = { ipos: `${index}`, jpos: `${indexCell}` };
              if (
                indexCell <
                  startPoint.x -
                    HIDDEN_ELEMENTS -
                    (startPoint.x + MAX_IN_GRID + HIDDEN_ELEMENTS > props.cols
                      ? startPoint.x +
                        MAX_IN_GRID +
                        HIDDEN_ELEMENTS -
                        props.cols
                      : 0) ||
                indexCell >
                  startPoint.x +
                    MAX_IN_GRID +
                    HIDDEN_ELEMENTS +
                    (startPoint.x < HIDDEN_ELEMENTS
                      ? HIDDEN_ELEMENTS - startPoint.x
                      : 0)
              ) {
                return null;
              }
              return (
                <div className="grid__cell" key={indexCell} {...customAttr}>
                  <Cell
                    attrs={customAttr}
                    data={map ? map[index][indexCell] : null}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
