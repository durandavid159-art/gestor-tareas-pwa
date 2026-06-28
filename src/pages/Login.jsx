import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../services/firebaseConfig";
import { auth } from "../services/firebaseConfig";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {

        try {

            await signInWithPopup(
                auth,
                googleProvider
            );

            navigate("/dashboard");

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error Google Login"
            });
        }
    };

    const handleLogin = async () => {

        if (!email || !password) {

            Swal.fire({
                icon: "warning",
                title: "Campos obligatorios",
                text: "Debes ingresar tu correo y contraseña."
            });

            return;
        }

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            Swal.fire({
                icon: "success",
                title: "Bienvenido",
                text: "Inicio de sesión exitoso."
            });

            navigate("/dashboard");

            console.log("Usuario autenticado correctamente.");

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Correo o contraseña incorrectos."
            });

        }

    };

    return (

        <div className="auth-container">

            <div className="glass-card auth-card">

                <h1 className="auth-title">
                    Gestor de Tareas
                </h1>

                <form
                    className="auth-form"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {}

                    <label>
                        Correo Electrónico
                    </label>

                    <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {}

                    <label>
                        Contraseña
                    </label>

                    <input
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {}

                    <button
                        type="button"
                        className="btn-primary"
                        onClick={handleLogin}
                    >
                        Iniciar Sesión
                    </button>

                    {}
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={handleGoogleLogin}
                    >
                        Continuar con Google
                    </button>

                </form>

                {}

                <div className="auth-links">
                    <Link to="/register">
                        Crear Cuenta
                    </Link>

                    <Link to="/password">
                        Recuperar Contraseña
                    </Link>
                </div>

            </div>

        </div>

    );

};