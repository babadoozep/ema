"use strict"

// require("./index.styl")

import React from "react"
import App from "./app.jsx"
// import routes from "./routes"
// import Router from "react-router"

// let link   = document.createElement("link")
// link.rel   = "shortcut icon"
// link.sizes = "16x16"
// link.type  = "image/x-icon"
// link.href  = require("../assets/images/floppy.png")
// document.head.appendChild(link)

// document.addEventListener("DOMContentLoaded", () =>
//   Router.run(routes, Router.HistoryLocation, (Handler) =>
//     React.render(<Handler />, document.body)
//   )
// )

React.render(<App />, document.body);
