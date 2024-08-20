import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Select from "react-select"; // Importa react-select
import "../../assets/styles/Form.css";

const FormEditBanco = () => {
    const [tipoCuenta, setTipoCuenta] = useState(1);
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [entidadBancoId, setEntidadBancoId] = useState(null);
    const [entidadesBanco, setEntidadesBanco] = useState([]);
    const [entidadId, setEntidadId] = useState(null);
    const [entidades, setEntidades] = useState([]);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getBancoById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/banco/${id}`);
                console.log("Banco Data:", response.data); // Inspecciona aquí
                const bancoData = response.data;
                setTipoCuenta(bancoData.TIPO_CUENTA);
                setNumeroCuenta(bancoData.NUMERO_CUENTA);
                setEntidadBancoId(bancoData.ENTIDAD_BANCO?.ID_ENTIDAD_BANCO || null);
                setEntidadId(bancoData.ENTIDAD?.ID_ENTIDAD || null);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };

        const getEntidadesBanco = async () => {
            try {
                const response = await axios.get("http://localhost:5000/namebanco");
                setEntidadesBanco(response.data);
            } catch (error) {
                console.error("Error al obtener entidades de banco:", error);
            }
        };

        const getEntidades = async () => {
            try {
                const response = await axios.get("http://localhost:5000/entidad");
                setEntidades(response.data);
            } catch (error) {
                console.error("Error al obtener entidades:", error);
            }
        };

        getEntidadesBanco();
        getEntidades();
        getBancoById(); 
    }, [id]);

    const updateBanco = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/banco/${id}`, {
                TIPO_CUENTA: tipoCuenta,
                NUMERO_CUENTA: numeroCuenta.trim(),
                ID_ENTIDAD_BANCO: entidadBancoId,
                ID_ENTIDAD: entidadId
            });
            navigate("/bancos");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const handleEntidadChange = (selectedOption) => {
        setEntidadId(selectedOption ? selectedOption.value : null);
    };

    return (
        <div>
            <NavLink to={"/bancos"}>
                <button>Regresar</button>
            </NavLink>
            <h1 className="title-form">Actualizar Banco</h1>

            <div className="contenedor">
                <form onSubmit={updateBanco}>
                    <p>{msg}</p>

                    <div className="row">
                        <div className="col-25">
                            <label className="label-form">Tipo de Cuenta</label>
                        </div>
                        <div className="col-75">
                            <select
                                className="input-form"
                                value={tipoCuenta || 1}
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
                                value={numeroCuenta || ""}
                                onChange={(e) => setNumeroCuenta(e.target.value)}
                                placeholder="Número de Cuenta"
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label className="label-form">Banco</label>
                        </div>
                        <div className="col-75">
                            <select
                                className="input-form"
                                value={entidadBancoId || ""}
                                onChange={(e) => setEntidadBancoId(parseInt(e.target.value))}
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
                        <div className="col-25">
                            <label className="label-form">Entidad Asociada</label>
                        </div>
                        <div className="col-75">
                            <Select
                                className="input-form"
                                value={entidades.find(entidad => entidad.value === entidadId)}
                                onChange={handleEntidadChange}
                                options={entidades.map(entidad => ({
                                    value: entidad.ID_ENTIDAD,
                                    label: entidad.RAZON_SOCIAL
                                }))}
                                placeholder="Seleccione una entidad"
                                isClearable
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <button className="button-form" type="submit">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormEditBanco;
