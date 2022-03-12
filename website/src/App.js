import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Todo from "./components/views/Todo";
import Login from "./components/views/Login";
import Register from "./components/views/Register";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar style={{ height: "10vh" }} />
        <main
          className="container-fluid p-0 bg-primary"
          style={{ height: "90vh" }}
        >
          <Switch>
            <Route exact path="/" component={Todo} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </main>
      </Router>
    );
  }
}
