import { Card } from "../types/interfaces";
import api from "./api";

export const getCards = async (
    id_user: number
) => {
    return await api.get('/cards', {
        params: {
            id_user
        }
    })
        .then(response => response.data)
        .catch(() => false);
}

export const insertCard = async (
    card: Card,
) => {
    return await api.post('/cards', card)
        .then(response => response.data)
        .catch(() => false);
}

export const updateCard = async (
    card: Card,
) => {
    return await api.put(`/cards/${card.id}`, card)
        .then(response => response.data)
        .catch(() => false);
}

export const deleteCard = async (
    id: number
) => {
    return await api.delete(`/cards/${id}`)
        .then(() => true)
        .catch(() => false);
}