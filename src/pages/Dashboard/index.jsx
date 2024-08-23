/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { verifyUserAPI } from "../../services/api/auth"
import { getLocalStorage, removeLocalStorage } from "../../functions/localStorage"

import Template from "../../components/templates/Template";

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState('user')

  useEffect( () => {

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

    verif()
  }, [])
  return (
    <>
      <Template>
        <header className="bg-blue-500 min-h-28 py-4 px-8">
          <h1 className="text-4xl font-semibold">Bienvenido, {user}!</h1>
          <p className="text-2xl font-medium">Junio, 2024</p>
        </header>
      </Template>
    </>
  )
}

export default Dashboard
