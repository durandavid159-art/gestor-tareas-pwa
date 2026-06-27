import "../styles/Auth.css";

export const Register = () => {

    return (

        <div className="auth-container">

            <div className="glass-card auth-card">

                <h1 className="auth-title">
                    Crear Cuenta
                </h1>

                <form className="auth-form">

                    <label>Nombre Completo</label>

                    <input
                        type="text"
                        placeholder="David Pescador"
                    />

                    <label>Correo Electrónico</label>

                    <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                    />

                    <label>Contraseña</label>

                    <input
                        type="password"
                        placeholder="********"
                    />

                    <label>Confirmar Contraseña</label>

                    <input
                        type="password"
                        placeholder="********"
                    />

                    <button
                        type="button"
                        className="btn-primary"
                    >
                        Crear Cuenta
                    </button>

                    <button
                        type="button"
                        className="btn-secondary"
                    >
                        Continuar con Google
                    </button>

                </form>

                <div className="auth-links">

                    <a href="#">
                        Ya tengo cuenta
                    </a>

                </div>

            </div>

        </div>
    );
};