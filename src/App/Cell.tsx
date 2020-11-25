import React from "react";
import { CellStates, ICellContent } from "../Classes/Generator";
import "./Cell.less";

export interface ICellProps {
  data: ICellContent | null;
  attrs: { [propname: string]: string };
}

const getClassNameByData = (data: ICellContent | null) => {
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

  if (data && data.state === CellStates.explosioned) {
    return "cell__expl";
  }

  return "cell__closed";
};

export const Cell = ({ data, attrs }: ICellProps) => {
  return (
    <div {...attrs} className={`cell ${getClassNameByData(data)}`}>
      {data && data.state === CellStates.opened && data.value > 0
        ? data.value
        : ""}
    </div>
  );
};
