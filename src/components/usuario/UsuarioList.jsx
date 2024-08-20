import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { useSelector } from "react-redux";
import { searchOutline } from 'ionicons/icons';

const UsuarioList = () => {
  const [usuarios, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { user } = useSelector((state) => state.auth); // Obtener el usuario logeado

  useEffect(() => {
    if (user) {
      obtenerTodos();
    }
  }, [user]);

  const obtenerTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/usuario");
      // Verifica si user está definido antes de filtrar
      const filteredUsers = response.data.filter(u => u.ID_USUARIO !== user?.ID_USUARIO);
      setUsers(filteredUsers); 
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const buscarUsuario = async () => {
    try {
      const response = await axios.post("http://localhost:5000/buscarUsuario", {
        searchText: searchText.trim()
      });
      // Verifica si user está definido antes de filtrar
      const filteredUsers = response.data.filter(u => u.ID_USUARIO !== user?.ID_USUARIO);
      setUsers(filteredUsers); 
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
    }
  };

  const detectarEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      buscarUsuario(); 
    }
  };

  const eliminar = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/usuario/${userId}`);
      obtenerTodos();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="recentTable">
      <div className="TableHeader">
        <h2>USUARIOS</h2>

        <div className="searchInput">
          <label>
            <input
              type="text"
              placeholder="DNI, nombres o apellidos" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={detectarEnter}
            />
            <IonIcon icon={searchOutline} onClick={buscarUsuario}/>
          </label>
        </div>

        <Link to="/usuario/add" className="btn">
          Agregar
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>DNI</th>
            <th>NOMBRES Y APELLIDOS</th>
            <th>EMAIL</th>
            <th>USERNAME</th>
            <th>ROL</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((i, index) => (
            <tr key={i.ID_USUARIO}>
              <td>{index + 1}</td>
              <td>{i.DNI_USUARIO}</td>
              <td>{i.NOMBRE_USUARIO} {i.APELLIDO_USUARIO}</td>
              <td>{i.EMAIL}</td>
              <td>{i.USERNAME}</td>
              <td>{i.ROL.NOMBRE_ROL}</td>
              <td>
                <Link className="btn-edit" to={`/usuario/edit/${i.ID_USUARIO}`}>
                  Editar
                </Link>
                <Link className="btn-delete" onClick={() => eliminar(i.ID_USUARIO)}>
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioList;
