import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DialogTemplate from "../DialogTemplate";

import {
  removeLocalStorage,
  getLocalStorage,
} from "../../../functions/localStorage";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";

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

const UnauthDialog = ({ unauth }) => {
  const navigate = useNavigate();

  // función para limpiar el storage de la sesión en caso de que la sesión haya caducado
  const clearStorage = () => {
    const token = getLocalStorage("token");
    const user = getLocalStorage("user");

    if (token) {
      removeLocalStorage("token");
    }

    if (user) {
      removeLocalStorage("user");
    }
    navigate("/");
  };

  return (
    <>
      {unauth && (
        <DialogTemplate>
          <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-8">
            <h1 className="text-2xl font-semibold">Sesión caducada</h1>
            <p className="text-lg">
              Tu sesión ha caducado, por favor inicia sesión nuevamente.
            </p>
            <ThemeProvider theme={theme}>
              <Stack spacing={0} direction="row">
                <Button
                  type="button"
                  variant="contained"
                  color="black"
                  onClick={clearStorage}
                >
                  Iniciar sesión
                </Button>
              </Stack>
            </ThemeProvider>
          </div>
        </DialogTemplate>
      )}
    </>
  );
};

export default UnauthDialog;
