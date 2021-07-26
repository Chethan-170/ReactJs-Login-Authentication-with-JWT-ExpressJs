import React, { useContext, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"
import http from "../http"

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        checkLoggedIn();
    }, []);

    async function checkLoggedIn() {
        setIsValidating(true);
        const jwtToken = Cookies.get("auth_key");
        if(typeof jwtToken == "string" && jwtToken != "") {
            try{
                let { data } = await http.post("/authentication/validate", { jwtToken });
                if (data.ok == 0) {
                    //Valid token
                    setTimeout(() => {
                        setUser(data.user);
                        setIsValidating(false);
                    }, 1000)
                    return true;
                } else if (data.ok == -1) {
                    //Token expired
                    Cookies.remove("auth_key");
                    setUser(null)
                    setIsValidating(false);
                    return false;
                } else {
                    setIsValidating(false);
                    throw Error("Invalid Response");
                }
            }catch(err) { 
                setIsValidating(false);
                Cookies.remove("auth_key");
                setUser(null);
            };
        } else {
            setIsValidating(false);
            Cookies.remove("auth_key");
            setUser(null);
        }
    }
    async function login(username, password) {
        setIsValidating(true);
        try{
            let { data } = await http.post("/authentication/login", { username, password });
            if (data.ok == 0) {
                setTimeout(() => {
                    Cookies.set("auth_key", data.jwtToken, { expires: data.cookieExpiresIn });
                    setUser({ user: data.user });
                    setIsValidating(false);
                }, 1000);
                return true;
            } else if (data.ok == -1) {
                setIsValidating(false);
                throw Error(data.error.message);
            } else {
                setIsValidating(false);
                throw Error("Invalid Response");
            }
        }catch(err){
            setIsValidating(false);
            throw err;
        }
    }
    function logout() {
        setIsValidating(true);
        Cookies.remove("auth_key");
        setUser(null);
        setIsValidating(false);
    }
    function isLoggedIn() {
        return Boolean(user);
    }

    return <AuthContext.Provider value={{ isLoggedIn, login, logout, isValidating }}>{children}</AuthContext.Provider>
}

export default function useAuth() {
    const value = useContext(AuthContext);
    return value;
}