import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import "./styles/global.css";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Navbar />
                    <AppRoutes />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;