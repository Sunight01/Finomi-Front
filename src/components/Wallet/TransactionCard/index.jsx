/* eslint-disable react/prop-types */
import Tooltip from "@mui/material/Tooltip";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const TransactionCard = ({
  transaction,
  handleOpenEdit,
  handleOpenView,
  color
}) => {
  if (!transaction) return null;
  // Componente para hacer un card en donde se aparecerá cada dato financiero.
  return (
    <>
      <div
        className="h-26 w-full text-left flex flex-row justify-between items-center"
        key={transaction.id}
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">{transaction.title}</h1>
          <span className="text-lg text-gray-500">
            {transaction.description}
          </span>
        </div>

        <div className="flex flex-row justify-center items-center gap-4">
          <span className={`text-xl font-semibold ${color === "green" ? "text-green-500" : color === "red" ? "text-red-500" : ""}`}>
            ${transaction.amount}
          </span>

          <Tooltip title="Editar">
            <button
              className={`w-10 h-10 rounded-full flex justify-center items-center ${color === "green" ? "hover:bg-green-100" : color === "red" ? "hover:bg-red-100" : ""} duration-200`}
              onClick={() => handleOpenEdit(transaction)}
            >
              <EditIcon fontSize="medium" />
            </button>
          </Tooltip>

          <Tooltip title="Ver">
            <button
              className={`w-10 h-10 rounded-full flex justify-center items-center ${color === "green" ? "hover:bg-green-100" : color === "red" ? "hover:bg-red-100" : ""} duration-200`}
              onClick={() => handleOpenView(transaction)}
            >
              <VisibilityOutlinedIcon fontSize="large" />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export { TransactionCard };