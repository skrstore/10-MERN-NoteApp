import React, { Component } from "react";
import { Link } from "react-router-dom";

import InputField from "./../components/InputField";

import { post } from "../services/requests";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleInputChange = (e, name) => {
        this.setState({ [name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        this.sendLoginData();
    };

    sendLoginData = async () => {
        const result = await post("user/login", this.state);

        console.log("RES ", result);
        if (!result.error) {
            const token = result.data.token;
            localStorage.setItem("auth_token", token);
            this.props.history.push("/");
        } else {
            console.log("ERROR in login");
        }
    };

    render() {
        return (
            <div className="row m-0 p-0 justify-content-center">
                <div className="col-10 col-md-8 py-4 row justify-content-center bg-white mt-4 rounded">
                    <div className="col-12 text-center">
                        <h3>Login, here</h3>
                    </div>
                    <form
                        onSubmit={this.handleSubmit}
                        className="mt-4 col-12 col-md-10 col-lg-7"
                    >
                        <InputField
                            name="email"
                            value={this.state.email}
                            onChange={e => this.handleInputChange(e, "email")}
                            type="email"
                        />
                        <InputField
                            name="password"
                            value={this.state.password}
                            onChange={e =>
                                this.handleInputChange(e, "password")
                            }
                            type="password"
                        />
                        <div className="form-group row align-items-center justify-content-around mt-5">
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="col-12 text-center">
                        <p>
                            Don't have a account,{" "}
                            <Link to="/register">Register here</Link>{" "}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
