/* eslint-disable react-hooks/exhaustive-deps */
import UserMenu from "../../Navbar/UserMenu";
import MenuNavbar from "../../Navbar/MenuNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getLocalStorage,
  removeLocalStorage,
} from "../../../functions/localStorage";
import { verifyUserAPI } from "../../../services/api/auth";

const Template = (props) => {
  const [user, setUser] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    const clearStorage = () => {
      removeLocalStorage("user");
      removeLocalStorage("token");
      navigate("/");
    };

    const verif = async () => {
      const ls = getLocalStorage("user");
      const ls_t = getLocalStorage("token");

      const { username } = ls;

      if (ls === null || ls_t === null) {
        clearStorage();
        return;
      }

      const res = await verifyUserAPI();
      if (res.status === 401) {
        clearStorage();
      }

      setUser(username);
    };

    verif();
  }, []);
  return (
    <>
      <div className="flex min-h-screen w-full bg-main-white flex border-box">
        <aside className="bg-main-white w-24 h-screen px-6 py-12 flex flex-col justify-between fixed top-0 left-0 border-box">
          <MenuNavbar />
          <UserMenu />
        </aside>
        <div className="bg-white min-h-auto w-full md:my-8 mr-8 sm:my-4 rounded-3xl border-gray-200 overflow-hidden border-box ml-24">
          <header className="bg-super-light-gray min-h-28 py-4 px-8">
            <h1 className="sm:text-2xl mbm:text-4xl font-semibold">Bienvenido, {user}!</h1>
            <p className="sm:text-xl mbm:text-2xl font-medium">Junio, 2024</p>
          </header>
          <div className="h-full w-full">
            {props.children}
          </div>

        </div>
      </div>
    </>
  );
};

export default Template;
