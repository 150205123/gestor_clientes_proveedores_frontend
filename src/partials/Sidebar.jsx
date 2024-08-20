import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  calendarClearOutline,
  mailOutline,
  peopleOutline,
  schoolOutline,
  lockClosedOutline,
  peopleCircleOutline,
  ribbonOutline,
  businessOutline,
  heartCircleOutline
} from "ionicons/icons";

import logo from "../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = ({ isActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const listRefs = useRef({});

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };


  const handleMouseOver = (key) => {
    Object.keys(listRefs.current).forEach((refKey) => {
      if (listRefs.current[refKey]) {
        listRefs.current[refKey].classList.toggle("hovered", refKey === key);
      }
    });
  };
  const setRef = (key, el) => {
    if (el) {
      listRefs.current[key] = el;
    }
  };

  return (
    <aside className={`navegacion  ${isActive ? "activado" : ""}`}
      style={{ overflow: "auto", scrollbarWidth: "none" }} >
      <div>
        <ul>
          <li>
            <NavLink>
              <span className="icon">
                <img src={logo} style={{ height: "90px", marginTop: "15px", marginLeft: "-70px", marginRight: "-50px" }} alt="tecnologo" />
              </span>
              <span className="title">"VIÑA VIEJA"</span>
            </NavLink>
          </li>


          <li ref={(el) => setRef("dashboard", el)} onMouseOver={() => handleMouseOver("dashboard")}>
            <NavLink to={"/dashboard"}>
              <span className="icon">
                <IonIcon icon={homeOutline} />
              </span>
              <span className="title">Dashboard</span>
            </NavLink>
          </li>

          {user && user.ID_ROL === 1 && (
            <li ref={(el) => setRef("usuarios", el)} onMouseOver={() => handleMouseOver("usuarios")}>
              <NavLink to={"/usuarios"}>
                <span className="icon">
                  <IonIcon icon={peopleOutline} />
                </span>
                <span className="title">Usuarios</span>
              </NavLink>
            </li>
          )}

         
            <li ref={(el) => setRef("entidades", el)} onMouseOver={() => handleMouseOver("entidades")}>
              <NavLink to={"/entidades"}>
                <span className="icon">
                  <IonIcon icon={peopleCircleOutline} />
                </span>
                <span className="title">Entidades</span>
              </NavLink>
            </li>
        


            <li ref={(el) => setRef("bancos", el)} onMouseOver={() => handleMouseOver("bancos")}>
              <NavLink to={"/bancos"}>
                <span className="icon">
                  <IonIcon icon={businessOutline} />
                </span>
                <span className="title">Cuentas bancarias</span>
              </NavLink>
            </li>
          


          <li
            ref={(el) => setRef("cerrar_sesion", el)}
            onMouseOver={() => handleMouseOver("cerrar_sesion")}
            itemType="submit"
            onClick={logout}
          >
            <NavLink>
              <span className="icon">
                <IonIcon icon={lockClosedOutline} />
              </span>
              <span className="title">cerrar sesión</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
