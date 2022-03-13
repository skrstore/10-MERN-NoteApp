import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute = ({ children, ...rest }) => {
    const isLogin = !!localStorage.getItem("auth_token");
    return (
        <Route
            {...rest}
            render={() => {
                return isLogin ? children : <Redirect to="/login" />;
            }}
        />
    );
};

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
                        <PrivateRoute exact path="/">
                            <Todo />
                        </PrivateRoute>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </main>
            </Router>
        );
    }
}
