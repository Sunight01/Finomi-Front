/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { getLocalStorage } from "../../../functions/localStorage";

import DialogTemplate from "../../../components/templates/DialogTemplate";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Select, Stack, TextField } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { createTransaction } from "../../../services/api/transactions";

import toast, { Toaster } from "react-hot-toast";

const tags = [
  { value: "Trabajo", label: "Trabajo" },
  { value: "Emprendimiento", label: "Emprendimiento" },
  { value: "Colegio", label: "Colegio" },
  { value: "Medico", label: "Medico" },
  { value: "Otro", label: "Otro" },
];

const CreateDialog = ({ open, close, add }) => {
  const { id } = getLocalStorage("user");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: id,
      title: "",
      amount: 0,
      type: "",
      date: "",
      tag: "",
      description: "",
    },
  });

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

  const [visible, setVisible] = useState(false);

  // Función para cerrar y resetear el formulario
  const handleClose = () => {
    reset();
    close();
  };

  // Función para enviar los datos al servidor para crear la transacción
  const onSubmit = async (data) => {
    const createLoading = toast.loading("Creando...");
    const res = await createTransaction(data);
    if (res.status === 200) {
      toast.success("Transacción creada exitosamente!", {
        id: createLoading,
      });
      add(res.response);
      handleClose();
    } else {
      toast.error("Ha ocurrido un error al crear la transacción", {
        id: createLoading,
      });
    }
  };

  useEffect(() => {
    setVisible(open);
  }, [open]);
  return (
    <>
      {visible && (
        <DialogTemplate>
          <div className="flex flex-col px-8 py-10 gap-4">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-semibold">Crear</h1>
              <button onClick={handleClose}>
                <CloseIcon fontSize="large" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-[400px]"
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
              <label htmlFor="amount"></label>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: "La cantidad es obligatoria",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="amount">Monto</InputLabel>
                    <OutlinedInput
                      id="amount"
                      type="number"
                      {...field}
                      error={!!error}
                      label="Monto"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
              <label htmlFor="type"></label>
              <Controller
                name="type"
                control={control}
                rules={{
                  required: "El tipo es obligatorio",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl
                    sx={{ m: 0, width: "100%" }}
                    variant="outlined"
                    error={!!error}
                  >
                    <InputLabel id="type-label">Tipo</InputLabel>
                    <Select
                      labelId="type-label"
                      id="type"
                      label="Tipo"
                      {...field}
                    >
                      <MenuItem value="Gasto">Gasto</MenuItem>
                      <MenuItem value="Ingreso">Ingreso</MenuItem>
                    </Select>
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />

              <label htmlFor="date"></label>
              <Controller
                name="date"
                control={control}
                rules={{
                  required: "La fecha es obligatoria",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="date"></InputLabel>
                    <OutlinedInput
                      id="date"
                      type="date"
                      {...field}
                      error={!!error}
                      label="Fecha"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />

              <label htmlFor="tag"></label>
              <Controller
                name="tag"
                control={control}
                rules={{
                  required: "El tag es obligatorio",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl
                    sx={{ m: 0, width: "100%" }}
                    variant="outlined"
                    error={!!error}
                  >
                    <InputLabel id="tag-label">Tag</InputLabel>
                    <Select labelId="tag-label" id="tag" label="Tag" {...field}>
                      {tags.map((tag) => (
                        <MenuItem key={tag.value} value={tag.value}>
                          {tag.label}
                        </MenuItem>
                      ))}
                    </Select>
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
                  <Button type="onSubmit" variant="contained" color="black">
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

export default CreateDialog;
