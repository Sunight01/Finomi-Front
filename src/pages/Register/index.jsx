/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

import LoginTemplate from "../../components/templates/LoginTemplate";

import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <LoginTemplate>
        <div className="login-header mb-6">
          <h1 className="text-3xl font-bold font-sans mb-5">Registrate!</h1>
          <p className="text-gray-500 text-lg">
            Ingresa un nombre, correo y contraseña para crear tu cuenta.
          </p>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-input mb-4">
              <label
                htmlFor="username"
                className="block mb-2 text-base font-medium"
              >
                Usuario
              </label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Nombre es requerido",
                  pattern: {
                    value: 3,
                    message: "Ingresa un nombre de 3 caracteres como mínimo",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
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
            </div>

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
                  required: "Email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="username">Ingresa tu email</InputLabel>
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
                ¿Ya tienes cuenta?{" "}
                <Link className="underline" to="/">
                  Inicia sesion!
                </Link>
              </p>
            </div>
            <div className="form-button mt-4">
              <ThemeProvider theme={theme}>
                <Stack spacing={0} direction="row">
                  <Button type="onSubmit" variant="contained" color="black">
                    Registrarse
                  </Button>
                </Stack>
              </ThemeProvider>
            </div>
          </form>
        </div>
      </LoginTemplate>
    </>
  );
};

export default Register;
