import { BASE_URL } from "../constants";

export const get = async (url, headers = {}) => {
    try {
        return await (
            await fetch(BASE_URL + url, {
                headers: {
                    ...headers
                }
            })
        ).json();
    } catch (error) {
        console.log("Error in GET :: ", error);
        return { error: error };
    }
};

export const post = async (url, body, headers = {}) => {
    try {
        return await (
            await fetch(BASE_URL + url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                }
            })
        ).json();
    } catch (error) {
        console.log("Error in POST :: ", error);
        return { error: error };
    }
};

export const deleteRequest = async (url, headers = {}) => {
    try {
        return await (
            await fetch(BASE_URL + url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                }
            })
        ).json();
    } catch (error) {
        console.log("Error in POST :: ", error);
        return { error: error };
    }
};

export const patch = async (url, body, headers = {}) => {
    try {
        return await (
            await fetch(BASE_URL + url, {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                }
            })
        ).json();
    } catch (error) {
        console.log("Error in POST :: ", error);
        return { error: error };
    }
};
