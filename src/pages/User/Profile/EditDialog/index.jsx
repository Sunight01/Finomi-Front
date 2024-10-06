/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  setLocalStorage,
  getLocalStorage,
} from "../../../../functions/localStorage";
import { updateUserAPI } from "../../../../services/api/auth";

import DialogTemplate from "../../../../components/templates/DialogTemplate";

import CloseIcon from "@mui/icons-material/Close";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, Stack } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const EditDialog = ({ open, close }) => {
  const [visible, setVisible] = useState(false);
  const [apiError, setApiError] = useState();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleClose = () => {
    reset();
    close();
  };

  const onSubmit = async (data) => {
    const loading = toast.loading("Actualizando...");
    try {
      const { id } = await getLocalStorage("user");
      const res = await updateUserAPI(data);
      if (res.status === 200) {
        toast.success("Actualizado correctamente!", {
          id: loading,
        });
        setLocalStorage("user", {
          id: id,
          email: data.email,
          username: data.username,
        });
        handleClose();
        window.location.reload();
      } else {
        toast.error("Ha ocurrido un error al actualizar", {
          id: loading,
        });
        if (res.response === "Invalid login credentials") {
          setApiError("Contraseña incorrecta");
        }
      }
    } catch (error) {
      toast.error("Ha ocurrido un error al actualizar", {
        id: loading,
      });
    }
  };

  useEffect(() => {
    const user = getLocalStorage("user");
    setVisible(open);
    reset({
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }, [open]);
  return (
    <>
      {visible && (
        <DialogTemplate>
          <div className="flex flex-col px-8 py-10 gap-4 w-full">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-semibold">Editar</h1>
              <button onClick={handleClose}>
                <CloseIcon fontSize="large" />
              </button>
            </div>

            {apiError && (
              <div className="my-1 bg-red-400 text-white p-2 rounded flex flex-row justify-between items-center">
                <p className="text-md">{apiError}</p>
                <button className="text-white" onClick={() => setApiError(null)}>
                  <CloseIcon fontSize="medium" />
                </button>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-[400px]"
            >
              <label htmlFor="username"></label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "El nombre de usuario es obligatorio",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="username">
                      Nombre de usuario
                    </InputLabel>
                    <OutlinedInput
                      id="username"
                      type="text"
                      {...field}
                      error={!!error}
                      label="Nombre de usuario"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
              <label htmlFor="email"></label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                }}
                rend
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      {...field}
                      error={!!error}
                      label="Email"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
              <span className="mt-2">
                Debes escribir tu contraseña para poder confirmar los cambios.
              </span>
              <label htmlFor="password"></label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "La contraseña es obligatoria",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <OutlinedInput
                      id="password"
                      type="password"
                      {...field}
                      error={!!error}
                      label="Contraseña"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
              <ThemeProvider theme={theme}>
                <Stack spacing={0} direction="row">
                  <Button variant="contained" color="black" type="submit">
                    Confirmar
                  </Button>
                </Stack>
              </ThemeProvider>
            </form>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </DialogTemplate>
      )}
    </>
  );
};

export default EditDialog;
