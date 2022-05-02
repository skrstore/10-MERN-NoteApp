import React, { Component } from "react";
import { Link } from "react-router-dom";

import InputField from "./../components/InputField";
import { getUserDetailAPI, loginAPI } from "../services/apis";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginAPI(this.state);

        if (!result.error) {
            await getUserDetailAPI();
            this.props.history.push("/");
        } else {
            console.log("ERROR in login");
        }
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-10 col-md-6 col-lg-4 py-4 row justify-content-center bg-white mt-4 rounded">
                    <div className="col-12 text-center mb-4">
                        <h3>Login, here</h3>
                    </div>
                    <form
                        onSubmit={this.handleSubmit}
                        className="mt-4 col-12 col-md-10 col-lg-7"
                    >
                        <InputField
                            name="email"
                            value={this.state.email}
                            required
                            onChange={this.handleInputChange}
                            type="email"
                        />
                        <InputField
                            name="password"
                            value={this.state.password}
                            required
                            onChange={this.handleInputChange}
                            type="password"
                        />
                        <div className="row justify-content-around mt-5 mb-3">
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
