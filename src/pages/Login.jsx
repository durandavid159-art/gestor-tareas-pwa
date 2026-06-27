import { useState } from "react";
import Swal from "sweetalert2";
import "../styles/Auth.css";

export const Login = () => {
    // Estado para alternar entre Login (true) y Registro (false)
    const [isLogin, setIsLogin] = useState(true);

    // Estados para los campos del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Manejador del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación básica de campos vacíos
        if (!email || !password) {
            Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos obligatorios.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        if (isLogin) {
            // --- LÓGICA PARA HU 1.1: INICIO DE SESIÓN ---
            console.log("Iniciando sesión con:", { email, password });

            Swal.fire({
                icon: "success",
                title: "¡Bienvenido de nuevo!",
                text: "Sesión iniciada correctamente.",
                timer: 1500,
                showConfirmButton: false,
            });
            // Aquí redirigirías al Dashboard usando tu router (ej. useNavigate)
        } else {
            // --- LÓGICA PARA HU 1.1: REGISTRO ---
            if (password !== confirmPassword) {
                Swal.fire({
                    icon: "error",
                    title: "Error de validación",
                    text: "Las contraseñas no coinciden.",
                    confirmButtonColor: "#d33",
                });
                return;
            }

            console.log("Registrando usuario:", { email, password });

            Swal.fire({
                icon: "success",
                title: "¡Cuenta creada!",
                text: "Tu registro se ha completado con éxito.",
                confirmButtonColor: "#3085d6",
            }).then(() => {
                // Al registrarse con éxito, lo pasamos al login automáticamente
                setIsLogin(true);
                setConfirmPassword("");
            });
        }
    };

    // Simulación de autenticación alternativa (HU 1.1)
    const handleGoogleLogin = () => {
        console.log("Iniciando sesión con Google...");
        Swal.fire({
            icon: "info",
            title: "Autenticación con Google",
            text: "Conectando con el servicio externo...",
            timer: 1200,
            showConfirmButton: false,
        });
    };

    return (
        <div className="auth-container">
            {/* Tarjeta con efecto Glassmorphism */}
            <div className="glass-card">
                <h2>Gestor de Tareas</h2>
                <h3>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h3>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo extra si el usuario está en la vista de Registro */}
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="btn-primary">
                        {isLogin ? "Iniciar Sesión" : "Registrarse"}
                    </button>
                </form>

                {/* Botón de Google solicitado en los componentes */}
                <button onClick={handleGoogleLogin} className="btn-google">
                    Continuar con Google
                </button>

                {/* Enlaces de navegación interna */}
                <div className="auth-links">
                    <p>
                        {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                        <span
                            className="toggle-link"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setConfirmPassword("");
                            }}
                        >
                            {isLogin ? "Crear Cuenta" : "Iniciar Sesión"}
                        </span>
                    </p>

                    {isLogin && (
                        <span className="forgot-link">
                            ¿Olvidaste tu contraseña?
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};