import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./common/Login";

import Users from "./pages/usuario/Users";
import AddUser from "./pages/usuario/AddUser";
import EditUser from "./pages/usuario/EditUser";

import Entidad from "./pages/entidad/Entidad";
import AddEntidad from "./pages/entidad/AddEntidad";
import EditEntidad from "./pages/entidad/EditEntidad";

import Bancos from "./pages/banco/Banco";
import AddBanco from "./pages/banco/AddBanco";
import EditBanco from "./pages/banco/EditBanco";

function App() {
  return (  
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/usuarios" element={<Users />} />
          <Route path="/usuario/add" element={<AddUser />} />
          <Route path="/usuario/edit/:id" element={<EditUser />} />

          <Route path="/entidades" element={<Entidad />} />
          <Route path="/entidad/add" element={<AddEntidad />} />
          <Route path="/entidad/edit/:id" element={<EditEntidad />} />

          <Route path="/bancos" element={<Bancos />} />
          <Route path="/banco/add" element={<AddBanco />} />
          <Route path="/banco/edit/:id" element={<EditBanco />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;