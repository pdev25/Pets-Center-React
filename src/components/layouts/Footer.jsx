import { Link } from "react-router-dom";
import logo from "../../assets/PetsCenter.png";
import styles from "./Footer.module.css";

// Editá acá las columnas y los links. Con "to" navega dentro de la app; con "href" va a un ancla o URL.
const columnas = [
  {
    titulo: "Tienda Online",
    enlaces: [
      { texto: "Inicio", to: "/" },
      { texto: "Productos", to: "/productos" },
      { texto: "Perros", to: "/perros" },
      { texto: "Gatos", to: "/gatos" },
      { texto: "Carrito", to: "/carrito" },
    ],
  },
  {
    titulo: "Mi cuenta",
    enlaces: [
      { texto: "Iniciar sesión", to: "/login" },
      { texto: "Registrarme", to: "/registro" },
    ],
  },
  {
    titulo: "Servicios",
    enlaces: [
      { texto: "Envíos", href: "#envios" },
      { texto: "Cambios", href: "#cambios" },
      { texto: "Devoluciones", href: "#devoluciones" },
      { texto: "Arrepentimiento", href: "#arrepentimiento" },
    ],
  },
  {
    titulo: "Información",
    enlaces: [
      { texto: "Acerca de Nosotros", href: "#acerca" },
      { texto: "Política de Privacidad", href: "#privacidad" },
    ],
  },
];

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.contenedor}>
        <div className={styles.logoFila}>
          <Link to="/">
            <img src={logo} alt="Pets Center - inicio" className={styles.logo} />
          </Link>
        </div>

        <nav className={styles.columnas} aria-label="Pie de página">
          {columnas.map((columna) => (
            <div key={columna.titulo} className={styles.columna}>
              <h3 className={styles.titulo}>{columna.titulo}</h3>
              <ul className={styles.lista}>
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.texto}>
                    {enlace.to ? (
                      <Link to={enlace.to} className={styles.link}>
                        {enlace.texto}
                      </Link>
                    ) : (
                      <a href={enlace.href} className={styles.link}>
                        {enlace.texto}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.copy}>
        <p>Pets Center S.A. © {anioActual} - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
