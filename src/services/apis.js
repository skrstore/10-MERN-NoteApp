import { deleteRequest, get, patch, post } from "./requests";

export const loginAPI = async (data) => {
    const response = await post("user/login", data);

    if (!response.error) {
        const token = response.data.token;
        localStorage.setItem("auth_token", token);
        return response;
    } else {
        console.log("ERROR in login");
        return response;
    }
};

export const getUserDetailAPI = async () => {
    const token = localStorage.getItem("auth_token");

    const response = await get("user", {
        Authorization: "Bearer " + token,
    });

    localStorage.setItem("username", response.data.username);
};

export const registerAPI = async (data) => {
    return await post("user/register", data);
};

export const getNotesAPI = async () => {
    const token = localStorage.getItem("auth_token");
    return await get("note", {
        Authorization: "Bearer " + token,
    });
};

export const deleteNoteAPI = async (noteId) => {
    const token = localStorage.getItem("auth_token");
    return await deleteRequest(`note/${noteId}`, {
        Authorization: "Bearer " + token,
    });
};

export const addNewNoteAPI = async (data) => {
    const token = localStorage.getItem("auth_token");
    return await post("note", data, {
        Authorization: "Bearer " + token,
    });
};

export const updateNoteAPI = async (noteId, data) => {
    const token = localStorage.getItem("auth_token");
    return patch(`note/${noteId}`, data, {
        Authorization: "Bearer " + token,
    });
};

export const getNoteDetailAPI = async (nodeId) => {
    const token = localStorage.getItem("auth_token");
    return await get(`note/${nodeId}`, {
        Authorization: "Bearer " + token,
    });
};
