import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Notes from "./pages/Notes";
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
                <Navbar />
                <main className="container-fluid">
                    <Switch>
                        <PrivateRoute exact path="/">
                            <Notes />
                        </PrivateRoute>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </main>
            </Router>
        );
    }
}
