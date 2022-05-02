import React, { Component } from "react";
import { Link } from "react-router-dom";

import InputField from "./../components/InputField";

import { post } from "../services/requests";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
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
        this.sendRegisterData();
    };

    handleReset = () => {
        this.setState({
            username: "",
            email: "",
            password: ""
        });
    };

    sendRegisterData = async () => {
        const result = await post("user/register", this.state);
        console.log("R : ", result);
        if (!result.error) {
            this.props.history.push("/login");
        }
    };

    render() {
        return (
            <div className="row justify-content-center m-0 p-0">
                <div className="col-10 col-md-8 py-4 row justify-content-center bg-white mt-4 rounded">
                    <div className="col-12 text-center">
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
                            onChange={e =>
                                this.handleInputChange(e, "username")
                            }
                        />
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
