import { API } from '~/utils/api'
import asyncLocalStorage from '~/utils/asyncLocalStorage'
import jwt from 'jsonwebtoken'

export type loginInputs = {
    email: string
    _password: string
    checkbox: boolean
}

export type registerInputs = {
    name: string
    email: string
    password: string
}
export class UserService {
    static async test() {
        return await API.get('api')
    }
    static async login(payload: loginInputs) {
        return await API.post<loginInputs>('api/auth/login', payload, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
    }
    static async refreshToken() {
        return await API.get('api/auth/refresh-token', {
            withCredentials: true
        })
    }
    static async getUsers() {
        const token = await asyncLocalStorage.getItem('token')
        return await API.get('api/auth/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    static async register(payload: registerInputs) {
        return await API.post<registerInputs>('api/auth', payload, {
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
