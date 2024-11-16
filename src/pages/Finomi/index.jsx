import { useState } from "react";

import Template from "../../components/templates/Template";
import { Analysis } from "../../components/Finomi/Analysis";
import { ChatIA } from "../../components/Finomi/Chat/ChatIA";

import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

const Finomi = () => {
  const [activeButton, setActiveButton] = useState("Analisis IA");

  // Funcion para dejar un botón con un estilo en especifico.
  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      <Template>
        <div className="h-full flex flex-col">
          <div className="pl-8 my-2 h-10 w-full flex flex-row gap-2">
            <Tooltip title="Analisis IA">
              <button
                id="analysis-button"
                className={`hover:bg-gray-200 p-2 rounded-lg duration-200 ${
                  activeButton === "Analisis IA" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleClick("Analisis IA")}
              >
                Análisis IA
              </button>
            </Tooltip>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Tooltip title="Asistente IA">
              <button
                id="chat-button"
                className={`hover:bg-gray-200 p-2 rounded-lg duration-200 ${
                  activeButton === "Asistente IA" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleClick("Asistente IA")}
              >
                Asistente IA
              </button>
            </Tooltip>
          </div>
          <Divider variant="middle" />
          {activeButton === "Analisis IA" && <Analysis />}
          {activeButton === "Asistente IA" && <ChatIA />}
        </div>
      </Template>
    </>
  );
};

export default Finomi;
