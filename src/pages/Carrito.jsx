import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import styles from './Carrito.module.css';

// Ícono de papelera (relleno)
const IconoPapelera = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z" />
    <rect x="3" y="5" width="18" height="2" rx="1" />
    <path
      fillRule="evenodd"
      d="M5.5 8h13l-.9 11.2A2 2 0 0 1 15.6 21H8.4a2 2 0 0 1-2-1.8L5.5 8zM9.2 11.2a.8.8 0 0 1 1.6 0v6a.8.8 0 0 1-1.6 0v-6zm4 0a.8.8 0 0 1 1.6 0v6a.8.8 0 0 1-1.6 0v-6z"
    />
  </svg>
);

const Carrito = () => {
  const {
    carrito,
    vaciarCarrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    cobroTotal
  } = useCarrito();

  if (carrito.length === 0) {
    return (
      <section className={styles.vacio}>
        <h1 className={styles.titulo}>El carrito está vacío</h1>
        <p className={styles.textoVacio}>Agrega productos para continuar la compra.</p>
        <Link to="/productos" className={styles.botonPrimario}>
          Ver productos
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.contenedor}>
      <h1 className={styles.titulo}>Tu carrito</h1>

      <ul className={styles.lista}>
        {carrito.map(item => (
          <li key={item.id} className={styles.fila}>
            <img
              src={item.imagen || item.image}
              alt={item.nombre}
              className={styles.imagen}
            />

            <div className={styles.producto}>
              <h2 className={styles.nombre}>{item.nombre}</h2>
              <p className={styles.unitario}>Precio unitario: ${item.precio}</p>
            </div>

            {/* Controles de cantidad (+ / -) */}
            <div className={styles.cantidad}>
              <button
                type="button"
                className={styles.cantidadBtn}
                onClick={() => decrementarCantidad(item.id)}
                aria-label={`Quitar una unidad de ${item.nombre}`}
              >
                -
              </button>
              <span className={styles.cantidadTexto}>{item.cantidad}</span>
              <button
                type="button"
                className={styles.cantidadBtn}
                onClick={() => incrementarCantidad(item.id)}
                aria-label={`Agregar una unidad de ${item.nombre}`}
              >
                +
              </button>
            </div>

            <p className={styles.subtotal}>
              ${(item.precio * item.cantidad).toFixed(2)}
            </p>

            <button
              type="button"
              className={styles.basura}
              onClick={() => eliminarDelCarrito(item.id)}
              title="Eliminar producto"
              aria-label={`Eliminar ${item.nombre} del carrito`}
            >
              <IconoPapelera />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.resumen}>
        <p className={styles.total}>
          Total a pagar: <span>${cobroTotal().toFixed(2)}</span>
        </p>
        <button type="button" className={styles.vaciar} onClick={vaciarCarrito}>
          Vaciar Carrito
        </button>
      </div>
    </section>
  );
};

export default Carrito;
