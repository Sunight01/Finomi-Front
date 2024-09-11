import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logoutAPI } from "../../../services/api/auth";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from '@mui/material/Divider';


const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAnchorEl(null);
      navigate('/');
    }

  }

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
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          sx={{ 
            '& .MuiPaper-root': {
              margin: '0px 10px 0px 20px',
              borderRadius: '12px',
            }
           }}
        >
          <div className="flex justify-between items-center ml-4">
            <PersonOutlineIcon />
            <div className="flex flex-col ml-4 mr-4 mb-2">
              <span>user</span>
              <span>email@email.com</span>
            </div>
          </div>
          <Divider />
          <MenuItem onClick={handleClose}>
            <Link to={'/usuario/perfil'} className="w-full h-full">
              Perfil
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={'/usuario/solicitudes'} className="w-full h-full">
              Mis solicitudes
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} className="w-full h-full">Salir</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default UserMenu;