import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

const EntidadList = () => {
    const [entidades, setEntidades] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        obtenerTodos();
    }, []);

    const obtenerTodos = async () => {
        const response = await axios.get("http://localhost:5000/entidad");
        setEntidades(response.data);
    };

    const buscarEntidad = async () => {
        const response = await axios.post("http://localhost:5000/buscarEntidad", {
            searchText: searchText.trim()
        });
        setEntidades(response.data);
    };

    const detectarEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarEntidad();
        }
    };

    const eliminar = async (entidadId) => {
        await axios.delete(`http://localhost:5000/entidad/${entidadId}`);
        obtenerTodos();
    };

    return (
        <div className="recentTable">
            <div className="TableHeader">
                <h2>ENTIDADES</h2>

                <div className="searchInput">
                    <label>
                        <input
                            type="text"
                            placeholder="RUC o razón social"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={detectarEnter}
                        />
                        <IonIcon icon={searchOutline} onClick={buscarEntidad} />
                    </label>
                </div>

                <Link to="/entidad/add" className="btn">
                    Agregar
                </Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Razón Social</th>
                        <th>RUC</th>
                        <th>Tipo de Entidad</th>
                        <th>Creado por</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {entidades.map((entidad, index) => (
                        <tr key={entidad.ID_ENTIDAD}>
                            <td>{index + 1}</td>
                            <td>{entidad.RAZON_SOCIAL}</td>
                            <td>{entidad.RUC}</td>
                            <td>{entidad.TIPO_ENTIDAD === 1 ? "Cliente" : "Proveedor"}</td>
                            <td>{entidad.USUARIO?.NOMBRE_USUARIO} {entidad.USUARIO?.APELLIDO_USUARIO}</td>
                            <td>
                                <Link className="btn-edit" to={`/entidad/edit/${entidad.ID_ENTIDAD}`}>
                                    Editar
                                </Link>
                                <Link className="btn-delete" onClick={() => eliminar(entidad.ID_ENTIDAD)}>
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

export default EntidadList;
