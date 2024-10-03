import { useState, useEffect } from "react";

import { getLocalStorage } from "../../../functions/localStorage";

import Template from "../../../components/templates/Template";

import Divider from "@mui/material/Divider";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

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
        <div className="w-full h-full flex flex-col justify-center items-center px-4">
          <div className="bg-violet-100 max-w-[450px] w-full max-h-[350px] h-full rounded-xl flex flex-col items-center pt-10 px-6">
            {/* <PersonOutlineOutlinedIcon
              sx={{ color: "black", fontSize: "80px" }}
            /> */}
            <span className="font-semibold text-2xl">Tu perfil</span>
            <div className="flex flex-col items-center mt-8 mb-10 sm sm:max-mbm:mt-[40px] sm:max-mbm:mb-[40px] sm:max-mbm:gap-4">
              <span className="text-xl font-semibold sm:max-mbm:text-2xl">{username}</span>
              <span className="text-xl text-gray-700 sm:max-mbm:text-2xl">{email}</span>
            </div>
            <Divider orientation="horizontal" variant="middle" flexItem />
            <div className="mt-6 sm:max-mbm:mt-12">
              <ThemeProvider theme={theme}>
                <Stack spacing={0} direction="row">
                  <Button
                    id="edit-button"
                    type="onClick"
                    variant="contained"
                    color="black"
                  >
                    EDITAR
                  </Button>
                </Stack>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </Template>
    </>
  );
};

export default Profile;
