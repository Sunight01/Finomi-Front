import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logoutAPI } from "../../../services/api/auth";
import { getLocalStorage } from "../../../functions/localStorage";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Función para abrir el menú
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funcion para cerrar el menú
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.status === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAnchorEl(null);
      navigate("/");
    }
  };
  useEffect(() => {
    const callUser = () => {
      const { username, email, role } = getLocalStorage("user");
      setUsername(username);
      setEmail(email);
      setRole(role);
    };
    callUser();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center">
        <Tooltip title="Editar perfil">
          <button
            className="bg-main-white rounded-3xl text-center h-12"
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircleOutlinedIcon fontSize="large" />
          </button>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          sx={{
            "& .MuiPaper-root": {
              margin: "0px 10px 0px 20px",
              borderRadius: "12px",
            },
          }}
        >
          <div className="flex justify-between items-center ml-4">
            <PersonOutlineIcon />
            <div className="flex flex-col ml-4 mr-4 mb-2">
              <span>{username}</span>
              <span>{email}</span>
            </div>
          </div>
          <Divider />
          <MenuItem
            onClick={handleClose}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0px",
            }}
          >
            <Link to={"/usuario/perfil"} className="w-full h-full py-2 px-4">
              Perfil
            </Link>
          </MenuItem>
          {role === "user" ? (
            <MenuItem
              onClick={handleClose}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0px",
              }}
            >
              <Link
                to={"/usuario/solicitudes"}
                className="w-full h-full py-2 px-4"
              >
                Mis solicitudes
              </Link>
            </MenuItem>
          ) : (
            <MenuItem
              onClick={handleClose}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0px",
              }}
            >
              <Link
                to={"/usuario/admin/ver-solicitudes"}
                className="w-full h-full py-2 px-4"
              >
                Solicitudes de usuarios
              </Link>
            </MenuItem>
          )}
          <Divider />
          <MenuItem
            onClick={handleLogout}
            className="w-full h-full p-4"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0px",
            }}
          >
            <span className="w-full h-full py-1 px-4">Salir</span>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default UserMenu;
