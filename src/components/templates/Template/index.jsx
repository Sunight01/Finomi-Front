/* eslint-disable react-hooks/exhaustive-deps */
import UserMenu from "../../Navbar/UserMenu";
import MenuNavbar from "../../Navbar/MenuNavbar";
import { useEffect, useState } from "react";

import UnauthDialog from "../../templates/UnauthDialog";

import { getLocalStorage } from "../../../functions/localStorage";
import { verifyUserAPI } from "../../../services/api/auth";

const Template = (props) => {
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

  useEffect(() => {
    // Funcion para verificar la sesion del usuario.
    const verif = async () => {
      const ls = getLocalStorage("user");
      const ls_t = getLocalStorage("token");

      if (ls === null || ls_t === null) {
        setUnauth(true);
        return;
      }

      const res = await verifyUserAPI();
      if (res.status === 401) {
        if (res.message === "No tienes permisos para acceder a esta página") {
          setUnauth(true);
          console.log(unauth);
        }
      }

      if (ls) {
        const { username } = ls;
        setUser(username);
      }
    };

    verif();
  }, [unauth]);
  return (
    <>
      <div className="flex min-h-screen w-full bg-main-white flex border-box">
        <nav className="block mbm:hidden rounded-b-xl flex flex-row justify-between items-center w-full h-16 px-8 py-10 shadow-lg fixed bg-main-white border-box">
          <UserMenu />
          <MenuNavbar />
        </nav>
        <aside className="bg-main-white w-24 h-screen px-6 py-12 flex flex-col justify-between fixed top-0 left-0 border-box hidden mbm:flex">
          <MenuNavbar />
          <UserMenu />
        </aside>
        <div className="bg-white w-full lg:my-8 mbm:mr-8 sm:my-4 rounded-3xl border-gray-200 flex flex-col flex-grow overflow-hidden border-box mbm:ml-24 sm:max-mbm:mt-24">
          <header className="bg-super-light-gray min-h-28 py-4 px-8">
            <h1 className="sm:text-2xl mbm:text-4xl font-semibold">
              Bienvenido, {user}!
            </h1>
            <p className="sm:text-xl mbm:text-2xl font-medium">
              {months[currentDate.getMonth()]}, {currentDate.getFullYear()}
            </p>
          </header>
          <div className="flex-grow w-full">
            {props.children}
          </div>
        </div>
      </div>
      <UnauthDialog unauth={unauth} />
    </>
  );
};

export default Template;
