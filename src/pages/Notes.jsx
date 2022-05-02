import React, { Component } from "react";

import DataList from "../components/DataList";
import InputArea from "../components/InputArea";
import {
    addNewNoteAPI,
    deleteNoteAPI,
    getNoteDetailAPI,
    getNotesAPI,
    updateNoteAPI,
} from "../services/apis";

export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            activeNote: null,
            isNewNote: false,
        };
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const result = await getNotesAPI();
        if (!result.error) {
            this.setState({ notes: result.data });
        } else {
            this.props.history.push("/login");
        }
    };

    handleNoteDelete = async () => {
        const { activeNote } = this.state;

        const result = await deleteNoteAPI(String(activeNote._id));
        if (!result.error) {
            this.getNotes();
            this.setState({ activeNote: null });
        } else {
            this.props.history.push("/login");
        }
    };

    handleNoteAddNew = async () => {
        this.setState({ isNewNote: true, activeNote: {} });
    };

    addNewNoteToServer = async () => {
        const { title, detail } = this.state.activeNote;

        const result = await addNewNoteAPI({
            title,
            detail,
        });

        if (!result.error) {
            this.getNotes();
            this.setState({ activeNote: null });
        } else {
            this.props.history.push("/login");
        }
    };

    handleNoteUpdate = async () => {
        const { activeNote } = this.state;

        const result = await updateNoteAPI(String(activeNote._id), {
            title: activeNote.title,
            detail: activeNote.detail,
        });

        if (!result.error) {
            this.getNotes();
            this.setState({ activeNote: null });
        } else {
            this.props.history.push("/login");
        }
    };

    setActiveNote = async (id) => {
        this.setState({ isNewNote: false });

        const result = await getNoteDetailAPI(String(id));

        if (!result.error) {
            this.setState({ activeNote: result.data });
        }
    };

    handleNoteValueChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            activeNote: { ...this.state.activeNote, [name]: value },
        });
    };

    render() {
        return (
            <div className="row pt-1 justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 row">
                    <div className="col-4 p-0 m-0">
                        <DataList
                            data={this.state.notes}
                            setActive={this.setActiveNote}
                        />
                    </div>
                    <div className="col-8 row justify-content-center text-center align-items-center">
                        {this.state.activeNote ? (
                            <InputArea
                                note={this.state.activeNote}
                                isNewNote={this.state.isNewNote}
                                handleNoteValueChange={
                                    this.handleNoteValueChange
                                }
                                handleNoteUpdate={this.handleNoteUpdate}
                                handleNoteDelete={this.handleNoteDelete}
                                addNewNoteToServer={this.addNewNoteToServer}
                            />
                        ) : (
                            <p>Select a Note from the List</p>
                        )}
                    </div>
                </div>
                <div className="addNewBtnContainer">
                    <button
                        className="btn bg-white"
                        onClick={this.handleNoteAddNew}
                    >
                        Add New
                    </button>
                </div>
            </div>
        );
    }
}
