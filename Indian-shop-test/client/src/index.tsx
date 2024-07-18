import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import Router from "./router";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <BrowserRouter>
                
                    <Router />
                
            </BrowserRouter>
      {/* <App></App> */}
    </StyledEngineProvider>
  </React.StrictMode>
);
