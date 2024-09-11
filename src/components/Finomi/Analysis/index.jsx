/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ChatMessage } from "../Chat/ChatMessage";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";

import { getTransactions } from "../../../services/api/transactions";
import { getChatAPI, sendMessageAPI, deleteMessageAPI, saveMessagesAPI } from "../../../services/api/chat";

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

const Analysis = () => {
  const [userMessages, setUserMessages] = useState([
    { role: "assistant", content: "No tienes mensajes" },
  ]);

  const generateAnalysis = async () => {
    const loginLoading = toast.loading("Generando análisis...");
    const res = await getTransactions();
    const transactions = JSON.stringify(res.response);
    const analysis = [{role: "assistant", content: "Hola! ¿cuales son tus dudas?"}, {role: "user", content: `Puedes analizar mis transacciones y darme consejos: ${transactions}`}]; 
    const msgRes = await sendMessageAPI(analysis);
    const updatedMessages = [...analysis, msgRes.response.message];
    setUserMessages([updatedMessages[2]]);

    await deleteMessageAPI();
    const saveRes = await saveMessagesAPI(updatedMessages);
    if (saveRes.status === 200) {
      toast.success("Análisis generado exitosamente!", {
        id: loginLoading,
      });
    } else {
      toast.error("Ha ocurrido un error al generar el análisis", {
        id: loginLoading,
      });
    }
  }

  const getMessages = async () => {
    try {
      const res = await getChatAPI();

      if (res.status === 200) {
        if (res.response.length > 0) {
          // Actualizamos a un array con los mensajes
          const updatedMessages = [res.response[0].messages[2]];

          setUserMessages(updatedMessages);
        } else {
          // Actualizamos a un array con un solo mensaje
          setUserMessages([
            { role: "assistant", content: "No tienes mensajes" },
          ]);
        }
      } else {
        // Actualizamos a un array con un solo mensaje
        setUserMessages([{ role: "assistant", content: "No tienes mensajes" }]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Manejo de errores: Actualizamos a un array con un solo mensaje
      setUserMessages([
        { role: "assistant", content: "Error al cargar mensajes" },
      ]);
    }
  };

  useEffect(() => {
    getMessages(); // Llamamos a la función cuando se monta el componente
  }, []); // Dependencia vacía para que solo se ejecute una vez

  return (
    <div className="p-8 flex flex-col gap-2">
      {userMessages.map((message, index) => (
        <ChatMessage
          key={index}
          user={message.role}
          message={message.content}
        />
      ))}
      <ThemeProvider theme={theme}>
        <Stack spacing={0} direction="row">
          <Button
            type="button"
            variant="contained"
            color="black"
            onClick={generateAnalysis}
          >
            Generar analisis
          </Button>
        </Stack>
      </ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export { Analysis };
