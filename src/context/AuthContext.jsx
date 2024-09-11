import { createContext, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);

    const login = async (email, password) =>{
        try{
            const res = await axios.post('/api/auth/login',{ email, password });
            setAuthToken(res.data.token);
            localStorage.setItem('token', res.data.token);
        }catch(error){
            console.log("login failed!", error)
        }
    }

    const register = async (email, password) => {
        try {
            const res = await axios.post('/api/auth/register', { email, password});
            setAuthToken(res.data.token);
            localStorage.setItem('token', res.data.token);

        } catch (error) {
            console.log("Registration failed!", error)
        }
    }
    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
    };
    return (
        <AuthContext.Provider value = {{ authToken, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }