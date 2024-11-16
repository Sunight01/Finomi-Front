import { useState, useEffect } from "react";

import { getLocalStorage } from "../../../functions/localStorage";

import Template from "../../../components/templates/Template";
import EditDialog from "./EditDialog";

import Divider from "@mui/material/Divider";

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

const Profile = () => {
  const [username, setUsername] = useState("user");
  const [email, setEmail] = useState("email@email.com");
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    const ls = getLocalStorage("user");
    if (ls) {
      setUsername(ls.username);
      setEmail(ls.email);
    }
  }, []);
  return (
    <>
      <Template>
        <div className="w-full h-full flex flex-col justify-center items-center px-2">
          <div className="bg-violet-100 max-w-[500px] w-full max-h-[450px] h-full rounded-xl flex flex-col items-center">
            
            <span className="font-semibold text-3xl my-4">Tu perfil</span>
            <Divider orientation="horizontal" variant="middle" flexItem />

            <div className="flex flex-col w-full h-full items-center">

              <div className="flex flex-col justify-center items-start mt-8 mb-10 sm:max-mbm:mt-[40px] sm:max-mbm:mb-[40px] gap-4 flex-1 flex-1 ">

                <div className="flex flex-col gap-1">
                  <span className="text-lg text-gray-700">Nombre de usuario</span>
                  <span className="text-xl font-semibold sm:max-mbm:text-2xl">
                    {username}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-lg text-gray-700">Correo electrónico</span>
                  <span className="text-xl font-semibold sm:max-mbm:text-2xl">
                    {email}
                  </span>
                </div>
                
                <div className="mt-6 sm:max-mbm:mt-12">
                  <ThemeProvider theme={theme}>
                    <Stack spacing={0} direction="row">
                      <Button
                        id="edit-button"
                        type="onClick"
                        variant="contained"
                        color="black"
                        onClick={() => handleOpenEdit()}
                      >
                        EDITAR
                      </Button>
                    </Stack>
                  </ThemeProvider>
                </div>

              </div>

            </div>

          </div>
        </div>
        <EditDialog open={openEdit} close={handleCloseEdit} />
      </Template>
    </>
  );
};

export default Profile;
