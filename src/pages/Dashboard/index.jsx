import { useEffect, useState } from "react";

import Template from "../../components/templates/Template";
import { ChatMessage } from "../../components/Finomi/Chat/ChatMessage";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import { getTransactions } from "../../services/api/transactions";
import { getChatAPI } from "../../services/api/chat";

import { Loading } from "../../components/Loading";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { responsiveFontSizes } from "@mui/material";

const Dashboard = () => {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [beneficio, setBeneficio] = useState(0);
  const [iAdvice, setIAdvice] = useState("");

  const [mayorIngreso, setMayorIngreso] = useState({});
  const [mayorGasto, setMayorGasto] = useState({});

  const [loading, setLoading] = useState(true);

  // Obtenemos la fecha actual
  const currentDate = new Date();

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Total de ingresos", "Total de gastos"],
    datasets: [
      {
        label: "Resumen",
        data: [totalIngresos, totalGastos],
        backgroundColor: ["rgba(144, 238, 144, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 75, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite manipular la altura y el ancho
    plugins: {
      legend: {
        position: "top",
      },
    },
    layout: {
      padding: 10, // Ajusta el espacio dentro del gráfico
    },
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    callMaxTransactions();
    callIAdvice();
  }, []);

  return (
    <>
      <Template>
        {loading && <Loading />}
        <div className="h-auto w-auto flex flex-wrap p-6 sm:max-md:p-2">
          <div className="flex flex-1 flex-col shadow-lg justify-center items-center content-center h-60 min-w-[200px] bg-light-green rounded-2xl m-4 gap-12">
            <CheckCircleOutlineIcon fontSize="large" />
            <span id="incomes" className="text-4xl font-semibold">
              ${totalIngresos.toLocaleString("es-CL")}
            </span>
            <span className="text-xl font-semibold">Ingresos</span>
          </div>
          <div className="flex flex-1 flex-col shadow-lg justify-center items-center content-center h-60 min-w-[200px] bg-light-blue rounded-2xl m-4 gap-12">
            <MonetizationOnOutlinedIcon fontSize="large" />
            <span id="benefits" className="text-4xl font-semibold">
              ${beneficio.toLocaleString("es-CL")}
            </span>
            <span className="text-xl font-semibold">Beneficio</span>
          </div>
          <div className="flex flex-1 flex-col shadow-lg justify-center items-center content-center h-60 min-w-[200px] bg-light-red rounded-2xl m-4 gap-12">
            <HighlightOffIcon fontSize="large" />
            <span id="expenses" className="text-4xl font-semibold">
              ${totalGastos.toLocaleString("es-CL")}
            </span>
            <span className="text-xl font-semibold">Gastos</span>
          </div>
        </div>

        <div className="text-xl h-auto w-auto m-8 sm:max-md:m-4 flex sm:max-lg:flex-wrap sm:max-lg:gap-10 flex flex-row justify-between items-center">
          <div className="flex flex-col gap-10 w-full">
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
                  ${Number(mayorIngreso.amount)?.toLocaleString("es-CL")}
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
                  ${Number(mayorGasto.amount)?.toLocaleString("es-CL")}
                </span>
              </div>
            </div>
          </div>

          {(totalIngresos > 0 || totalGastos > 0) && (
            <div className="w-[400px] sm:max-lg:w-full h-[300px] flex flex-col justify-center items-center">
              <Pie data={data} options={options} />
            </div>
          )}
        </div>

        <div className="h-auto w-auto m-8 sm:max-md:m-4 rounded-2xl flex flex-col justify-between shadow-lg p-8 sm:max-md:p-4">
          <h2 className="text-xl sm:max-md:text-lg font-semibold sm:max-md:text-center mb-2">
            Último consejo
          </h2>
          <ChatMessage user="assistant" message={iAdvice} />
        </div>
      </Template>
    </>
  );
};

export default Dashboard;
