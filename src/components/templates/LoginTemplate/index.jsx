/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getLocalStorage } from "../../../functions/localStorage";
import { useNavigate } from "react-router-dom";

const LoginTemplate = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verif = async () => {
      const ls = getLocalStorage("user");
      const ls_t = getLocalStorage("token");

      if (ls && ls_t) {
        navigate("/dashboard");
        return;
      }
    };

    verif();
  }, []);
  return (
    <div className="h-screen w-full flex items-center justify-center bg-main-white">
      <div className="w-100 min-h-100 max-h-106 bg-white rounded-3xl border-gray-200 border-2 p-12">
        {props.children}
      </div>
    </div>
  );
};

export default LoginTemplate;
