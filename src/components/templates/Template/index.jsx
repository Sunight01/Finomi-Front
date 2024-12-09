/* eslint-disable react-hooks/exhaustive-deps */
import UserMenu from "../../Navbar/UserMenu";
import MenuNavbar from "../../Navbar/MenuNavbar";
import { useEffect, useState } from "react";

import UnauthDialog from "../../templates/UnauthDialog";

import { getLocalStorage } from "../../../functions/localStorage";
import { verifyUserAPI } from "../../../services/api/auth";
import { getDollarAPI, getUfAPI } from "../../../services/api/dollar";

import Divider from "@mui/material/Divider";

const Template = (props) => {
  const [dollar, setDollar] = useState(0);
  const [uf, setUf] = useState(0);
  const [user, setUser] = useState("user");
  const [unauth, setUnauth] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const getDollar = async () => {
    try {
      const dollar = await getDollarAPI();
      setDollar(dollar.serie[0].valor);
    } catch (error) {
      console.log(error);
      setDollar(0);
    }
  };

  const getUf = async () => {
    try {
      const uf = await getUfAPI();
      setUf(uf.serie[0].valor);
    } catch (error) {
      console.log(error);
      setUf(0);
    }
  };

  useEffect(() => {
    // Funcion para verificar la sesion del usuario.
    const verif = async () => {
      const ls = getLocalStorage("user");
      const ls_t = getLocalStorage("token");

      if (!ls || !ls_t) {
        setUnauth(true);
        return;
      }

      try {
        const res = await verifyUserAPI();
        if (
          res.status === 401 &&
          res.message === "No tienes permisos para acceder a esta página"
        ) {
          setUnauth(true);
          return;
        }

        if (ls.username) {
          setUser(ls.username);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setUnauth(true);
      }
    };

    verif();
    getDollar();
    getUf();
  }, []); // Dependencia vacía para que solo corra una vez al montar el componente

  return (
    <>
      <div className="flex min-h-screen w-full bg-main-white flex border-box">
        <nav className="block mdm:hidden rounded-b-xl flex flex-row justify-between items-center w-full h-16 px-8 py-10 shadow-lg fixed bg-main-white border-box">
          <UserMenu />
          <MenuNavbar />
        </nav>
        <aside className="bg-main-white w-24 h-screen px-6 py-12 flex flex-col justify-between fixed top-0 left-0 border-box hidden mdm:flex">
          <MenuNavbar />
          <UserMenu />
        </aside>
        <div className="bg-white w-full lg:my-8 mdm:mr-8 sm:my-4 rounded-3xl border-gray-200 flex flex-col flex-grow overflow-hidden border-box mdm:ml-24 sm:max-mdm:mt-24">
          <header className="bg-super-light-gray min-h-28 py-4 px-8 flex flex-row sm:max-lg:flex-col justify-between sm:max-lg:items-center sm:max-lg:text-center">
            <div className="flex flex-col">
              <h1 className="sm:text-2xl mbm:text-4xl font-semibold">
                Bienvenido, {user}!
              </h1>
              <p className="sm:text-xl mbm:text-2xl font-medium">
                {currentDate.getDate()} de {months[currentDate.getMonth()]},{" "}
                {currentDate.getFullYear()}
              </p>
            </div>
            <div className="flex flex-row sm:max-lg:mt-4">
              <div className="flex flex-col h-full justify-center items-center">
                <span className="text-lg sm:max-mbm:text-base">Valor del dólar</span>
                <span className="text-lg font-semibold sm:max-lg:text-base">CLP ${dollar.toLocaleString("es-CL")}</span>
              </div>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ margin: "0 20px" }}
              />
              <div className="flex flex-col h-full justify-center items-center">
                <span className="text-lg sm:max-mbm:text-base">Valor de UF</span>
                <span className="text-lg font-semibold sm:max-lg:text-base">CLP ${uf.toLocaleString("es-CL")}</span>
              </div>
            </div>
          </header>
          <div className="flex-grow w-full">{props.children}</div>
        </div>
      </div>
      <UnauthDialog unauth={unauth} />
    </>
  );
};

export default Template;
