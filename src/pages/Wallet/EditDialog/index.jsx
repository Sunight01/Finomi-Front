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

import { updateTransaction } from "../../../services/api/transactions";

import toast, { Toaster } from "react-hot-toast";

const tags = [
  { value: "Trabajo", label: "Trabajo" },
  { value: "Emprendimiento", label: "Emprendimiento" },
  { value: "Colegio", label: "Colegio" },
  { value: "Medico", label: "Medico" },
  { value: "Otro", label: "Otro" },
];

const EditDialog = ({ open, close, update, transaction }) => {
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

  // Funcion para cerrar el modal y resetear el formulario
  const handleClose = () => {
    reset();
    close();
  };

  // Funcion para enviar los datos al servidor para actualizar la transacción
  const onSubmit = async (data) => {
    const updateLoading = toast.loading("Actualizando...");
    const tr = { ...data, id: transaction.id };
    const res = await updateTransaction(tr);
    if (res.status === 201) {
      toast.success("Transacción actualizada exitosamente!", {
        id: updateLoading,
      });
      update(tr);
      handleClose();
    } else {
      toast.error("Ha ocurrido un error al actualizar la transacción", {
        id: updateLoading,
      });
    }
  };

  // Función para formatear la fecha de la transacción proveniente de la API
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Esto dará el formato "yyyy-MM-dd"
  };

  useEffect(() => {
    // Si se envía una transacción, se resetea el formulario con sus datos
    if (transaction) {
      reset({
        user_id: id,
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        date: formatDate(transaction.date),
        tag: transaction.tag,
        description: transaction.description,
      });
      setVisible(open);
    }
  }, [transaction, id, reset, open]);
  return (
    <>
      {visible && (
        <DialogTemplate type={"form"}>
          <div className="flex flex-col px-8 sm:max-mdm:px-6 py-10 gap-4 max-w-full">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-semibold">Editar</h1>
              <button onClick={handleClose}>
                <CloseIcon fontSize="large" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-full"
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
