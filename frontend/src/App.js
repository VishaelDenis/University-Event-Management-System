import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function Shell() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
    const isHome = location.pathname === "/";

    return (
        <div className={isAuthPage ? "App App-bare" : "App"}>
            {!isAuthPage && !isHome && <Navbar />}
            <main className={isAuthPage ? "main-content main-content-bare" : "main-content" + (isHome ? " main-content-home" : "")}>
                <AppRoutes />
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Shell />
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
