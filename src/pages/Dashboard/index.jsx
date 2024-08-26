/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyUserAPI } from "../../services/api/auth";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../functions/localStorage";

import Template from "../../components/templates/Template";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

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

        <div className="h-auto w-auto flex flex-wrap sm:max-xl:flex-row justify-between sm:max-xl:justify-center items-center content-center p-8 sm:max-md:p-4">
          <div className="flex flex-col shadow-lg justify-center items-center content-center h-60 w-100 bg-light-green rounded-2xl m-4 gap-12">
            <CheckCircleOutlineIcon fontSize="large" />
            <span className="text-4xl font-semibold">$100000</span>
            <span className="text-xl font-semibold">Ingresos</span>
          </div>
          <div className="flex flex-col shadow-lg justify-center items-center content-center h-60 w-100 bg-light-blue rounded-2xl m-4 gap-12">
            <MonetizationOnOutlinedIcon fontSize="large" />
            <span className="text-4xl font-semibold">$100000</span>
            <span className="text-xl font-semibold">Beneficio</span>
          </div>
          <div className="flex flex-col shadow-lg justify-center items-center content-center h-60 w-100 bg-light-red rounded-2xl m-4 gap-12">
            <HighlightOffIcon fontSize="large" />
            <span className="text-4xl font-semibold">$100000</span>
            <span className="text-xl font-semibold">Gastos</span>
          </div>
        </div>

        <div className="text-xl h-auto w-auto m-8 sm:max-md:m-4 flex sm:max-lg:flex-wrap sm:max-lg:gap-10">

          <div className="bg-light-green w-full h-auto mr-2 rounded-2xl flex sm:max-md:flex-col justify-between sm:max-md:justify-center items-center shadow-lg px-20 sm:max-md:px-8 py-4">
            <div>
              <span className="flex justify-center items-center text-center font-semibold">Mayor ingreso</span>
              <span className="flex justify-center items-center">Trabajo</span>
            </div>
            <div>
              <span className="text-3xl font-semibold">$10000</span>
            </div>
          </div>

          <div className="bg-light-red w-full h-auto mr-2 rounded-2xl flex sm:max-md:flex-col justify-between sm:max-md:justify-center items-center shadow-lg px-20 sm:max-md:px-8 py-4">
            <div>
              <span className="flex justify-center items-center text-center font-semibold">Mayor gasto</span>
              <span className="flex justify-center items-center">Trabajo</span>
            </div>
            <div>
              <span className="text-3xl font-semibold">$10000</span>
            </div>
          </div>

        </div>
        
        <div className="h-auto w-auto m-8 sm:max-md:m-4 rounded-2xl flex flex-wrap justify-between shadow-lg p-8 sm:max-md:p-4">
          <h2 className="text-xl sm:max-md:text-lg font-semibold sm:max-md:text-center mb-2">Ultimo consejo</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus praesentium eius totam vero ipsa tenetur dolores incidunt! Sint beatae, itaque voluptates laudantium alias aliquam unde. Modi at deserunt illo eaque? lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus praesentium eius totam vero ipsa tenetur dolores incidunt! Sint beatae, itaque voluptates laudantium alias aliquam unde. Modi at deserunt illo eaque? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde ipsa, ullam itaque tempore omnis at commodi amet delectus quae, distinctio reprehenderit repudiandae accusantium numquam, animi sequi perspiciatis rerum maiores rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, cum? Expedita quisquam nobis incidunt a dolores, dolorum aut placeat voluptate sint sed. Totam praesentium nemo odit amet quisquam facilis quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti delectus repudiandae earum dolores nemo necessitatibus inventore, eius, fuga laudantium illo error temporibus quaerat nobis fugit odit, id velit commodi! Qui! lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores ipsam beatae eos animi reiciendis a nesciunt, quaerat, sequi nostrum optio officiis impedit accusamus nam cumque unde sapiente eius ratione veritatis! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis nobis nam ullam, voluptatem dolorum fugit non maxime nesciunt! Doloremque id sint nam impedit esse sit quia explicabo dolore eos tenetur! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium autem voluptates est dicta fugiat delectus, alias neque quaerat atque omnis adipisci. Exercitationem voluptatem porro vero excepturi accusamus consequuntur dolore dolor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora harum quibusdam autem quisquam facilis nesciunt distinctio ducimus incidunt porro? Perferendis dolorem est asperiores expedita dolor neque laborum quidem dolore corrupti! </p>
        </div>
      </Template>
    </>
  );
};

export default Dashboard;
