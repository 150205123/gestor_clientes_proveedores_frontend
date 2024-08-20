import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../assets/styles/Form.css";

const FormAddEntidad = () => {
  const [razonSocial, setRazonSocial] = useState("");
  const [ruc, setRuc] = useState("");
  const [tipoEntidad, setTipoEntidad] = useState(1);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const saveEntidad = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/entidad", {
        RAZON_SOCIAL: razonSocial.trim(),
        RUC: ruc.trim(),
        TIPO_ENTIDAD: tipoEntidad,
        ID_USUARIO: user.ID_USUARIO
      });
      navigate("/entidades");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <NavLink to={"/entidades"}>
        <button >Regresar</button>
      </NavLink>

      <h1 className="title-form">Agregar Entidad</h1>

      <div className="contenedor">
        <form onSubmit={saveEntidad}>
          <p>{msg}</p>

          <div className="row">
            <div className="col-25">
              <label className="label-form">Razón Social</label>
            </div>
            <div className="col-75">
              <input
                className="input-form"
                type="text"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                placeholder="Razón Social"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="label-form">RUC</label>
            </div>
            <div className="col-75">
              <input
                className="input-form"
                type="text"
                value={ruc}
                onChange={(e) => setRuc(e.target.value)}
                placeholder="RUC"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="label-form">Tipo de Entidad</label>
            </div>
            <div className="col-75">
              <select
                className="input-form"
                value={tipoEntidad}
                onChange={(e) => setTipoEntidad(parseInt(e.target.value))}
                required
              >
                <option value={1}>Cliente</option>
                <option value={2}>Proveedor</option>
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

export default FormAddEntidad;
