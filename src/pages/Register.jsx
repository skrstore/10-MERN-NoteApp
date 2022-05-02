import React, { Component } from "react";
import { Link } from "react-router-dom";

import InputField from "./../components/InputField";
import { registerAPI } from "../services/apis";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
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
        const result = await registerAPI(this.state);

        if (!result.error) {
            this.props.history.push("/login");
        }
    };

    handleReset = () => {
        this.setState({
            username: "",
            email: "",
            password: "",
        });
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-10 col-md-6 col-lg-4 py-4 row justify-content-center bg-white mt-4 rounded">
                    <div className="col-12 text-center mb-4">
                        <h3>Register, here</h3>
                    </div>
                    <form
                        onSubmit={this.handleSubmit}
                        onReset={this.handleReset}
                        className="mt-4 col-12 col-md-10 col-lg-7"
                    >
                        <InputField
                            name="username"
                            value={this.state.username}
                            required
                            onChange={this.handleInputChange}
                        />
                        <InputField
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            type="email"
                        />
                        <InputField
                            name="password"
                            required
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type="password"
                        />
                        <div className="form-group row align-items-center justify-content-around mt-5">
                            <button
                                className="btn btn-outline-secondary"
                                type="reset"
                            >
                                Reset
                            </button>
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className="col-12 text-center">
                        <p>
                            Already have a account,{" "}
                            <Link to="/login">Login here</Link>{" "}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
