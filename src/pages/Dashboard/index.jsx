/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyUserAPI } from "../../services/api/auth";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../functions/localStorage";

import Template from "../../components/templates/Template";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("user");

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
      <Template>
        <header className="bg-super-light-gray min-h-28 py-4 px-8">
          <h1 className="text-4xl font-semibold">Bienvenido, {user}!</h1>
          <p className="text-2xl font-medium">Junio, 2024</p>
        </header>

        <div className="h-auto w-auto flex flex-wrap sm:max-lg:flex-row justify-between sm:max-lg:justify-center items-center content-center p-8 sm:max-md:p-4">
          <div className="flex flex-col shadow-lg justify-center items-center content-center h-60 w-80 bg-green-400 rounded-2xl m-4 gap-12">
            <span>Icon</span>
            <span>$100000</span>
            <span>Ingresos</span>
          </div>
          <div className="flex flex-col shadow-lg justify-center items-center content-center h-60 w-80 bg-blue-400 rounded-2xl m-4 gap-12">
            <span>Icon</span>
            <span>$100000</span>
            <span>Beneficio</span>
          </div>
          <div className="flex flex-col shadow-lg justify-center items-center content-center h-60 w-80 bg-red-400 rounded-2xl m-4 gap-12">
            <span>Icon</span>
            <span>$100000</span>
            <span>Gastos</span>
          </div>
        </div>

        <div className="h-auto w-auto m-8 sm:max-md:m-4 flex sm:max-lg:flex-wrap sm:max-lg:gap-10">

          <div className="bg-green-500 w-full h-auto mr-2 rounded-2xl flex sm:max-md:flex-col justify-between sm:max-md:justify-center items-center shadow-lg px-20 sm:max-md:px-8 py-4">
            <div>
              <span className="flex justify-center items-center text-center font-semibold">Mayor ingreso</span>
              <span className="flex justify-center items-center">Trabajo</span>
            </div>
            <div>
              <span>$10000</span>
            </div>
          </div>

          <div className="bg-red-500 w-full h-auto mr-2 rounded-2xl flex sm:max-md:flex-col justify-between sm:max-md:justify-center items-center shadow-lg px-20 sm:max-md:px-8 py-4">
            <div>
              <span className="flex justify-center items-center text-center font-semibold">Mayor gasto</span>
              <span className="flex justify-center items-center">Trabajo</span>
            </div>
            <div>
              <span>$10000</span>
            </div>
          </div>

        </div>
        
        <div className="h-auto w-auto m-8 sm:max-md:m-4 rounded-2xl flex flex-wrap justify-between shadow-lg p-8 sm:max-md:p-4">
          <h2 className="text-xl sm:max-md:text-lg font-semibold sm:max-md:text-center mb-2">Ultimo consejo</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus praesentium eius totam vero ipsa tenetur dolores incidunt! Sint beatae, itaque voluptates laudantium alias aliquam unde. Modi at deserunt illo eaque? lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus praesentium eius totam vero ipsa tenetur dolores incidunt! Sint beatae, itaque voluptates laudantium alias aliquam unde. Modi at deserunt illo eaque?</p>
        </div>
      </Template>
    </>
  );
};

export default Dashboard;
