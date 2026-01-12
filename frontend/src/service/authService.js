import api from './api';
import { jwtDecode } from "jwt-decode";

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    console.log("logout successful")
    window.location.href = '/login';
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

export const getUserRole = () => {
    return localStorage.getItem('role');
}
