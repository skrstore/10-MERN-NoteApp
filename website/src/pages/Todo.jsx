import React, { Component } from "react";

import { deleteRequest, get, patch, post } from "../services/requests";

import TodoList from "../components/TodoList";
import InputArea from "../components/InputArea";

import "./view.css";

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            activeTodo: null,
            isNewTodo: false,
        };
        this.token = localStorage.getItem("auth_token");
    }

    componentDidMount() {
        this.getTodosFromServer();
    }

    getTodosFromServer = async () => {
        try {
            const result = await get("todo", {
                Authorization: "Bearer " + this.token,
            })
            this.setState({ todoList: result.data });
        } catch (error) {
            this.props.history.push("/login");
        }
    };

    handleTodoDelete = async () => {
        try {
            const { activeTodo } = this.state;

            const result = await deleteRequest("todo/" + String(activeTodo._id), {
                Authorization: "Bearer " + this.token,
            })

            console.log(result.data);
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

            const result = await post("todo", { title: activeTodo.title, todo: activeTodo.todo }, {
                Authorization: "Bearer " + this.token,
            })

            console.log(result);
            this.getTodosFromServer();

            this.setState({ activeTodo: null });
        } catch (error) {
            this.props.history.push("/login");
        }
    };

    handleTodoUpdate = async () => {
        try {
            const { activeTodo } = this.state;

            const result = await patch("todo/" + String(activeTodo._id), { title: activeTodo.title, todo: activeTodo.todo }, {
                Authorization: "Bearer " + this.token,
            })
            console.log(result);

            this.getTodosFromServer();
            this.setState({ activeTodo: null });
        } catch (error) {
            this.props.history.push("/login");
        }
    };

    setActiveTodo = async (id) => {
        try {
            this.setState({ isNewTodo: false });

            const result = await get('todo/' + String(id), { Authorization: "Bearer " + this.token })

            console.log("RE ", result);

            if (!result.error) {
                this.setState({ activeTodo: result.data });
            }
        } catch (error) { }
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
