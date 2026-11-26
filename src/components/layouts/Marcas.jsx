import styles from "./Marcas.module.css";

const marcas = [
  { nombre: "Dog Chow", imagen: "https://i.ibb.co/GQTKQVkV/dog-chow.webp" },
  { nombre: "Eukanuba", imagen: "https://i.ibb.co/nNTZwHLY/eukanuba.png" },
  { nombre: "Excellent", imagen: "https://i.ibb.co/8DCSKg3Z/excellent.webp" },
  { nombre: "Fancy Feast", imagen: "https://i.ibb.co/ns0byBFJ/fancy-feast.png" },
  { nombre: "Iams", imagen: "https://i.ibb.co/6hHLqBM/iams.png" },
  { nombre: "Club Performance", imagen: "https://i.ibb.co/wrrtSGBs/img-clubperformance.png" },
  { nombre: "Maintenance", imagen: "https://i.ibb.co/q3sqQdKV/maintenance.webp" },
  { nombre: "Old Prince", imagen: "https://i.ibb.co/9kWYJqn2/old-prince.png" },
  { nombre: "Pedigree", imagen: "https://i.ibb.co/S79wDWTB/pedigree.webp" },
  { nombre: "Cat Chow", imagen: "https://i.ibb.co/JR5Nqwdx/purina.jpg" },
  { nombre: "Purina", imagen: "https://i.ibb.co/Q7t5tqgb/purina-cat-chow.webp" },
  { nombre: "Royal Canin", imagen: "https://i.ibb.co/6cQ81DM9/royal-canin.jpg" },
  { nombre: "Sieger", imagen: "https://i.ibb.co/21Fzcv2G/sieger.webp" },
  { nombre: "Unik", imagen: "https://i.ibb.co/k2fzxKsc/unik.png" },
  { nombre: "Vitalcan", imagen: "https://i.ibb.co/tTqTD08B/vitalcan.jpg" },
  { nombre: "Whiskas", imagen: "https://i.ibb.co/d4wrmzVL/whiskas.webp" },
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
