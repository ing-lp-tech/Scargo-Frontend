/* eslint-disable react/prop-types */
// En TablaInventario.js

// eslint-disable-next-line react/prop-types

import { useState } from "react";

const TablaInventario = ({ inventario, onEliminar, onModificar }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEliminar = (id) => {
    onEliminar(id);
    setSelectedRow(null);
  };

  const handleModificar = (id) => {
    onModificar(id);
    setSelectedRow(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Cant. Metros</th>
          <th>Cant. Prendas</th>
          <th>Detalle</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {inventario.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.fecha}</td>
            <td>{item.cantMetros}</td>
            <td>{item.cantPrendas}</td>
            <td>
              {Object.entries(item.inventario).map(([clave, valores]) => {
                /* let totalCantidad = 0;  */ // Variable para almacenar la cantidad total

                return (
                  <div key={clave}>
                    <p>Talle: {clave}</p>
                    {Object.entries(valores).map(([propiedad, valor]) => {
                      /*  totalCantidad += valor; */

                      return (
                        <p key={propiedad}>
                          {propiedad}: {valor}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </td>
            <td>
              {selectedRow === item.id ? (
                <>
                  <button onClick={() => handleEliminar(item.id)}>
                    Eliminar
                  </button>
                  <button onClick={() => handleModificar(item.id)}>
                    Modificar
                  </button>
                </>
              ) : (
                <select onChange={() => setSelectedRow(item.id)}>
                  <option value="">Acciones</option>
                  <option value="eliminar">Eliminar</option>
                  <option value="modificar">Modificar</option>
                </select>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaInventario;

/* const TablaInventario = ({ inventario }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Cant. Metros</th>
          <th>Cant. Prendas</th>
          <th>Cant. Talles</th>
          <th>Cant. Colores</th>
          <th>stock</th>
        </tr>
      </thead>
      <tbody>
        {inventario.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.fecha}</td>
            <td>{item.cantMetros}</td>
            <td>{item.cantPrendas}</td>
            <td>{item.cantTalles}</td>
            <td>{item.cantColores}</td>
            <td>
              {" "}
              {Object.entries(item.inventario).map(([clave, valores]) => (
                <div key={clave}>
                  <p>Talle: {clave}</p>
                  {Object.entries(valores).map(([propiedad, valor]) => (
                    <p key={propiedad}>
                      {propiedad}: {valor}
                    </p>
                  ))}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaInventario; */
