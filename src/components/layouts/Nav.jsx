import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

// El "to" tiene que coincidir con el valor de "categoria" guardado en Firestore
const categorias = [
  { texto: "Perros", to: "/perros" },
  { texto: "Gatos", to: "/gatos" },
];

const Nav = () => {
  return (
    <nav className={styles.navContainer} aria-label="Categorías">
      <ul className={styles.navList}>
        {categorias.map((categoria) => (
          <li key={categoria.to}>
            <Link to={categoria.to} className={styles.navLink}>
              {categoria.texto}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
