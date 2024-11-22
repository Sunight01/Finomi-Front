/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DialogTemplate from "../../../components/templates/DialogTemplate";

import { deleteTransactionAPI } from "../../../services/api/transactions";

import toast, { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    black: {
      main: "#000000",
      light: "#000000",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
  },
});

const ViewDialog = ({ open, close, deleteData, transaction }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  // Función para formatear la fecha de la transacción proveniente de la API
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Esto dará el formato "yyyy-MM-dd"
  };

  // Funcion para eliminar la transacción seleccionada
  const handleDelete = async (data) => {
    const deleteLading = toast.loading("Eliminando...");
    const res = await deleteTransactionAPI(data);
    if (res.status === 200) {
      toast.success("Transacción eliminada exitosamente!", {
        id: deleteLading,
      });
      deleteData(data);
      close();
    } else {
      toast.error("Ha ocurrido un error al eliminar la transacción", {
        id: deleteLading,
      });
    }
  };

  // Función para cerrar el modal
  const handleClose = () => {
    close();
  };

  useEffect(() => {
    if (transaction) {
      setVisible(open);
      setData(transaction);
    }
  }, [transaction, open]);
  return (
    <>
      {visible && (
        <DialogTemplate type={"form"}>
          <div className="flex flex-col px-8 py-10 gap-4 max-w-full">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-semibold">{data.title}</h1>
              <button onClick={handleClose}>
                <CloseIcon fontSize="large" />
              </button>
            </div>
            <div className="flex flex-row justify-between items-center">
              <span>{data.type}</span>
              <span>{formatDate(data.date)}</span>
            </div>
            <div>
              <span>Descripción</span>
              <div className="border-2 border-slate-300 rounded-md p-2 mt-2 w-full">
                {data.description === "" ? (
                  <span>Sin descripción</span>
                ) : (
                  <span>{data.description}</span>
                )}
              </div>
            </div>
            <span>{data.tag}</span>
            <ThemeProvider theme={theme}>
              <Stack spacing={0} direction="row">
                <Button
                  type="button"
                  variant="contained"
                  color="black"
                  onClick={() => handleDelete(data)}
                >
                  Eliminar
                </Button>
              </Stack>
            </ThemeProvider>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </DialogTemplate>
      )}
    </>
  );
};

export default ViewDialog;
