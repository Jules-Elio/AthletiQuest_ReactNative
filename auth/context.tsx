import {createContext, type PropsWithChildren, use, useCallback, useMemo} from 'react';

import {useStorageState} from './useStorageState';

export const URL_API = "http://192.168.0.204:8080";

const AuthContext = createContext<{
    signIn: (email: string, password: string) => string | void;
    register: (username: string, email: string, password: string) => string | void;
    signOut: () => void;
    sessionToken?: string | null;
    isLoading: boolean;
}>({
    signIn: () => "", register: () => "", signOut: () => null, sessionToken: null, isLoading: false,
});

export function useSession() {
    const value = use(AuthContext);
    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
    return value;
}

export function SessionProvider({children}: Readonly<PropsWithChildren>) {

    const [[isLoading, sessionToken], setSessionToken] = useStorageState('sessionToken');

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            const request = {"email": email, "password": password}

            const response = await fetch(`${URL_API}/login`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(request),
            });
            if (response.ok) {
                const json = await response.json();
                setSessionToken(json.token);
            }
        } catch (error) {
            console.error(error);
            return "Email ou mot de passe incorrect";
        }
    }, [])

    const register = useCallback(async (username: string, email: string, password: string) => {
        try {
            const request = {"username": username, "email": email, "password": password}

            const response = await fetch(`${URL_API}/register`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(request),
            });
            if (response.ok) {
                const json = await response.json();
                setSessionToken(json.token);
            }
        } catch (error) {
            console.error(error);
            return "Email déjà utilisé";
        }
    }, []);

    const signOut = useCallback(() => {
        setSessionToken(null);
    }, []);

    const authFunction = useMemo(() => ({
        signIn, register, signOut, sessionToken, isLoading,
    }), [signIn, register, signOut, sessionToken, isLoading]);

    return <AuthContext.Provider
        value={authFunction}>
        {children}
    </AuthContext.Provider>;
}
