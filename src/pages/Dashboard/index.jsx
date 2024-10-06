import { useEffect, useState } from "react";

import Template from "../../components/templates/Template";
import { ChatMessage } from "../../components/Finomi/Chat/ChatMessage";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import { getTransactions } from "../../services/api/transactions";
import { getChatAPI } from "../../services/api/chat";

const Dashboard = () => {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [beneficio, setBeneficio] = useState(0);
  const [iAdvice, setIAdvice] = useState("");

  const [mayorIngreso, setMayorIngreso] = useState({});
  const [mayorGasto, setMayorGasto] = useState({});
  
  // OBtenemos la fecha actual
  const currentDate = new Date();

  // Función para calcular los ingresos y los gastos más altos
  const maxTransactions = (data) => {

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
      data,
      currentDate
    );

    // Encontrar el mayor ingreso
    const maxIngreso = filteredTransactions
      .filter((transaction) => transaction.type === "Ingreso")
      .reduce(
        (prev, current) => (prev.amount > current.amount ? prev : current),
        {}
      );

    // Encontrar el mayor gasto
    const maxGasto = filteredTransactions
      .filter((transaction) => transaction.type === "Gasto")
      .reduce(
        (prev, current) => (prev.amount > current.amount ? prev : current),
        {}
      );

    // Suma todos los ingresos
    const totalIngresos = filteredTransactions
      .filter((transaction) => transaction.type === "Ingreso")
      .reduce((total, transaction) => total + parseInt(transaction.amount), 0);

    // Sumar todos los gastos
    const totalGastos = filteredTransactions
      .filter((transaction) => transaction.type === "Gasto")
      .reduce((total, transaction) => total + parseInt(transaction.amount), 0);

    const result = totalIngresos - totalGastos;

    setMayorGasto(maxGasto);
    setMayorIngreso(maxIngreso);
    setBeneficio(result);

    setTotalIngresos(totalIngresos);
    setTotalGastos(totalGastos);
  };

  useEffect(() => {
    // Función para obtener todos los datos financieros del usuario
    const callMaxTransactions = async () => {
      const res = await getTransactions();

      if (res.status === 200) {
        maxTransactions(res.response);
      }
    };

    // Función para obtener el último consejo del usuario
    const callIAdvice = async () => {
      const res = await getChatAPI();

      if (res.status === 200) {
        setIAdvice(res.response[0].messages[2].content);
      }
    };

    callMaxTransactions();
    callIAdvice();
  }, []);

  return (
    <>
      <Template>
        <div className="h-auto w-auto flex flex-wrap sm:max-xl:flex-row justify-between sm:max-xl:justify-center items-center content-center p-8 sm:max-md:p-4">
          <div className="flex flex-col shadow-lg justify-center items-center content-center h-60 w-100 bg-light-green rounded-2xl m-4 gap-12">
            <CheckCircleOutlineIcon fontSize="large" />
            <span className="text-4xl font-semibold">${totalIngresos}</span>
            <span className="text-xl font-semibold">Ingresos</span>
          </div>
          <div className="flex flex-col shadow-lg justify-center items-center content-center h-60 w-100 bg-light-blue rounded-2xl m-4 gap-12">
            <MonetizationOnOutlinedIcon fontSize="large" />
            <span className="text-4xl font-semibold">${beneficio}</span>
            <span className="text-xl font-semibold">Beneficio</span>
          </div>
          <div className="flex flex-col shadow-lg justify-center items-center content-center h-60 w-100 bg-light-red rounded-2xl m-4 gap-12">
            <HighlightOffIcon fontSize="large" />
            <span className="text-4xl font-semibold">${totalGastos}</span>
            <span className="text-xl font-semibold">Gastos</span>
          </div>
        </div>

        <div className="text-xl h-auto w-auto m-8 sm:max-md:m-4 flex sm:max-lg:flex-wrap sm:max-lg:gap-10">
          <div className="bg-light-green w-full h-auto mr-2 rounded-2xl flex sm:max-md:flex-col justify-between sm:max-md:justify-center items-center shadow-lg px-20 sm:max-md:px-8 py-4">
            <div>
              <span className="flex justify-center items-center text-center font-semibold">
                Mayor ingreso
              </span>
              <span className="flex justify-center items-center">
                {mayorIngreso.title}
              </span>
            </div>
            <div>
              <span className="text-3xl font-semibold">
                ${mayorIngreso.amount}
              </span>
            </div>
          </div>

          <div className="bg-light-red w-full h-auto mr-2 rounded-2xl flex sm:max-md:flex-col justify-between sm:max-md:justify-center items-center shadow-lg px-20 sm:max-md:px-8 py-4">
            <div>
              <span className="flex justify-center items-center text-center font-semibold">
                Mayor gasto
              </span>
              <span className="flex justify-center items-center">
                {mayorGasto.title}
              </span>
            </div>
            <div>
              <span className="text-3xl font-semibold">
                ${mayorGasto.amount}
              </span>
            </div>
          </div>
        </div>

        <div className="h-auto w-auto m-8 sm:max-md:m-4 rounded-2xl flex flex-col justify-between shadow-lg p-8 sm:max-md:p-4">
          <h2 className="text-xl sm:max-md:text-lg font-semibold sm:max-md:text-center mb-2">
            Ultimo consejo
          </h2>
          <ChatMessage user="assistant" message={iAdvice} />
        </div>
      </Template>
    </>
  );
};

export default Dashboard;
