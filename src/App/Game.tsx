import React, { useState, useMemo, useEffect } from "react";
import { GetFirstIndex, GetLastIndex } from "../Classes/Calc";
import {
  CellStates,
  Generator,
  ICellContent,
  OpenCell,
} from "../Classes/Generator";
import { Button } from "../Library/Button";
import { Cell } from "./Cell";
import { FirstElement } from "./FirstElement";
import "./Game.less";
import { LastElement } from "./LastElement";
import { useRenderAwait } from "./useRenderAwait";
import { useScrollEvent } from "./useScrollEvent";
import { Waiting } from "./Waiting";

const MAX_IN_GRID = 40;
const HIDDEN_ELEMENTS = 8;
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
  const [isOver, setIsOver] = useState(false);
  const [bombMarked, setBombMarked] = useState(0);
  const { startPoint, onScroll } = useScrollEvent(
    props.cols,
    props.rows,
    HIDDEN_ELEMENTS,
    ELEMENT_SIZE,
    MAX_IN_GRID
  );

  const { callback } = useRenderAwait();
  const [message, setMessage] = useState<JSX.Element | string>("");

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

  //const grid =
  const startRow = GetFirstIndex(
    startPoint.y,
    MAX_IN_GRID,
    HIDDEN_ELEMENTS,
    props.rows
  );
  const endRow = GetLastIndex(
    startPoint.y,
    MAX_IN_GRID,
    HIDDEN_ELEMENTS,
    props.rows
  );
  const startColumn = GetFirstIndex(
    startPoint.x,
    MAX_IN_GRID,
    HIDDEN_ELEMENTS,
    props.cols
  );
  const endColumn = GetLastIndex(
    startPoint.x,
    MAX_IN_GRID,
    HIDDEN_ELEMENTS,
    props.cols
  );

  const grid = [];
  for (let i = startRow; i < endRow; i++) {
    grid[i] = [
      <FirstElement
        key={'fe'}
        style={"width"}
        HIDDEN_ELEMENTS={HIDDEN_ELEMENTS}
        currentStartPosition={startPoint.x}
        ELEMENT_SIZE={ELEMENT_SIZE}
      />,
    ];
    for (let j = startColumn; j < endColumn; j++) {
      grid[i].push(
        <div className="grid__cell" key={j}>
          <Cell
            i={`${i}`}
            j={`${j}`}
            data={map ? map[i][j] : null}
            isOver={isOver}
          />
        </div>
      );
    }

    grid[i].push(
      <LastElement
        key={'le'}
        style={"width"}
        ELEMENT_SIZE={ELEMENT_SIZE}
        currentStartPosition={startPoint.x}
        HIDDEN_ELEMENTS={HIDDEN_ELEMENTS}
        MAX_IN_GRID={MAX_IN_GRID}
        count={props.cols}
      />
    );
  }

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
              setMessage(<Waiting />);
              return callback();
            }).then((res) => {
              setMap(res.newMap);
              if (res.isOver) {
                setIsOver(true);
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
              setMessage(<Waiting />);
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
        <FirstElement
          style={"height"}
          HIDDEN_ELEMENTS={HIDDEN_ELEMENTS}
          currentStartPosition={startPoint.y}
          ELEMENT_SIZE={ELEMENT_SIZE}
        />
        {grid.map((row, index) => {
          return (
            <div className={`grid__row ${index}`} key={index}>
              {row.map((cell, indexCell) => cell)}
            </div>
          );
        })}
        <LastElement
          style={"height"}
          ELEMENT_SIZE={ELEMENT_SIZE}
          currentStartPosition={startPoint.y}
          HIDDEN_ELEMENTS={HIDDEN_ELEMENTS}
          MAX_IN_GRID={MAX_IN_GRID}
          count={props.rows}
        />
      </div>
    </>
  );
};
