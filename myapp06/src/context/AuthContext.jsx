import React, { createContext, useState, useContext, useEffect } from 'react';
import api from "../api/axios.jsx";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(accessToken) {
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            setIsAuthenticated(true);
        } else {
            delete api.defaults.headers.common['Authorization'];
            setIsAuthenticated(false);
        }
    }, [accessToken]);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // We ask the server for a new access token.
                // The browser automatically sends the HttpOnly refresh token cookie.
                const response = await api.post('/user/refresh-token');
                // If this succeeds, the user has a valid session.
                setAccessToken(response.data.accessToken);
                setIsAuthenticated(true);
            } catch (error) {
                // If it fails, the user is not logged in.
                console.log(error);
                console.log("No active session found.");
            } finally {
                // THIS IS THE LINE THAT FIXES THE "STUCK AT LOADING"
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (school_id, password) => {
        setIsLoading(true); // Set loading true when we attempt to log in
        try {
            const response = await api.post('/user/login', {
                school_id,
                password
            });
            console.log(response);

            const newAccessToken = response?.data?.data?.accessToken;
            setAccessToken(newAccessToken);
            setIsAuthenticated(true);
            
            return response; // Return the full response so the component can use it

        } catch (error) {
            // If login fails, ensure state is reset
            setAccessToken(null);
            setIsAuthenticated(false);
            console.error("Login failed:", error);
            throw error; // Throw error so the component knows it failed

        } finally {
            // CRUCIAL: Set loading to false after the attempt is complete
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post('/user/logout');
        } catch (error) {
            console.log("Logout failed: ", error)
        } finally {
            setAccessToken(null);
            setIsAuthenticated(false);
        }
    }

    const value = {
        accessToken,
        setAccessToken,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}