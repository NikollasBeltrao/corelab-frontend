import { User } from "../types/interfaces";
import api from "./api";


export const insertUser = async (
    user: User,
) => {
    return await api.post('/register', user)
        .then(response => response.data)
        .catch((error) => error?.response?.data);
}