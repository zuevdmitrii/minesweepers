import React, { useState } from "react";
import { Input } from "../Library/Input";
import { Game } from "./Game";
import "./Index.less";

export const Index = () => {
  const [rows, setRows] = useState("10");
  const [cols, setCols] = useState("10");
  const [bombs, setBombs] = useState("10");

  return (
    <div className="app__container">
      <div className="app__control-panel">
        <Input value={rows} onChange={setRows} caption="Rows:" />
        <Input value={cols} onChange={setCols} caption="Cols:" />
        <Input value={bombs} onChange={setBombs} caption="Bombs:" />
      </div>
      <div className="app__game-area">
        <Game
          rows={+rows}
          cols={+cols}
          bombs={+bombs}
          onStart={() => {}}
          onStop={() => {}}
        />
      </div>
    </div>
  );
};
