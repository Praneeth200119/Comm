import React from "react";
// components
import AdminMenubar from "./Admin-Menu";
import { Typography } from "@material-ui/core";
import { Outlet } from "react-router-dom";


export default function AdminMain(){
    return (
        <>
            <AdminMenubar />
            <div style={{minHeight:"300px"}}>
                
                <Outlet />
            </div>
                
        </> 
    )
}