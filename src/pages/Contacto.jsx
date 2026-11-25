import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import styles from "./Contacto.module.css";

const estadoInicial = {
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
};

const Contacto = () => {
  const [datos, setDatos] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatos((prev) => ({ ...prev, [name]: value }));

    // Limpia el error del campo que se está modificando
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
    if (enviado) setEnviado(false);
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = "Ingresá tu nombre.";
    }

    if (!datos.email.trim()) {
      nuevosErrores.email = "Ingresá tu correo electrónico.";
    } else if (!/^\S+@\S+\.\S+$/.test(datos.email.trim())) {
      nuevosErrores.email = "El correo electrónico no es válido.";
    }

    if (!datos.mensaje.trim()) {
      nuevosErrores.mensaje = "Escribí tu mensaje.";
    } else if (datos.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = "El mensaje es muy corto (mínimo 10 caracteres).";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setErrorEnvio(null);
    setEnviado(false);

    if (!validar()) return;

    setEnviando(true);

    try {
      await addDoc(collection(db, "mensajes"), {
        nombre: datos.nombre.trim(),
        email: datos.email.trim(),
        telefono: datos.telefono.trim(),
        mensaje: datos.mensaje.trim(),
        fecha: serverTimestamp(),
        leido: false,
      });

      setDatos(estadoInicial);
      setEnviado(true);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setErrorEnvio("No pudimos enviar tu mensaje. Intentá nuevamente en unos minutos.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className={styles.contenedor}>
      <form className={styles.formulario} onSubmit={manejarEnvio} noValidate>
        <h1 className={styles.titulo}>Contacto</h1>
        <p className={styles.intro}>
          ¿Tenés alguna consulta sobre nuestros productos? Escribinos y te
          respondemos a la brevedad.
        </p>

        <div className={styles.fila}>
          <div className={styles.grupo}>
            <label htmlFor="contacto-nombre" className={styles.label}>
              Nombre
            </label>
            <input
              id="contacto-nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              className={`${styles.input} ${errores.nombre ? styles.inputError : ""}`}
              value={datos.nombre}
              onChange={manejarCambio}
              aria-invalid={!!errores.nombre}
              aria-describedby={errores.nombre ? "contacto-nombre-error" : undefined}
            />
            {errores.nombre && (
              <span id="contacto-nombre-error" className={styles.mensajeError}>
                {errores.nombre}
              </span>
            )}
          </div>

          <div className={styles.grupo}>
            <label htmlFor="contacto-email" className={styles.label}>
              Correo electrónico
            </label>
            <input
              id="contacto-email"
              name="email"
              type="email"
              autoComplete="email"
              className={`${styles.input} ${errores.email ? styles.inputError : ""}`}
              value={datos.email}
              onChange={manejarCambio}
              aria-invalid={!!errores.email}
              aria-describedby={errores.email ? "contacto-email-error" : undefined}
            />
            {errores.email && (
              <span id="contacto-email-error" className={styles.mensajeError}>
                {errores.email}
              </span>
            )}
          </div>
        </div>

        <div className={styles.grupo}>
          <label htmlFor="contacto-telefono" className={styles.label}>
            Teléfono <span className={styles.opcional}>(opcional)</span>
          </label>
          <input
            id="contacto-telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            className={styles.input}
            value={datos.telefono}
            onChange={manejarCambio}
          />
        </div>

        <div className={styles.grupo}>
          <label htmlFor="contacto-mensaje" className={styles.label}>
            Mensaje
          </label>
          <textarea
            id="contacto-mensaje"
            name="mensaje"
            className={`${styles.textarea} ${errores.mensaje ? styles.inputError : ""}`}
            value={datos.mensaje}
            onChange={manejarCambio}
            aria-invalid={!!errores.mensaje}
            aria-describedby={errores.mensaje ? "contacto-mensaje-error" : undefined}
          />
          {errores.mensaje && (
            <span id="contacto-mensaje-error" className={styles.mensajeError}>
              {errores.mensaje}
            </span>
          )}
        </div>

        {errorEnvio && (
          <p className={styles.error} role="alert">
            {errorEnvio}
          </p>
        )}

        {enviado && (
          <p className={styles.exito} role="status">
            ¡Gracias! Recibimos tu mensaje y te vamos a responder pronto.
          </p>
        )}

        <button type="submit" className={styles.boton} disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </section>
  );
};

export default Contacto;
