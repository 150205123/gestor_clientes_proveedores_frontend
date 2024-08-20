import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

const BancoList = () => {
    const [bancos, setBancos] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        obtenerTodos();
    }, []);

    const obtenerTodos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/banco");
            setBancos(response.data);
        } catch (error) {
            console.error("Error al obtener bancos:", error);
        }
    };

    const buscarBanco = async () => {
        try {
            const response = await axios.post("http://localhost:5000/buscarBanco", {
                searchText: searchText.trim()
            });
            setBancos(response.data);
        } catch (error) {
            console.error("Error al buscar bancos:", error);
        }
    };

    const detectarEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarBanco();
        }
    };

    const eliminar = async (bancoId) => {
        try {
            await axios.delete(`http://localhost:5000/banco/${bancoId}`);
            obtenerTodos();
        } catch (error) {
            console.error("Error al eliminar banco:", error);
        }
    };

    return (
        <div className="recentTable">
            <div className="TableHeader">
                <h2>BANCOS</h2>

                <div className="searchInput">
                    <label>
                        <input
                            type="text"
                            placeholder="RUC o razón social"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={detectarEnter}
                        />
                        <IonIcon icon={searchOutline} onClick={buscarBanco} />
                    </label>
                </div>

                <Link to="/banco/add" className="btn">
                    Agregar
                </Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Tipo de Entidad</th>
                        <th>Razón Social</th>
                        <td>RUC</td>
                        <th>Nombre del Banco</th>
                        <th>Tipo</th>
                        <th>Número de Cuenta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bancos.map((banco, index) => (
                        <tr key={banco.ID_BANCO}>
                            <td>{index + 1}</td>
                            <td>{banco.ENTIDAD?.TIPO_ENTIDAD === 1 ? "Cliente" : "Proveedor"}</td>
                            <td>{banco.ENTIDAD?.RAZON_SOCIAL}</td>
                            <td>{banco.ENTIDAD?.RUC}</td>
                            <td>{banco.ENTIDAD_BANCO?.NOMBRE_ENTIDAD_BANCO}</td>
                            <td>{banco.TIPO_CUENTA === 1 ? "MN" : "ME"}</td>
                            <td>{banco.NUMERO_CUENTA}</td>
                            <td>
                                <Link className="btn-edit" to={`/banco/edit/${banco.ID_BANCO}`}>
                                    Editar
                                </Link>
                                <Link className="btn-delete" onClick={() => eliminar(banco.ID_BANCO)}>
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

export default BancoList;
