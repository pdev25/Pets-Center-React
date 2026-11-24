import { createContext, useState, useContext, useEffect } from "react";
import { db } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  return context;
};

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); // Obtenemos la instancia de auth una sola vez

  // Función para registrar un nuevo usuario
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Función para iniciar sesión
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Función para cerrar sesión
  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    // onAuthStateChanged es el observador de Firebase
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Si hay un usuario, buscamos su rol en Firestore.
          const userDocRef = doc(db, "usuarios", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          const rolGuardado = userDocSnap.exists() ? userDocSnap.data().rol : null;

          // Tolera mayúsculas y espacios de más en el valor guardado
          const esAdmin =
            typeof rolGuardado === "string" &&
            rolGuardado.trim().toLowerCase() === "admin";

          setUser({ ...currentUser, rol: esAdmin ? "admin" : "user" });
        } else {
          setUser(null);
        }
      } catch (error) {
        // Si falla la lectura (por ejemplo, por las reglas de Firestore), la sesión sigue iniciada como usuario común
        console.error("Error al leer el rol del usuario:", error);
        setUser(currentUser ? { ...currentUser, rol: "user" } : null);
      } finally {
        setLoading(false);
      }
    });
    // Limpiamos el observador al desmontar
    return () => unsubscribe();
  }, []);

  // Crear el objeto 'value' con TODAS las funciones definidas
  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };
  // No renderizamos hasta que cargue, para que los hijos no vean 'user' en null por error
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
