import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

// Links del menú. En las categorías, el "to" tiene que coincidir con el valor de "categoria" guardado en Firestore
const enlaces = [
  { texto: "Perros", to: "/perros" },
  { texto: "Gatos", to: "/gatos" },
  { texto: "Contacto", to: "/contacto" },
];

const Nav = () => {
  return (
    <nav className={styles.navContainer} aria-label="Navegación principal">
      <ul className={styles.navList}>
        {enlaces.map((enlace) => (
          <li key={enlace.to}>
            <Link to={enlace.to} className={styles.navLink}>
              {enlace.texto}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
