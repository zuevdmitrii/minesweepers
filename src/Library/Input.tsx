import React from "react";
import "./Input.less";

export interface IInputProps {
  value: string;
  onChange: (value: string) => void;
  caption: string;
  disabled?: boolean
  id?: string
}

export const Input = (props: IInputProps) => {
  return (
    <div className="input">
      <div>{props.caption}</div>
      <input
        id={props.id}
        className="input__text"
        disabled={props.disabled}
        type="text"
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
};
