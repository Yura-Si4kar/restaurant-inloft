import axios from 'axios';
import { menuApi } from '../config/config';
import { getSession } from '../storages/cookie';

const $host = axios.create({
    baseURL: menuApi
})

const $hostAuth = axios.create({
    baseURL: menuApi
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${getSession().accessToken}`

    return config;
}

$hostAuth.interceptors.request.use(authInterceptor);

export {
    $host,
    $hostAuth
};