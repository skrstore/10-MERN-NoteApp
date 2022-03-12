import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  baseURL = "http://localhost:5000/api/user/";
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInputChange = (e, name) => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.sendLoginData();
  };

  sendLoginData = async (e) => {
    const result = await Axios.post(this.baseURL + "login", this.state);

    console.log(result.data);
    if (!result.data.error) {
      const token = result.data.data.token;
      localStorage.setItem("auth_token", token);
      this.props.history.push("/");
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
            <div className="form-group row align-items-center">
              <label
                htmlFor="email"
                className="pl-0 col-4 m-0 font-weight-bold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control col-8"
                value={this.state.email}
                onChange={(e) => this.handleInputChange(e, "email")}
              />
            </div>
            <div className="form-group row align-items-center">
              <label
                htmlFor="password"
                className="pl-0 col-4 m-0 font-weight-bold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control col-8"
                value={this.state.password}
                onChange={(e) => this.handleInputChange(e, "password")}
              />
            </div>
            <div className="form-group row align-items-center justify-content-around mt-5">
              <button className="btn btn-outline-success" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="col-12 text-center">
            <p>
              Don't have a account, <Link to="/register">Register here</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
