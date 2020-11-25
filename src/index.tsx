import React from "react";
import ReactDOM from "react-dom";
import { Index } from "./App/Index";

// IPageData could
interface IPageData {}

function startApp(pageData: IPageData) {
  ReactDOM.render(
    <Index />,
    document.getElementById("main")
  );
}

//@ts-ignore
if (window.__SERIALIZED_DATA) {
  //@ts-ignore
  startApp(window.__SERIALIZED_DATA);
} else {
  // btw here is approach how to separate load with data from server and without
  startApp({} as IPageData);
}
