import React from "react";
import ReactDOM from "react-dom";
import Router from "./Components/Router/Router";

const Index = () => {
  return (
    <div>
      <Router />
    </div>
  )
}

ReactDOM.render(<Index />, document.getElementById("root"));
