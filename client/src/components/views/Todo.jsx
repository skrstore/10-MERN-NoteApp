import React, { Component } from "react";
import Axios from "axios";
import TodoList from "../common/TodoList";
import InputArea from "../common/InputArea";
// import TodoBoxContainer from "../common/TodoBoxContainer";

import "./view.scss";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeTodo: null,
      isNewTodo: false,
    };
    this.baseURL = "http://localhost:5000/api/todo/";
    this.token = localStorage.getItem("auth_token");
  }

  componentDidMount() {
    this.getTodosFromServer();
  }

  getTodosFromServer = async () => {
    try {
      const result = await Axios({
        baseURL: this.baseURL,
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      this.setState({ todoList: result.data.data });
    } catch (error) {
      this.props.history.push("/login");
    }
  };

  handleTodoDelete = async () => {
    try {
      const { activeTodo } = this.state;
      const result = await Axios({
        baseURL: this.baseURL + String(activeTodo._id),
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      console.log(result.data.data);
      this.getTodosFromServer();
      this.setState({ activeTodo: null });
    } catch (error) {
      this.props.history.push("/login");
    }
  };

  handleTodoAddNew = async () => {
    this.setState({ isNewTodo: true, activeTodo: {} });
  };

  addNewTodoToServer = async () => {
    try {
      const { activeTodo } = this.state;
      // if (newTodo.trim()) {
      const result = await Axios({
        baseURL: this.baseURL,
        method: "POST",
        data: { title: activeTodo.title, todo: activeTodo.todo },
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      console.log(result.data);
      this.getTodosFromServer();
      // }
      this.setState({ activeTodo: null });
    } catch (error) {
      this.props.history.push("/login");
    }
  };

  handleTodoUpdate = async () => {
    try {
      const { activeTodo } = this.state;
      // if (newTodo.trim()) {
      const result = await Axios({
        baseURL: this.baseURL + String(activeTodo._id),
        method: "PATCH",
        data: { title: activeTodo.title, todo: activeTodo.todo },
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      console.log(result.data);
      this.getTodosFromServer();
      // }
      this.setState({ activeTodo: null });
    } catch (error) {
      this.props.history.push("/login");
    }
  };

  setActiveTodo = async (id) => {
    try {
      this.setState({ isNewTodo: false });

      const result = await Axios({
        baseURL: this.baseURL + String(id),
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });

      if (!result.data.error) {
        this.setState({ activeTodo: result.data.data });
      }
    } catch (error) {}
  };

  handleTodoValueChange = (e, field) => {
    this.setState({
      activeTodo: { ...this.state.activeTodo, [field]: e.target.value },
    });
  };

  render() {
    return (
      <div className="row p-0 m-0 h-100">
        <div className="col-4 p-0 m-0 h-100 bg-white">
          <TodoList
            Todos={this.state.todoList}
            setActiveTodo={this.setActiveTodo}
          />
        </div>
        <div className="col-8 row justify-content-center text-center align-items-center">
          {this.state.activeTodo ? (
            <InputArea
              todo={this.state.activeTodo}
              isNewTodo={this.state.isNewTodo}
              handleTodoValueChange={this.handleTodoValueChange}
              handleTodoUpdate={this.handleTodoUpdate}
              handleTodoDelete={this.handleTodoDelete}
              addNewTodoToServer={this.addNewTodoToServer}
            />
          ) : (
            <p>Select a Todo from the List</p>
          )}
        </div>
        <div className="addNewBtnContainer">
          <button className="btn bg-white" onClick={this.handleTodoAddNew}>
            Add New
          </button>
        </div>
      </div>
    );
  }
}
