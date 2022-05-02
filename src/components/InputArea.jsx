import React, { Component } from "react";

export default class InputArea extends Component {
    render() {
        const {
            note: { title = "", detail = "" },
            isNewNote,
            handleNoteValueChange,
            handleNoteUpdate,
            handleNoteDelete,
            addNewNoteToServer,
        } = this.props;

        return (
            <div className="col-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handleNoteValueChange}
                />
                <textarea
                    className="form-control"
                    rows="5"
                    name="detail"
                    value={detail}
                    onChange={handleNoteValueChange}
                    placeholder="Type here..."
                ></textarea>
                {isNewNote ? (
                    <div className="form-group">
                        <button
                            onClick={addNewNoteToServer}
                            className="btn btn-success"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="form-group row justify-content-around">
                        <button
                            onClick={handleNoteUpdate}
                            className="btn btn-success"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleNoteDelete}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
