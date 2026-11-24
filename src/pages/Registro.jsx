import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    setError(null);
    setCargando(true);

    try {
      // Creamos el usuario usando la función 'signup' del AuthContext
      const credencialUsuario = await signup(email, password);
      const user = credencialUsuario.user;

      // Guardamos los datos adicionales en Firestore usando el UID generado
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre,
        apellido: apellido,
        rol: "usuario",
        email: email
      });

      // Redirigimos al inicio
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?"
        );

        if (quiereLoguearse) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente."
        );
        console.error("Error en el registro:", error.message);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className={styles.contenedor}>
      <form className={styles.formulario} onSubmit={manejarSubmit}>
        <h1 className={styles.titulo}>Crear una nueva cuenta</h1>

        <div className={styles.fila}>
          <div className={styles.grupo}>
            <label htmlFor="reg-nombre" className={styles.label}>
              Nombre
            </label>
            <input
              id="reg-nombre"
              type="text"
              autoComplete="given-name"
              className={styles.input}
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              required
            />
          </div>
          <div className={styles.grupo}>
            <label htmlFor="reg-apellido" className={styles.label}>
              Apellido
            </label>
            <input
              id="reg-apellido"
              type="text"
              autoComplete="family-name"
              className={styles.input}
              value={apellido}
              onChange={(evento) => setApellido(evento.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.grupo}>
          <label htmlFor="reg-email" className={styles.label}>
            Correo electrónico
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            className={styles.input}
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            required
          />
        </div>

        <div className={styles.grupo}>
          <label htmlFor="reg-password" className={styles.label}>
            Contraseña
          </label>
          <input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            className={styles.input}
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            required
            minLength={6}
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className={styles.boton} disabled={cargando}>
          {cargando ? "Registrando..." : "Registrarse"}
        </button>

        <p className={styles.pie}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </form>
    </section>
  );
};

export default Registro;
