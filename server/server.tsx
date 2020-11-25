import path from "path";
import express from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import { StaticRouter as Router } from "react-router";
import cookieParser from "cookie-parser";
import template from "./template";

import { Index } from "../src/App/Index";

const app = express(),
resourcesPath = path.join("", ".");

app.use(cookieParser());



function renderApp(req: any, res: any) {
  const context: { url?: string } = {};
  console.log(`Render location ${req.url}`)
  let body = ReactDOM.renderToString(
    <Index />
  );
    
  res.write(
    template({
      body: body,
      title: 'Minesweepers',
      serialized: JSON.stringify({serverData: `I know that this isn't useful in current task, we could get some data on server side and move it to client`}),
    })
  );
  res.end();
  
}

app.use(express.static(resourcesPath));
app.get("/", renderApp);
app.get("/*", renderApp);


const port = process.env.PORT || 777;
const expressServer = app.listen({ port }, () =>
  console.log(`🚀 Server ready`)
);

