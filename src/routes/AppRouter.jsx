import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Password } from "../pages/Password";
import { Dashboard } from "../pages/Dashboard";
import { PrivateRoute } from "../components/auth/PrivateRoute";

export const AppRouter = () => {

    return (

        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/password"
                element={<Password />}
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/login" />}
            />

        </Routes>
    );
};