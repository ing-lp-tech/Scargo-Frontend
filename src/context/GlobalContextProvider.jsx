import { useContext, createContext, useState } from "react";
/* import { products } from "../productsDB"; */
import { productsScargo } from "../productsScargo";

const GlobalContext = createContext();

//users login
const users = [
  { username: "luis", password: "luis" },
  { username: "usuario1", password: "contrasena1" },
  { username: "usuario2", password: "contrasena2" },
  { username: "usuario3", password: "contrasena3" },
];
//

// eslint-disable-next-line react/prop-types
const GlobalContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [prodSearch, setProdSearch] = useState([]);

  //login
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  //inventariado
  const [inventarioContext, setInventarioContext] = useState([]);

  //
  const handleAddProduct = (id, talla) => {
    const productFound = productsScargo.find(
      (prod) => Number(prod.id) === Number(id)
    );

    const existingProduct = cart.find(
      (item) => item.id === id && item.talle === talla
    );

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id && item.talle === talla
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: productFound.id,
          title: productFound.title,
          description: productFound.description,
          talle: talla,
          precio: productFound.price,
          cantidad: 1,
          images: productFound.images,
        },
      ]);
    }

    /*  const productFound = productsScargo.find(
      (prod) => Number(prod.id) === Number(id)
    );

    console.log("talla:", talla);

    const isInCart = cart.find((producto) => producto.id == id);

    if (isInCart) {
      setCart(
        cart.map((producto) => {
          if (producto.id === id) {
            producto.quantityStock++;
          }
          return producto;
        })
      );
    } else {
      setCart([...cart, { ...productFound, quantityStock: 1 }]);
    } */
  };

  const handleRemoveProduct = (id, talla) => {
    const productFound = productsScargo.find(
      (prod) => Number(prod.id) === Number(id)
    );

    const existingProduct = cart.find(
      (item) => item.id === id && item.talle === talla
    );

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id && item.talle === talla
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: productFound.id,
          title: productFound.title,
          description: productFound.description,
          talle: talla,
          precio: productFound.price,
          cantidad: 1,
          images: productFound.images,
        },
      ]);
    }
  };
  /* const handleRemoveProduct = (id) => {
    const productFound = productsScargo.find(
      (prod) => Number(prod.id) === Number(id)
    );

    const isInCart = cart.find((producto) => producto.id == id);

    if (isInCart) {
      setCart(
        cart.map((producto) => {
          if (producto.id === id) {
            producto.cantidad--;
          }
          return producto;
        })
      );
    } else {
      setCart([...cart, { ...productFound, cantidad: 1 }]);
    }
  }; */

  const productsSearch = (prod) => {
    setProdSearch(prod);
  };

  //functions login
  const login = (credentials) => {
    const user = users.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );
    if (user) {
      setLoggedIn(true);
      setUsername(credentials.username);
    }
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const inventariado = (info) => {
    console.log("conetext inventariado", info);

    setInventarioContext(info);
  };
  //
  console.log("inventario:", inventarioContext);

  const nombre = "luis";

  return (
    <GlobalContext.Provider
      value={{
        handleAddProduct,
        handleRemoveProduct,
        productsSearch,
        prodSearch,
        nombre,
        cart,
        isLoggedIn,
        username,
        login,
        logout,
        inventariado,
        inventarioContext,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
