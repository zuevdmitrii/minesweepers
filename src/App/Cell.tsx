import React from "react";
import { CellStates, ICellContent } from "../Classes/Generator";
import "./Cell.less";

export interface ICellProps {
  data: ICellContent | null;
  attrs: { [propname: string]: string };
  isOver: boolean;
}

const getClassNameByData = (data: ICellContent | null, isOver: boolean) => {
  if (!data) {
    return "cell__closed";
  }

  if (data && data.state === CellStates.opened) {
    if (data.value > 0) {
      return "cell__border";
    } else if (data.value === 0) {
      return "cell__empty";
    }
  }

  if (data && data.state === CellStates.flagged) {
    return "cell__flag";
  }

  if (data && data.state === CellStates.explosioned || data.value < 0 && isOver) {
    return "cell__expl";
  }

  return "cell__closed";
};

export const Cell = ({ data, attrs, isOver }: ICellProps) => {
  return (
    <div {...attrs} className={`cell ${getClassNameByData(data, isOver)}`}>
      {data && data.state === CellStates.opened && data.value > 0
        ? data.value
        : ""}
    </div>
  );
};
