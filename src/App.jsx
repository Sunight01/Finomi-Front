import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Finomi from "./pages/Finomi";
import Solicitudes from "./pages/User/Solicitudes";
import ViewSuggests from "./pages/User/Admin/ViewSuggests";

import Profile from "./pages/User/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/finomi" element={<Finomi />} />

        <Route path="/usuario/perfil" element={<Profile />} />
        <Route path="/usuario/solicitudes" element={<Solicitudes />} />

        <Route
          path="/usuario/admin/ver-solicitudes"
          element={<ViewSuggests />}
        />
      </Routes>
    </Router>
  );
}

export default App;
