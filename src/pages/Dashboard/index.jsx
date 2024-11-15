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

  // Obtenemos la fecha actual
  const currentDate = new Date();

  const filterTransactionsByMonth = (transactions, date) => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Función para calcular los ingresos y los gastos más altos
  const maxTransactions = (data) => {
    let totalIngresos = 0;
    let totalGastos = 0;
    let maxIngreso = {};
    let maxGasto = {};

    const filteredTransactions = filterTransactionsByMonth(data, currentDate);

    filteredTransactions.forEach((transaction) => {
      const amount = Number(transaction.amount);
      if (transaction.type === "Ingreso") {
        totalIngresos += amount;
        if (!maxIngreso.amount || amount > maxIngreso.amount) {
          maxIngreso = transaction;
        }
      } else if (transaction.type === "Gasto") {
        totalGastos += amount;
        if (!maxGasto.amount || amount > maxGasto.amount) {
          maxGasto = transaction;
        }
      }
    });

    setMayorGasto(maxGasto);
    setMayorIngreso(maxIngreso);
    setBeneficio(totalIngresos - totalGastos);

    setTotalIngresos(totalIngresos);
    setTotalGastos(totalGastos);
  };

  useEffect(() => {
    // Función para obtener todos los datos financieros del usuario
    const callMaxTransactions = async () => {
      try {
        const res = await getTransactions();

        if (res.status === 200) {
          maxTransactions(res.response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Función para obtener el último consejo del usuario
    const callIAdvice = async () => {
      try {
        const res = await getChatAPI();

        if (res.status === 200) {
          setIAdvice(res.response[0].messages[2].content);
        }
      } catch (error) {
        console.log(error)
      }
    };

    callMaxTransactions();
    callIAdvice();
  }, []);

  return (
    <>
      <Template>
        <div className="h-auto w-auto flex flex-wrap p-6 sm:max-md:p-2">
          <div className="flex flex-1 flex-col shadow-lg justify-center items-center content-center h-60 min-w-[200px] bg-light-green rounded-2xl m-4 gap-12">
            <CheckCircleOutlineIcon fontSize="large" />
            <span id="incomes" className="text-4xl font-semibold">${totalIngresos}</span>
            <span className="text-xl font-semibold">Ingresos</span>
          </div>
          <div className="flex flex-1 flex-col shadow-lg justify-center items-center content-center h-60 min-w-[200px] bg-light-blue rounded-2xl m-4 gap-12">
            <MonetizationOnOutlinedIcon fontSize="large" />
            <span id="benefits" className="text-4xl font-semibold">${beneficio}</span>
            <span className="text-xl font-semibold">Beneficio</span>
          </div>
          <div className="flex flex-1 flex-col shadow-lg justify-center items-center content-center h-60 min-w-[200px] bg-light-red rounded-2xl m-4 gap-12">
            <HighlightOffIcon fontSize="large" />
            <span id="expenses" className="text-4xl font-semibold">${totalGastos}</span>
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
