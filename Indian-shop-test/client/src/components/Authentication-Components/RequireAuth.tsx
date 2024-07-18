import React, {ReactNode} from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "./Auth";

interface ContainerProps {
    children: ReactNode;
}
export const RequireAuth:React.FC<ContainerProps>=({children})=>{
    const auth=useAuth();
    
    if(!auth?.user){
        return <Navigate to="/login"/>
    }
    return <>{children}</>
}