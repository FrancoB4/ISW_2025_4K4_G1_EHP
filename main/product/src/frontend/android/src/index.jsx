import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";

const emailLogin = "anacarokris@gmail.com"

render(<App emailLogin={emailLogin}/>, document.getElementById("root"));