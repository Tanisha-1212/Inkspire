import {createContext, useContext, useEffect, useState} from 'react';
import {registerUser, loginUser, logout as logoutApi, getCurrentUser} from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setlLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (err) {
                setUser(null);
            }finally{
                setlLoading(false);
            }
        };

        fetchUser();
    }, []);

    const register = async(data) => {
        try {
            const newUser = await registerUser(data);
            setUser(newUser);
            return newUser;
        } catch (err) {
            throw err;
        }
    };

    const login = async(data) => {
        try{
            const loggedInUser = await loginUser(data);
            setUser(loggedInUser);
            return loggedInUser
        }
        catch(err){
            throw err;
        }
    };

    const logout = async() => {
        try{
            await logoutApi();
            setUser(null);
        }
        catch(err){
            console.error("Logout failed", err);
        }
    }

    return(
        <AuthContext.Provider
            value={{
                user, 
                isAuthenticated: !!user,
                loading,
                register,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
