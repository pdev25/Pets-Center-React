import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

const mensajeError = (codigo) => {
  switch (codigo) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "El correo o la contraseña no son correctos.";
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Esperá unos minutos e intentá de nuevo.";
    case "auth/network-request-failed":
      return "No hay conexión. Revisá tu internet e intentá de nuevo.";
    default:
      return "No se pudo iniciar sesión. Intentá nuevamente.";
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  // usamos el custom hook
  const { login } = useAuth();

  const manejarLogin = async (evento) => {
    evento.preventDefault();
    setError(null);
    setCargando(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Error en el login:", error.code, error.message);
      setError(mensajeError(error.code));
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className={styles.contenedor}>
      <form className={styles.formulario} onSubmit={manejarLogin}>
        <h1 className={styles.titulo}>Iniciar Sesión</h1>

        <div className={styles.grupo}>
          <label htmlFor="login-email" className={styles.label}>
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            className={styles.input}
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            required
          />
        </div>

        <div className={styles.grupo}>
          <label htmlFor="login-password" className={styles.label}>
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            className={styles.input}
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            required
          />
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className={styles.boton} disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>

        <p className={styles.pie}>
          ¿No estás registrado? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
