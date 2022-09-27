import React from "react";
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"

import App from "./App"

import "./style.css"
import "swiper/css/bundle";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);