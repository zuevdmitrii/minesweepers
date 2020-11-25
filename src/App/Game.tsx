import React, { useState, useMemo, useEffect } from "react";
import {
  CellStates,
  Generator,
  ICellContent,
  OpenCell,
} from "../Classes/Generator";
import { Button } from "../Library/Button";
import { Cell } from "./Cell";
import "./Game.less";
import { useRenderAwait } from "./useRenderAwait";
import { useScrollEvent } from "./useScrollEvent";

const MAX_IN_GRID = 50;
const HIDDEN_ELEMENTS = 5;
const ELEMENT_SIZE = 20;

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
  const [isOver, setIsOver] = useState(false)
  const [bombMarked, setBombMarked] = useState(0);
  const { startPoint, onScroll } = useScrollEvent(
    props.cols,
    props.rows,
    HIDDEN_ELEMENTS,
    ELEMENT_SIZE,
    MAX_IN_GRID
  );

  const { callback } = useRenderAwait();

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

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (props.bombs === bombMarked) {
      let countRight = 0;
      map.forEach((row) => {
        row.forEach((cell) => {
          if (cell && cell.value < 0 && cell.state === CellStates.flagged) {
            countRight++;
          }
        });
      });

      if (countRight === props.bombs) {
        setMessage("You are win! Congrats!");
      }
    }
  }, [props.bombs, bombMarked]);

  return (
    <>
      {message && (
        <div className="msg-wrapper">
          {message} <br />{" "}
          <Button caption={"Okay"} onClick={() => setMessage("")} />
        </div>
      )}
      <div
        key={`isOver-${isOver}`}
        className="grid"
        onClick={(e) => {
          //@ts-ignore
          const element = e.nativeEvent.toElement;
          const iPos = +element.attributes.ipos.value;
          const jPos = +element.attributes.jpos.value;
          if (isStarted) {
            OpenCell(map, iPos, jPos, props.rows, props.cols, () => {
              setMessage(`We are thinking, but browser isn't freezed`);
              return callback();
            }).then((res) => {
              setMap(res.newMap);
              if (res.isOver) {
                setIsOver(true)
                setMessage("Game over!");
              } else {
                setMessage("");
              }
            });
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
            OpenCell(generatedMap, iPos, jPos, props.rows, props.cols, () => {
              setMessage(`We are thinking, but browser isn't freezed`);
              return callback();
            }).then((res) => {
              setMap(res.newMap);
              setMessage("");
            });
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          //@ts-ignore
          const element = e.nativeEvent.toElement;
          const iPos = +element.attributes.ipos.value;
          const jPos = +element.attributes.jpos.value;
          if (map && props.bombs > bombMarked) {
            setMap(
              map.map((row, i) => {
                return row.map((cell, j) => {
                  if (i === iPos && j === jPos) {
                    const newCell = cell
                      ? { ...cell }
                      : { value: 0, state: CellStates.closed };
                    if (newCell.state === CellStates.flagged) {
                      newCell.state = CellStates.closed;
                      setBombMarked(bombMarked - 1);
                    } else if (newCell.state === CellStates.closed) {
                      newCell.state = CellStates.flagged;
                      setBombMarked(bombMarked + 1);
                    }
                    return newCell;
                  }
                  return cell;
                });
              })
            );
          }
        }}
        onScroll={onScroll}
      >
        {startPoint.y > HIDDEN_ELEMENTS ? (
          <div
            style={{
              height: `${(startPoint.y - HIDDEN_ELEMENTS) * ELEMENT_SIZE}px`,
            }}
          ></div>
        ) : null}
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
              {startPoint.x > HIDDEN_ELEMENTS ? (
                <div
                  style={{
                    width: `${(startPoint.x - HIDDEN_ELEMENTS) * ELEMENT_SIZE}px`,
                  }}
                ></div>
              ) : null}
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
                      isOver={isOver}
                    />
                  </div>
                );
              })}
              {startPoint.x + MAX_IN_GRID + HIDDEN_ELEMENTS < props.cols ? (
                <div
                  style={{
                    width: `${(props.cols - (startPoint.x + MAX_IN_GRID + HIDDEN_ELEMENTS)) * ELEMENT_SIZE}px`,
                  }}
                ></div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};
