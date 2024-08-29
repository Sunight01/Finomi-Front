import { useEffect, useState } from "react";

import { getTransactions } from "../../services/api/transactions";

import Template from "../../components/templates/Template";
import CreateDialog from "./CreateDialog";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

const Wallet = () => {
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState(2);
  const [transactions, setTransactions] = useState([]);

  const [openCreate, setOpenCreate] = useState(false);

  const handleNextMonth = () => {
    setMonth(month + 1);
  };

  const handleMinusMonth = () => {
    setMonth(month - 1);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  useEffect(() => {
    setMonths(["Junio", "Julio", "Agosto"]);
    const getUserTransactions = async () => {
      const res = await getTransactions();
      console.log(res);
      if (res.status === 200) {
        setTransactions(res.response);
      }
    };

    getUserTransactions();
  }, []);
  return (
    <>
      <Template>
        <div className="w-full h-auto flex flex-row justify-center items-center mt-8">
          <button
            className={`hover:bg-gray-200 w-12 h-12 rounded-full flex justify-center items-center ${
              month === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleMinusMonth}
            disabled={month === 0}
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </button>
          <div className="lg:w-32 mbm:max-lg:w-20 md:mx-36 mbm:max-md:mx-2 mx-1 text-center">
            <span className="lg:text-3xl mbm:max-lg:text-2xl sm:text-xl font-semibold">
              {months[month]}
            </span>
          </div>
          <button
            className={`hover:bg-gray-200 w-12 h-12 rounded-full flex justify-center items-center ${
              month === 2 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextMonth}
            disabled={month === 2}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </button>
        </div>

        <div className="w-full h-10 flex flex-row justify-center items-center mt-4">
          <Tooltip title="Añadir">
            <button
              className="w-16 h-16 rounded-full flex justify-center items-center hover:bg-gray-200 duration-200 absolute transform"
              onClick={handleOpenCreate}
            >
              <div className="relative w-full h-auto flex flex-row justify-center items-center">
                <AddCircleOutlineIcon
                  fontSize="large"
                  sx={{ color: "black" }}
                />
              </div>
            </button>
          </Tooltip>
        </div>

        {!transactions.length && (
          <div className="h-auto w-auto p-10 pt-4 flex flex-row justify-center items-center">
            <p className="text-center text-gray-500 text-lg">
              No tienes ningún ingreso o gasto en este mes, añade alguno para
              verlo aquí!
            </p>
          </div>
        )}

        <div className="h-auto w-auto p-10 pt-4 flex flex-row justify-between">
          <div className="h-full w-[830px] max-w-[830px]">
            <span className="text-2xl text-gray-500 font-semibold hover:text-green-500 duration-200">
              Ingresos
            </span>

            <div className="my-12 w-full flex flex-row flex-wrap gap-8">
              {transactions
                .filter((transaction) => transaction.type === "Ingreso") // Filtra las transacciones
                .map((transaction) => (
                  <div
                    className="h-26 w-full text-left flex flex-row justify-between items-center"
                    key={transaction.id}
                  >
                    <div className="flex flex-col gap-1">
                      <h1 className="text-lg font-semibold">
                        {transaction.title}
                      </h1>
                      <span className="text-lg text-gray-500">
                        {transaction.description}
                      </span>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-4">
                      <span className="text-xl font-semibold text-green-600">
                        ${transaction.amount}
                      </span>
                      <button className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-green-100 duration-200">
                        <EditIcon fontSize="medium" />
                      </button>
                      <button className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-green-100 duration-200">
                        <VisibilityOutlinedIcon fontSize="large" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ margin: "0 20px" }}
          />

          <div className="h-full w-200 text-right w-[830px] max-w-[830px]">
            <span className="text-2xl text-gray-500 font-semibold hover:text-red-400 duration-200">
              Gastos
            </span>

            <div className="my-10 w-full flex flex-row flex-wrap gap-8">
              {transactions
                .filter((transaction) => transaction.type === "Gasto") // Filtra las transacciones
                .map((transaction) => (
                  <div
                    className="h-26 w-full text-left flex flex-row justify-between items-center"
                    key={transaction.id}
                  >
                    <div className="flex flex-col gap-1">
                      <h1 className="text-lg font-semibold">
                        {transaction.title}
                      </h1>
                      <span className="text-lg text-gray-500">
                        {transaction.description}
                      </span>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-4">
                      <span className="text-xl font-semibold text-red-600">
                        ${transaction.amount}
                      </span>
                      <button className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-red-100 duration-200">
                        <EditIcon fontSize="medium" />
                      </button>
                      <button className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-red-100 duration-200">
                        <VisibilityOutlinedIcon fontSize="large" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <CreateDialog open={openCreate} close={handleCloseCreate} />
      </Template>
    </>
  );
};

export default Wallet;
