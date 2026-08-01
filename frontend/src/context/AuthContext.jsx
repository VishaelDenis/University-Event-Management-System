import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

const STORAGE_KEY = "token";
const USER_STORAGE_KEY = "user";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // authData is the AuthResponse payload from the backend:
    // { token, role, userId, name, email }
    const login = (authData) => {
        const { token, ...userInfo } = authData;
        localStorage.setItem(STORAGE_KEY, token);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userInfo));
        setUser(userInfo);
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
