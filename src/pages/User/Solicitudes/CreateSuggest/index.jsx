/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";

import DialogTemplate from "../../../../components/templates/DialogTemplate";

import { createSuggestAPI } from "../../../../services/api/suggest";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

const CreateSuggest = ({ open, close, add }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleClose = () => {
    reset();
    close();
  };

  const onSubmit = async (data) => {
    const createLoading = toast.loading("Creando...");
    try {
      const res = await createSuggestAPI(data);
      if (res.status === 200) {
        toast.success("Solicitud creada exitosamente!", {
          id: createLoading,
        });
        console.log(res.response)
        add(res.response)
        handleClose();
      } else {
        toast.error("Ha ocurrido un error al crear la solicitud", {
          id: createLoading,
        });
      }
    } catch (error) {
      toast.error("Ha ocurrido un error al crear la solicitud", {
        id: createLoading,
      });
      console.log(error);
    }
  };

  return (
    <>
      {open && (
        <DialogTemplate type={"form"}>
          <div className="flex flex-col px-8 sm:max-mdm:px-6 py-10 gap-4 max-w-full">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-semibold">Crea una solicitud</h1>
              <button onClick={handleClose}>
                <CloseIcon fontSize="large" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-full max-w-[400px]"
            >
              <label htmlFor="title"></label>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "El título es obligatorio",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="title">Título</InputLabel>
                    <OutlinedInput
                      id="title"
                      type="text"
                      {...field}
                      error={!!error}
                      label="Título"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />

              <label htmlFor="description"></label>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "La descripción es obligatoria",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl
                    sx={{ m: 0, width: "100%" }}
                    variant="outlined"
                    error={!!error}
                  >
                    <TextField
                      id="description"
                      {...field}
                      label="Descripción"
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
              <ThemeProvider theme={theme}>
                <Stack spacing={0} direction="row">
                  <Button id="submit-button" type="onSubmit" variant="contained" color="black">
                    Crear
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

export { CreateSuggest };
