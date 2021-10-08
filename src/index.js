import React from "react";
import ReactDOM from "react-dom";
import { ProjectsApp } from "./ProjectsApp";
// styles
// yarn add node-sass X
// Error : Node Sass version 6.0.1 is incompatible with ^4.0.0 || ^5.0.0.
// yarn add node-sass@4.14.1
import "./styles/styles.scss";

ReactDOM.render(<ProjectsApp />, document.getElementById("root"));
