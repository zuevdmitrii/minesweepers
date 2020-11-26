import React, { useState } from "react";
import { Button } from "../Library/Button";
import { Input } from "../Library/Input";
import { Game } from "./Game";
import "./Index.less";

export const Index = () => {
  const [rows, setRows] = useState("100");
  const [cols, setCols] = useState("100");
  const [bombs, setBombs] = useState("1");
  const [HIDDEN_ELEMENTS, setHiddenElements] = useState("8")
  const [isStarted, setIsStarted] = useState(false)
  const [keyGame, setKeyGame] = useState(0)

  return (
    <div className="app__container">
      <div className="app__control-panel">
        <div className="control-panel__column">
          <Input value={rows} onChange={setRows} caption="Rows:" disabled={isStarted} id={'rows-input'}/>
          <Input value={cols} onChange={setCols} caption="Cols:" disabled={isStarted} id={'cols-input'}/>
        </div>
        <div className="control-panel__column">
          <Input value={bombs} onChange={setBombs} caption="Bombs:" disabled={isStarted}/>
          <br />
          {isStarted && <Button onClick={() => {
            setIsStarted(false)
            setKeyGame(keyGame + 1)
          }} caption={'New Game'} />}
        </div>
        <div className="control-panel__column">
          <Input value={HIDDEN_ELEMENTS} onChange={setHiddenElements} caption="Hidden elements:" id={'hidden-input'}/>
        </div>
      </div>
      <div className="app__game-area">
        <Game
          key={keyGame}
          rows={+rows}
          cols={+cols}
          bombs={+bombs}
          HIDDEN_ELEMENTS={+HIDDEN_ELEMENTS}
          onStart={() => {
            setIsStarted(true)
          }}
          onStop={() => {}}
        />
      </div>
    </div>
  );
};
