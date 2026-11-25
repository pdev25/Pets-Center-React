import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import ItemListContainer from "./components/products/ItemListContainer";
import DetalleProducto from "./components/products/DetalleProducto";
import Carrito from "./pages/Carrito";
import Categorias from "./pages/Categorias";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RutaProtegida from "./components/RutaProtegida";
import Panel from "./pages/Panel";
import './App.css';
import Carrusel from "./components/layouts/Carrusel";
import Marcas from "./components/layouts/Marcas";
import Contacto from "./pages/Contacto";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<><Carrusel /><ItemListContainer /><Marcas /></>} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/:idCategoria" element={<Categorias />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/panel"
            element={
              <RutaProtegida rolesPermitidos={['admin']}>
                <Panel />
              </RutaProtegida>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;