import { useState } from "react";
import { Link } from "react-router-dom";

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const MenuNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Función para abrir el menú
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funcion para cerrar el menú
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Tooltip title="Menú">
          <button
            className="bg-main-white rounded-3xl text-center h-12"
            onClick={handleClick}
            aria-controls={open ? "navbar-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuOutlinedIcon fontSize="large" />
          </button>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="navbar-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{ 
            '& .MuiPaper-root': {
              margin: '0px 10px 0px 20px',
              borderRadius: '12px', // Ajusta el valor según tus necesidades
            }
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to={'/dashboard'} className="w-full h-full">
              <AutoAwesomeMosaicOutlinedIcon/> <span className="ml-2">Dashboard</span>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={'/wallet'} className="w-full h-full">
              <AccountBalanceWalletOutlinedIcon /> <span className="ml-2">Mi billetera</span>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={'/finomi'} className="w-full h-full">
              <PersonOutlineOutlinedIcon /> <span className="ml-2">Finomi</span>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default MenuNavbar;
