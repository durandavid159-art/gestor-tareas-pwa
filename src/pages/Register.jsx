import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../services/firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

export const Register = () => {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const validatePassword =
        (password) => {

            return /^(?=.*[A-Z])(?=.*\d).{8,}$/
                .test(password);
        };

    const handleRegister =
        async () => {

            if (
                !email ||
                !password ||
                !confirmPassword
            ) {

                return Swal.fire({
                    icon: "warning",
                    title:
                        "Campos obligatorios"
                });
            }

            if (
                password !==
                confirmPassword
            ) {

                return Swal.fire({
                    icon: "error",
                    title:
                        "Las contraseñas no coinciden"
                });
            }

            if (
                !validatePassword(
                    password
                )
            ) {

                return Swal.fire({
                    icon: "warning",
                    title:
                        "Contraseña insegura",
                    text:
                        "Mínimo 8 caracteres, 1 mayúscula y 1 número."
                });
            }

            try {

                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                Swal.fire({
                    icon: "success",
                    title:
                        "Cuenta creada"
                });

                navigate("/dashboard");

            } catch (error) {

                Swal.fire({
                    icon: "error",
                    title:
                        "Error al registrar usuario",
                    text:
                        error.message
                });
            }
        };

    return (

        <div className="auth-container">

            <div className="glass-card auth-card">

                <h1 className="auth-title">
                    Crear Cuenta
                </h1>

                <form className="auth-form">

                    <label>
                        Correo
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <label>
                        Contraseña
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <label>
                        Confirmar
                    </label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="button"
                        className="btn-primary"
                        onClick={
                            handleRegister
                        }
                    >
                        Crear Cuenta
                    </button>

                </form>

                <div className="auth-links">

                    <Link to="/login">
                        Ya tengo cuenta
                    </Link>

                </div>

            </div>

        </div>
    );
};