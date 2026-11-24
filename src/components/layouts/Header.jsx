import { useState, useEffect } from "react";
import Nav from "./Nav";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";
import { useCarrito } from "../../context/CarritoContext";
import logo from "../../assets/PetsCenter.png";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();
  const { busqueda, setBusqueda } = useSearch();
  const { itemsEnCarrito } = useCarrito();
  const totalItems = itemsEnCarrito();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Al cambiar de página se cierra el menú del celular
  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  const manejarCambio = (evento) => {
    const valor = evento.target.value;
    setBusqueda(valor);

    // Si el usuario escribe y no esta en la page productos, lo llevamos alli
    if (location.pathname !== "/productos") {
      navigate("/productos");
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Pets Center - inicio" className={styles.logoImg} />
        </Link>

        {/* Barra de Busqueda */}
        <form
          className={styles.searchForm}
          onSubmit={(evento) => evento.preventDefault()}
        >
          <input
            type="text"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className={styles.searchInput}
            value={busqueda}
            onChange={manejarCambio}
          />
          {busqueda && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setBusqueda("")}
              aria-label="Borrar búsqueda"
            >
              ✕
            </button>
          )}
        </form>

        {/* Menú: navegación + sesión (se despliega con la hamburguesa en celulares) */}
        <div
          id="menu-principal"
          className={`${styles.menu} ${menuAbierto ? styles.menuAbierto : ""}`}
        >
          <div className={styles.centerSection}>
            <Nav />
          </div>

          <div className={styles.authSection}>
            <ul className={styles.authLista}>
              {user ? (
                <>
                  {user.rol === "admin" && (
                    <li>
                      <Link to="/panel" className={styles.authLink}>
                        Panel
                      </Link>
                    </li>
                  )}
                  <li className={styles.authTexto}>¡Hola, {user.email}!</li>
                  <li>
                    <button onClick={logout} className={styles.botonSesion}>
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className={styles.authLink}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Link to="/carrito" className={styles.carrito} aria-label="Ir al carrito">
          🛒
          {totalItems > 0 && <span className={styles.contador}>{totalItems}</span>}
        </Link>

        <button
          type="button"
          className={`${styles.hamburger} ${menuAbierto ? styles.hamburgerActivo : ""}`}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </div>
  );
};

export default Header;
