/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import DialogTemplate from "../../../../../components/templates/DialogTemplate";
import { useForm, Controller } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import { Button, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { updateSuggestAPI } from "../../../../../services/api/suggest";

import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

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

const DialogSuggest = ({ open, close, data }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      response: "",
    },
  });

  const onSubmit = async (responseData) => {
    const createLoading = toast.loading("Actualizando...");
    try {
      const res = await updateSuggestAPI({
        response: responseData.response,
        id: data.id,
        user_id: data.user_id,
        state: "ended",
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Solicitud actualizada exitosamente!", {
          id: createLoading,
        });
        handleClose();
        window.location.reload();
      } else {
        toast.error("Ha ocurrido un error al actualizar la solicitud", {
          id: createLoading,
        });
      }
    } catch (error) {
      toast.error("Ha ocurrido un error al actualizar la solicitud", {
        id: createLoading,
      });
      console.log(error);
    }
  };

  const handleClose = () => {
    reset();
    close();
  };

  useEffect(() => {
    if (data.response) {
      reset({
        response: data.response,
      });
    }
  }, [data]);
  return (
    <>
      {open && (
        <DialogTemplate>
          <div className="w-full h-full flex flex-col gap-4  px-6 py-8 w-[500px]">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-semibold">{data.title}</h1>
              <button onClick={handleClose}>
                <CloseIcon fontSize="large" />
              </button>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="font-semibold">Descripción:</span>
              <span>{data.description}</span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <label htmlFor="response"></label>
              <Controller
                name="response"
                control={control}
                rules={{
                  required: "La respuesta es obligatoria",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl
                    sx={{ m: 0, width: "100%" }}
                    variant="outlined"
                    error={!!error}
                  >
                    <TextField
                      id="response"
                      {...field}
                      label="Respuesta"
                      multiline
                      rows={4}
                      variant="outlined"
                      error={!!error}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
              <div className="flex flex-row gap-2 mt-4">
                <ThemeProvider theme={theme}>
                  <Stack spacing={0} direction="row">
                    <Button id="submit-button" type="onSubmit" variant="contained" color="black">
                      Finalizar
                    </Button>
                  </Stack>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Stack spacing={0} direction="row">
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="black"
                    >
                      Cerrar
                    </Button>
                  </Stack>
                </ThemeProvider>
              </div>
            </form>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </DialogTemplate>
      )}
    </>
  );
};

export { DialogSuggest };
