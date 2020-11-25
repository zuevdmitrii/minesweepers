import React from "react";

export interface IInputProps {
  value: string;
  onChange: (value: string) => void;
  caption: string;
  disabled?: boolean
}

export const Input = (props: IInputProps) => {
  return (
    <div>
      {props.caption}
      <input
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
