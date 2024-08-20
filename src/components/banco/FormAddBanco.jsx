import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select"; // Importa react-select
import "../../assets/styles/Form.css";

const FormAddBanco = () => {
    const [tipoCuenta, setTipoCuenta] = useState(1);
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [idEntidad, setIdEntidad] = useState(null); // Almacena la entidad seleccionada como un objeto
    const [entidades, setEntidades] = useState([]);
    const [idEntidadBanco, setIdEntidadBanco] = useState("");
    const [entidadesBanco, setEntidadesBanco] = useState([]);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        obtenerEntidades();
        obtenerEntidadesBanco();
    }, []);

    const obtenerEntidades = async () => {
        try {
            const response = await axios.get("http://localhost:5000/entidad");
            // Mapea las entidades para adaptarlas a react-select
            const options = response.data.map((entidad) => ({
                value: entidad.ID_ENTIDAD,
                label: entidad.RAZON_SOCIAL
            }));
            setEntidades(options);
        } catch (error) {
            console.error("Error al obtener entidades:", error);
        }
    };

    const obtenerEntidadesBanco = async () => {
        try {
            const response = await axios.get("http://localhost:5000/namebanco");
            setEntidadesBanco(response.data);
        } catch (error) {
            console.error("Error al obtener nombres de banco:", error);
        }
    };

    const saveBanco = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/banco", {
                TIPO_CUENTA: tipoCuenta,
                NUMERO_CUENTA: numeroCuenta.trim(),
                ID_ENTIDAD: idEntidad?.value || null, // Usa el valor seleccionado en react-select
                ID_ENTIDAD_BANCO: idEntidadBanco,
            });
            navigate("/bancos");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <NavLink to={"/bancos"}>
                <button>Regresar</button>
            </NavLink>

            <h1 className="title-form">Agregar nuevo banco</h1>

            <div className="contenedor">
                <form onSubmit={saveBanco}>
                    <p>{msg}</p>

                    <div className="row">
                        <div className="col-25">
                            <label className="label-form">Tipo de Cuenta Corriente</label>
                        </div>
                        <div className="col-75">
                            <select
                                className="input-form"
                                value={tipoCuenta}
                                onChange={(e) => setTipoCuenta(parseInt(e.target.value))}
                                required
                            >
                                <option value={1}>Moneda Nacional</option>
                                <option value={2}>Moneda Extranjera</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label className="label-form">Número de Cuenta</label>
                        </div>
                        <div className="col-75">
                            <input
                                className="input-form"
                                type="text"
                                value={numeroCuenta}
                                onChange={(e) => setNumeroCuenta(e.target.value)}
                                placeholder="Número de Cuenta"
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label className="label-form">Entidad Asociada</label>
                        </div>
                        <div className="col-75">
                            <Select
                                options={entidades} // Usa las opciones de react-select
                                value={idEntidad} // Usa el objeto seleccionado
                                onChange={(selectedOption) => setIdEntidad(selectedOption)} // Actualiza el estado con el objeto seleccionado
                                placeholder="Seleccione una entidad"
                                className="input-form"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label className="label-form">Nombre del Banco</label>
                        </div>
                        <div className="col-75">
                            <select
                                className="input-form"
                                value={idEntidadBanco}
                                onChange={(e) => setIdEntidadBanco(e.target.value)}
                                required
                            >
                                <option value="">Seleccione un banco</option>
                                {entidadesBanco.map((banco) => (
                                    <option key={banco.ID_ENTIDAD_BANCO} value={banco.ID_ENTIDAD_BANCO}>
                                        {banco.NOMBRE_ENTIDAD_BANCO}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <button className="button-form" type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormAddBanco;
