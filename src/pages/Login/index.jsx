/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import LoginTemplate from "../../components/templates/LoginTemplate";

import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginAPI } from "../../services/api/auth";
import { setLocalStorage } from "../../functions/localStorage";

import toast, { Toaster } from "react-hot-toast";

// Función para crear un tema para el botón de MUI
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

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState();
  const navigate = useNavigate();

  // Función para alternar el estado del campo de contraseña para ser visible o no
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Función para evitar que el botón de mostrar contraseña haga eventos indeseados
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Función para enviar los datos al servidor para hacer el login
  const onSubmit = async (data) => {
    const loginLoading = toast.loading("Ingresando...");
    try {
      const res = await loginAPI(data);
      console.log(res)
      if (res.status === 200) {
        toast.success("Ingreso exitoso!", {
          id: loginLoading,
        });
        setLocalStorage("user", {
          id: res.response.id,
          username: res.response.username,
          email: res.response.email,
        });
        setLocalStorage("token", { token: res.response.token });
        navigate("/dashboard");
      } else {
        toast.error("Ha ocurrido un error al ingresar", {
          id: loginLoading,
        });
        if (res.response === "Invalid login credentials") {
          setApiError("Correo o contraseña incorrectos");
        }
      }
    } catch (error) {
      toast.error("Ha ocurrido un error al ingresar", {
        id: loginLoading,
      });
    }
  };

  return (
    <>
      <LoginTemplate>
        <div className="login-header mb-10 flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold font-sans text-center">
            Bienvenido a Finomi
          </h1>
          <p className="text-gray-500 text-lg text-center">
            Tu espacio personal para gestionar tus ingresos y gastos.
          </p>
        </div>
        {apiError && (
          <div className="my-4 bg-red-400 text-white p-2 rounded flex flex-row justify-between items-center">
            <p className="text-md">{apiError}</p>
            <button className="text-white" onClick={() => setApiError(null)}>
              <CloseIcon fontSize="medium" />
            </button>
          </div>
        )}
        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-input mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-medium"
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="email">Ingresa tu email</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      {...field}
                      error={!!error}
                      label="Ingresa tu email"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>

            <div className="login-form-input">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-medium"
              >
                Contraseña
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="password">
                      Ingresa tu contraseña
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      error={!!error}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Ingresa tu contraseña"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>
            <div className="form-register mt-4">
              <p className="text-gray-500 text-base font-medium">
                No tienes cuenta?{" "}
                <Link className="underline" to="/register">
                  Registrate!
                </Link>
              </p>
            </div>
            <div className="form-button mt-4">
              <ThemeProvider theme={theme}>
                <Stack spacing={0} direction="row">
                  <Button
                    id="login-button"
                    type="onSubmit"
                    variant="contained"
                    color="black"
                  >
                    Ingresar
                  </Button>
                </Stack>
              </ThemeProvider>
            </div>
          </form>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </LoginTemplate>
    </>
  );
};

export default Login;
