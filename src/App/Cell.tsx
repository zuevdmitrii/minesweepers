import React from "react";
import { CellStates, ICellContent } from "../Classes/Generator";

export interface ICellProps {
  data: ICellContent | null;
  attrs: { [propname: string]: string };
}

export const Cell = ({ data, attrs }: ICellProps) => {
  return (
    <div {...attrs}>
      {data && data.state === CellStates.opened && data.value}
    </div>
  );
};
