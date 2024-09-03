/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { getTransactions } from "../../services/api/transactions";

import Template from "../../components/templates/Template";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import ViewDialog from "./ViewDialog";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

const Wallet = () => {
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const isCurrentMonth = (date) => {
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const disablePastMonths = (date) => {
    const now = new Date();
    if (date.getFullYear() === now.getFullYear()) {
      const dif = now.getMonth() - date.getMonth();
      if (dif === 2) {
        return true;
      }
    }
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleMinusMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleOpenEdit = (data) => {
    setSelectedTransaction(data);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenView = (data) => {
    setSelectedTransaction(data);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const onUpdate = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction
    );
    setTransactions(updatedTransactions);
  };

  const onDelete = (deletedTransaction) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== deletedTransaction.id
    );
    setTransactions(updatedTransactions);
  };

  const getUserTransactions = async (data) => {
    setTransactions(data);
  };

  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  const filterTransactionsByMonth = (transactions, date) => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const filteredTransactions = filterTransactionsByMonth(
    transactions,
    currentDate
  );

  useEffect(() => {
    const callTransactions = async () => {
      const res = await getTransactions();
      if (res.status === 200) {
        if (transactions.length === 0) {
          getUserTransactions(res.response);
        }
      }
    };
    callTransactions();
  }, []);
  return (
    <>
      <Template>
        <div className="w-full h-auto flex flex-row justify-center items-center mt-8">
          <Tooltip title="Volver al mes anterior">
            <button
              className={`w-12 h-12 rounded-full flex justify-center items-center ${
                disablePastMonths(currentDate)
                  ? "bg-gray-100 cursor-not-allowed opacity-50"
                  : "hover:bg-gray-200"
              }`}
              onClick={handleMinusMonth}
              disabled={disablePastMonths(currentDate)}
            >
              <ArrowBackIosNewIcon fontSize="large" />
            </button>
          </Tooltip>

          <div className="lg:w-32 mbm:max-lg:w-20 md:mx-36 mbm:max-md:mx-2 mx-1 text-center">
            <span className="lg:text-3xl mbm:max-lg:text-2xl sm:text-xl font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
          </div>
          <Tooltip title="Ir al mes siguiente">
            <button
              className={`w-12 h-12 rounded-full flex justify-center items-center ${
                isCurrentMonth(currentDate)
                  ? "bg-gray-100 cursor-not-allowed opacity-50"
                  : "hover:bg-gray-200"
              }`}
              onClick={handleNextMonth}
              disabled={isCurrentMonth(currentDate)}
            >
              <ArrowForwardIosIcon fontSize="large" />
            </button>
          </Tooltip>
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

        {!filteredTransactions.length && (
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
              {filteredTransactions
                .filter((transaction) => transaction.type === "Ingreso")
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

                      <Tooltip title="Editar">
                        <button
                          className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-green-100 duration-200"
                          onClick={() => handleOpenEdit(transaction)}
                        >
                          <EditIcon fontSize="medium" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Ver">
                        <button className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-green-100 duration-200"
                        onClick={() => handleOpenView(transaction)}
                        >
                          <VisibilityOutlinedIcon fontSize="large" />
                        </button>
                      </Tooltip>
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
              {filteredTransactions
                .filter((transaction) => transaction.type === "Gasto")
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
                      <Tooltip title="Editar">
                        <button
                          className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-red-100 duration-200"
                          onClick={() => handleOpenEdit(transaction)}
                        >
                          <EditIcon fontSize="medium" />
                        </button>
                      </Tooltip>
                      <Tooltip title="Ver">
                        <button className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-red-100 duration-200"
                        onClick={() => handleOpenView(transaction)}
                        >
                          <VisibilityOutlinedIcon fontSize="large" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <CreateDialog
          open={openCreate}
          close={handleCloseCreate}
          add={addTransaction}
        />
        <EditDialog
          open={openEdit}
          close={handleCloseEdit}
          update={onUpdate}
          transaction={selectedTransaction}
        />

        <ViewDialog
          open={openView}
          close={handleCloseView}
          transaction={selectedTransaction}
          deleteData={onDelete}
        />

      </Template>
    </>
  );
};

export default Wallet;
