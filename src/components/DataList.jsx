import React, { Component } from "react";

export default class DataList extends Component {
    render() {
        const { data = [], setActive } = this.props;
        return (
            <ul className="list-unstyled h-75">
                {data.map((value) => (
                    <li
                        key={value._id}
                        className="text-truncate w-100 border p-2 btn btn-primary"
                        onClick={() => setActive(value._id)}
                    >
                        {value.title}
                    </li>
                ))}
            </ul>
        );
    }
}
