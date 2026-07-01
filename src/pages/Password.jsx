import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

import { auth } from "../services/firebaseConfig";

import "../styles/Auth.css";

export const Password = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Correo requerido",
                text: "Ingresa tu correo electrónico."
            });

            return;
        }

        try {

            await sendPasswordResetEmail(
                auth,
                email
            );

            Swal.fire({
                icon: "success",
                title: "Correo enviado",
                text:
                    "Revisa tu bandeja de entrada para restablecer tu contraseña."
            });

            setEmail("");

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    "No fue posible enviar el correo de recuperación."
            });

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1 className="auth-title">
                    Recuperar Contraseña
                </h1>

                <p className="auth-subtitle">
                    Ingresa tu correo electrónico y recibirás un enlace para restablecer tu contraseña.
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <label>
                        Correo Electrónico
                    </label>

                    <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Enviar enlace
                    </button>

                </form>

                <div className="auth-links">

                    <Link to="/login">
                        Volver al Login
                    </Link>

                </div>

            </div>

        </div>

    );

};