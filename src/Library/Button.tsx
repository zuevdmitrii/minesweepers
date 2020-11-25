import React from "react";
import "./Button.less";

export interface IButtonProps {
  caption: string;
  onClick: () => void;
}

export const Button = (props: IButtonProps) => {
  return <button className="button" onClick={props.onClick}>{props.caption}</button>
};
