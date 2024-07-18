
import React, {ReactNode, createContext,useContext, useState} from 'react'



interface ContainerProps {
    children: ReactNode;
}
interface user{
    userName:string;
    userRole:string;
}
interface AuthContextProps{
    user:user | null;
    login:Function;
    logout:Function;
}
const AuthContext=createContext<AuthContextProps | null>(null);

export const AuthProvider:React.FC<ContainerProps>=({children})=>{
    const [user,setUser]=useState<user | null>(null)

    const login=(userName:string,password:string)=>{
        if(userName=="admin" && password=="IndianShop@Italy"){
            setUser({userName:userName,userRole:"admin"});
            return 1;
        }
        else return 0;
    }
    const logout=()=>{
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{user:user, login:login, logout:logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext)
}