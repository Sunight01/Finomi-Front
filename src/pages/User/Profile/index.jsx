import { useState, useEffect } from "react";

import { getLocalStorage } from "../../../functions/localStorage";

import Template from "../../../components/templates/Template";
import EditDialog from "./EditDialog";

import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Loading } from "../../../components/Loading";

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
  const [loading, setLoading] = useState(true);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const getUserStorage = () => {
    const ls = getLocalStorage("user");
    if (ls) {
      setUsername(ls.username);
      setEmail(ls.email);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserStorage();
  }, []);
  return (
    <>
      <Template>
        {loading && <Loading />}
        <div className="flex flex-col justify-center items-center m-10 tracking-wide">
          <div className="bg-main-white max-w-[700px] w-full max-h-[650px] h-full rounded-xl flex flex-col items-center sm:max-mbm:mt-4 border">
            <span className="font-semibold text-3xl my-4">Tu perfil</span>
            <Divider orientation="horizontal" variant="middle" flexItem />

            <div className="flex flex-col items-center w-full h-full p-8 sm:max-mbm:p-4">
              <div className="flex flex-col items-start mt-2 mb-10 sm:max-mbm:mt-[40px] sm:max-mbm:mb-[40px] gap-8 flex-1 flex-1 ">
                <div className="flex flex-col gap-1">
                  <span className="text-md font-semibold text-gray-500">
                    Nombre de usuario
                  </span>
                  <span className="text-xl font-semibold">
                    {username}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-md font-semibold text-gray-500">
                    Correo electrónico
                  </span>
                  <span className="text-xl font-semibold">
                    {email}
                  </span>
                </div>
                <div className="mt-6 sm:max-mbm:mt-12 w-full">
                  <ThemeProvider theme={theme}>
                    <Stack spacing={0} direction="row">
                      <Button
                        id="edit-button"
                        type="onClick"
                        variant="contained"
                        color="black"
                        fullWidth
                        onClick={() => handleOpenEdit()}
                      >
                        EDITAR PERFIL
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
