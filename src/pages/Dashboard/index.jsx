/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { verifyUserAPI } from "../../services/api/auth"
import { getLocalStorage } from "../../functions/localStorage"

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect( () => {
    const verif = async() => {
      const ls = getLocalStorage("user")
      const ls_t = getLocalStorage("token")
      if (ls) {
        if (ls_t) {
          const res = await verifyUserAPI()
          console.log(res)
          if (res.status !== 200) {
            navigate("/")
          }
        }
      } else {
        navigate("/")
      }
    }

    verif()
  }, [])
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
