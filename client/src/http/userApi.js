import { $host, $hostAuth } from "."
import { jwtDecode } from 'jwt-decode';
import { startSession } from "../storages/cookie";

export const registration = async (email, password) => {
    const { data } = await $host.post('/registration', { email, password });
    startSession(data.token);
    return jwtDecode(data.token);
}

export const authorization = async (email, password) => {
    const { data } = await $host.post('/login', { email, password });
    startSession(data.token);
    return jwtDecode(data.token);
}

export const check = async () => {
    const { data } = await $hostAuth.get('/auth');
    startSession(data.token);
    return jwtDecode(data.token);
}