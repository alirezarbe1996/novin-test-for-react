import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "user"

interface ContextValue {
    user: { } | null;
    token: string | null;
    role: Role | null;
    isLoading:boolean;
    handleSetToken: (token: string | null) => void;
    handleSetUser: (user:{} | null) => void;
    handleSetRole: (role:Role | null) => void;
    setLoadingState:(loadingState:boolean) => void;
}

const StateContext = createContext<ContextValue>({
    user: null,
    token: null,
    role: null,
    isLoading:false,
    handleSetToken: () => {},
    handleSetUser: () => {},
    handleSetRole: () => {},
    setLoadingState: () => {},
});

interface ContextProviderProps {
    children: ReactNode;
}


export const StateContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<{} | null>(null);
    const [role, setRole] = useState<Role | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("ACCESS_TOKEN"));
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleSetToken = (newToken: string | null) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("ACCESS_TOKEN", newToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    const handleSetUser = (user:{} | null) => {
        setUser(user);
    };
    const handleSetRole = (role:Role | null) => {
        setRole(role)
    };
    const setLoadingState = (state:boolean) => {
        setIsLoading(state)
    };

    const contextValue: ContextValue = {
        user,
        token,
        role,
        isLoading,
        handleSetToken,
        handleSetUser,
        handleSetRole,
        setLoadingState

    };

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = (): ContextValue => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useStateContext must be used within a ContextProvider");
    }
    return context;
};
