import styles from "./Marcas.module.css";

const marcas = [
  { nombre: "Dog Chow", imagen: "https://i.ibb.co/GQTKQVkV/dog-chow.webp" },
  { nombre: "Eukanuba", imagen: "https://i.ibb.co/nNTZwHLY/eukanuba.png" },
  { nombre: "Excellent", imagen: "/src/assets/excellent.webp" },
  { nombre: "Fancy Feast", imagen: "/src/assets/fancy_feast.png" },
  { nombre: "Iams", imagen: "/src/assets/iams.png" },
  { nombre: "Club Performance", imagen: "/src/assets/img-clubperformance.png" },
  { nombre: "Maintenance", imagen: "/src/assets/maintenance.webp" },
  { nombre: "Old Prince", imagen: "/src/assets/old_prince.png" },
  { nombre: "Pedigree", imagen: "/src/assets/pedigree.webp" },
  { nombre: "Cat Chow", imagen: "/src/assets/purina_cat_chow.webp" },
  { nombre: "Purina", imagen: "/src/assets/purina.jpg" },
  { nombre: "Royal Canin", imagen: "/src/assets/royal_canin.svg" },
  { nombre: "Sieger", imagen: "/src/assets/sieger.webp" },
  { nombre: "Unik", imagen: "/src/assets/unik.png" },
  { nombre: "Vitalcan", imagen: "/src/assets/vitalcan.svg" },
  { nombre: "Whiskas", imagen: "/src/assets/whiskas.webp" },
];

const Marcas = () => {
  return (
    <section className={styles.marcas} aria-labelledby="titulo-marcas">
      <h2 id="titulo-marcas" className={styles.titulo}>
        NUESTRAS MARCAS
      </h2>

      <ul className={styles.logos}>
        {marcas.map((marca) => (
          <li key={marca.nombre} className={styles.logoItem}>
            <img
              src={marca.imagen}
              alt={marca.nombre}
              className={styles.logo}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Marcas;
