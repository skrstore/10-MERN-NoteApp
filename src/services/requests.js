import { SERVER_URL } from "../constants";

const request = async ({ method, path, body = {}, headers = {} }) => {
    try {
        return await (
            await fetch(SERVER_URL + path, {
                method,
                body:
                    Object.keys(body).length > 0 ? JSON.stringify(body) : null,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
            })
        ).json();
    } catch (error) {
        console.log(`Error (${method}) :: `, error);
        return { error: error };
    }
};

export const get = async (path, headers) => {
    return request({ method: "GET", path, headers });
};

export const post = async (path, body, headers) => {
    return request({ method: "POST", path, body, headers });
};

export const deleteRequest = async (path, headers) => {
    return request({ method: "DELETE", path, headers });
};

export const patch = async (path, body, headers) => {
    return request({ method: "PATCH", path, body, headers });
};
