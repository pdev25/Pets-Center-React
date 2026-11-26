import { useState, useEffect } from "react";
import Nav from "./Nav";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";
import { useCarrito } from "../../context/CarritoContext";
import logo from "../../assets/PetsCenter.png";
import styles from "./Header.module.css";

// Datos de ejemplo: reemplazalos por los reales de la tienda
const WHATSAPP_URL = "https://wa.me/5491100000000";
const INSTAGRAM_URL = "https://www.instagram.com/mypets.tienda";

const IconoWhatsApp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <g transform="translate(7.2 7.2) scale(0.4)">
      <path
        strokeWidth="3.5"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </g>
  </svg>
);

const IconoCarrito = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const IconoInstagram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const Header = () => {
  const { user, logout } = useAuth();
  const { busqueda, setBusqueda } = useSearch();
  const { itemsEnCarrito } = useCarrito();
  const totalItems = itemsEnCarrito();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Se muestra solo la parte del correo antes de la @, para ahorrar lugar
  const nombreUsuario = user?.email ? user.email.split("@")[0] : "";

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
                  <li className={styles.authTexto} title={user.email}>
                    ¡Hola, {nombreUsuario}!
                  </li>
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

        {/* Redes sociales (siempre visibles) */}
        <div className={styles.redes}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.redLink}
            aria-label="WhatsApp (se abre en una pestaña nueva)"
            title="WhatsApp"
          >
            <IconoWhatsApp />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.redLink}
            aria-label="Instagram (se abre en una pestaña nueva)"
            title="Instagram"
          >
            <IconoInstagram />
          </a>
        </div>

        <Link
          to="/carrito"
          className={styles.carrito}
          aria-label={
            totalItems > 0
              ? `Ir al carrito (${totalItems} productos)`
              : "Ir al carrito"
          }
          title="Carrito"
        >
          <IconoCarrito />
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
