import React, { Component } from "react";

export default class InputField extends Component {
    render() {
        const { name, type = "text", value, onChange, ...rest } = this.props;
        return (
            <div className="form-group row align-items-center">
                <label
                    htmlFor={name}
                    className="pl-0 col-4 m-0 font-weight-bold"
                >
                    {name.toUpperCase()}
                </label>
                <input
                    type={type}
                    id={name}
                    name={name}
                    className="form-control col-8"
                    value={value}
                    onChange={onChange}
                    {...rest}
                />
            </div>
        );
    }
}
