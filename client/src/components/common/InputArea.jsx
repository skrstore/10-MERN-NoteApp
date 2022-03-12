import React, { Component } from "react";

export default class InputArea extends Component {
  render() {
    const {
      todo: { title = "", todo = "" },
      isNewTodo,
      handleTodoValueChange,
      handleTodoUpdate,
      handleTodoDelete,
      addNewTodoToServer,
    } = this.props;

    return (
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => handleTodoValueChange(e, "title")}
        />
        <textarea
          className="form-control"
          rows="5"
          value={todo}
          onChange={(e) => handleTodoValueChange(e, "todo")}
          placeholder="Type here..."
        ></textarea>
        {isNewTodo ? (
          <div className="form-group">
            <button onClick={addNewTodoToServer} className="btn btn-success">
              Save
            </button>
          </div>
        ) : (
          <div className="form-group row justify-content-around">
            <button onClick={handleTodoUpdate} className="btn btn-success">
              Update
            </button>
            <button onClick={handleTodoDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}
