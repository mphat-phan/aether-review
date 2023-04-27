import { AsyncLocalStorage } from 'async_hooks'
import axios from 'axios'
const baseURL = 'http://localhost:5000'
export class API {
    // static config = {
    //     headers: {"Content-Type": "application/json"},
    //     withCredentials: true,
    // }

    static async get(path: string, config?: any) {
        return await axios.get(`${baseURL}/${path}`, { ...config })
    }

    static async post<T>(path: string, payload: T, config?: any) {
        return await axios.post(`${baseURL}/${path}`, payload, { ...config })
    }

    static async delete(path: string, config?: any) {
        return await axios.delete(`${baseURL}/${path}`, { ...config })
    }
}
