import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Carrusel.module.css";

const slides = [
  {
    imagen: "https://i.ibb.co/whNVwyC3/banner-2.png",
    alt: "Alimento balanceado con ingredientes naturales",
    titulo: "100% CON\nINGREDIENTES\nNATURALES",
    texto: "LA MISMA CALIDAD\nDE SIEMPRE",
  },
  {
    imagen: "https://i.ibb.co/whNVwyC3/banner-2.png",
    alt: "Alimento con textura y sabor irresistibles",
    titulo: "TEXTURA\nY SABOR\nIRRESISTIBLES",
    texto: "PARA UNA NUTRICIÓN\nCOMPLETA DIARIA",
  },
  {
    imagen: "https://i.ibb.co/gFXGnwrV/banner-3.jpg",
    alt: "Alimento balanceado con ingredientes naturales",
    titulo: "100% CON\nINGREDIENTES\nNATURALES",
    texto: "LA MISMA CALIDAD\nDE SIEMPRE",
  },
];

const INTERVALO = 5000;

const Carrusel = () => {
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const inicioToque = useRef(null);

  const siguiente = useCallback(
    () => setActual((i) => (i + 1) % slides.length),
    []
  );
  const anterior = useCallback(
    () => setActual((i) => (i - 1 + slides.length) % slides.length),
    []
  );

  // Avanza solo cada 5 segundos. Se frena con el mouse/foco encima
  // y no arranca si la persona tiene activado "reducir movimiento".
  useEffect(() => {
    const reducirMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (pausado || reducirMovimiento) return;

    const id = setInterval(siguiente, INTERVALO);
    return () => clearInterval(id);
  }, [pausado, siguiente, actual]);

  // Deslizar con el dedo en celulares
  const iniciarToque = (e) => {
    inicioToque.current = e.touches[0].clientX;
  };

  const terminarToque = (e) => {
    if (inicioToque.current === null) return;
    const diferencia = e.changedTouches[0].clientX - inicioToque.current;
    if (Math.abs(diferencia) > 50) {
      if (diferencia < 0) siguiente();
      else anterior();
    }
    inicioToque.current = null;
  };

  return (
    <section
      className={styles.carrusel}
      aria-roledescription="carousel"
      aria-label="Promociones"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      onTouchStart={iniciarToque}
      onTouchEnd={terminarToque}
    >
      <div
        className={styles.pista}
        style={{ transform: `translateX(-${actual * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${slides.length}`}
            aria-hidden={i !== actual}
          >
            <img src={slide.imagen} alt={slide.alt} className={styles.imagen} />
            <div className={styles.caption}>
              <h2>{slide.titulo}</h2>
              <p>{slide.texto}</p>
              <Link
                to="/productos"
                className={styles.boton}
                tabIndex={i === actual ? 0 : -1}
              >
                Conocé más
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.control} ${styles.prev}`}
        onClick={anterior}
        aria-label="Banner anterior"
      >
        ‹
      </button>
      <button
        type="button"
        className={`${styles.control} ${styles.next}`}
        onClick={siguiente}
        aria-label="Banner siguiente"
      >
        ›
      </button>

      <div className={styles.indicadores}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === actual ? styles.indicadorActivo : styles.indicador}
            onClick={() => setActual(i)}
            aria-label={`Ir al banner ${i + 1}`}
            aria-current={i === actual}
          />
        ))}
      </div>
    </section>
  );
};

export default Carrusel;
