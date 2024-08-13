import api from "./api";

export const auth = async (
    login: string,
    password: string
) => {
    return await api.post('/login', {
        login,
        password
    })
        .then(response => response)
        .catch((error) => error?.response);
}