/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { getTransactions } from "../../services/api/transactions";

import Template from "../../components/templates/Template";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import ViewDialog from "./ViewDialog";

import { EmptyMessage } from "../../components/Wallet/EmptyMessage";
import { TransactionCard } from "../../components/Wallet/TransactionCard";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

import { Toaster } from "react-hot-toast";

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

  // Funcion para cononcer el mes actual
  const isCurrentMonth = (date) => {
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  // Funcion para desactivar los meses pasados con una diferencia de dos meses al actual
  const disablePastMonths = (date) => {
    const now = new Date();
    if (date.getFullYear() === now.getFullYear()) {
      const dif = now.getMonth() - date.getMonth();
      if (dif === 2) {
        return true;
      }
    }
  };

  // Funcion para obtener el mes siguiente
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Funcion para obtener el mes anterior
  const handleMinusMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Funcion para abrir el Dialog de creación de transacciones
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  // Funcion para cerrar el Dialog de creación de transacciones
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  // Funcion para abrir el Dialog de edición de transacciones
  const handleOpenEdit = (data) => {
    setSelectedTransaction(data);
    setOpenEdit(true);
  };

  // Funcion para cerrar el Dialog de edición de transacciones
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // Funcion para abrir el Dialog de visualización de transacciones
  const handleOpenView = (data) => {
    setSelectedTransaction(data);
    setOpenView(true);
  };

  // Funcion para cerrar el Dialog de visualización de transacciones
  const handleCloseView = () => {
    setOpenView(false);
  };

  // Función para actualizar la transacción seleccionada y actualizar el estado de la lista de transacciones
  const onUpdate = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction
    );
    setTransactions(updatedTransactions);
  };

  // Función para eliminar la transacción seleccionada y actualizar el estado de la lista de transacciones
  const onDelete = (deletedTransaction) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== deletedTransaction.id
    );
    setTransactions(updatedTransactions);
  };

  // Función para setear la lista de transacciones del usuario
  const getUserTransactions = async (data) => {
    setTransactions(data);
  };

  // Función para agregar una nueva transacción al estado de la lista de transacciones
  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  // Función para filtrar las transacciones por mes
  const filterTransactionsByMonth = (transactions, date) => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Variable en donde están las transacciones filtradas por mes
  const filteredTransactions = filterTransactionsByMonth(
    transactions,
    currentDate
  );

  useEffect(() => {
    // Funcion para obtener todas las transacciones del usuario
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

        {!filteredTransactions.length ? (
          <EmptyMessage message="No tienes ningún ingreso o gasto en este mes, añade alguno para verlo aquí!" />
        ) : (
          <div className="h-auto w-auto p-10 pt-4 flex flex-row justify-between">
            <div className="h-full w-[830px] max-w-[830px]">
              <span className="text-2xl text-gray-500 font-semibold hover:text-green-500 duration-200">
                Ingresos
              </span>

              <div className="my-12 w-full flex flex-row flex-wrap gap-8">
                {filteredTransactions
                  .filter((transaction) => transaction.type === "Ingreso")
                  .map((transaction) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                      handleOpenEdit={handleOpenEdit}
                      handleOpenView={handleOpenView}
                      color="green"
                    />
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
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                      handleOpenEdit={handleOpenEdit}
                      handleOpenView={handleOpenView}
                      color="red"
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

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
        <Toaster position="top-center" reverseOrder={false} />
      </Template>
    </>
  );
};

export default Wallet;
