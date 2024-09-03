/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DialogTemplate from "../../../components/templates/DialogTemplate";

import { deleteTransactionAPI } from "../../../services/api/transactions";

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Esto dará el formato "yyyy-MM-dd"
  };

  const handleDelete = async (data) => {
    const res = await deleteTransactionAPI(data);
    if (res.status === 200) {
      deleteData(data);
      console.log("Eliminado con exito");
      close();
    }
  };

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
        <DialogTemplate>
          <div className="flex flex-col px-8 py-10 gap-4">
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
              <div className="border-2 border-slate-300 rounded-md p-2 mt-2 w-[320px] max-w-[380px]">
                {data.description}
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
        </DialogTemplate>
      )}
    </>
  );
};

export default ViewDialog;
