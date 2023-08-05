import React from 'react';
import About from "./pages/About";
import Posts from "./pages/Posts";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import Error from "./pages/Error";
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
