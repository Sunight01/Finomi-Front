import { useEffect, useState, useRef } from "react";
import { ChatMessage } from "../ChatMessage";

import Skeleton from "@mui/material/Skeleton";
import { motion } from "framer-motion";

import {
  getChatAPI,
  saveMessagesAPI,
  sendMessageAPI,
  updateMessagesAPI,
} from "../../../../services/api/chat";

import { Loading } from "../../../Loading";

const ChatIA = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola! ¿cuales son tus dudas?" },
  ]);
  const [newMessage, setNewMessage] = useState(""); // Estado para el mensaje del usuario
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // Funcion para manejar los mensajes del chat en la BD.
  const handleSaveMessages = async (updatedMessages) => {
    try {
      const getRes = await getChatAPI();
      if (getRes.status === 200) {
        if (getRes.response.length === 0) {
          // Esto quiere decir que no hay mensajes en la BD
          await saveMessagesAPI(updatedMessages);
        } else {
          // Si hay mensajes, que se actualicen a medida que se envían.
          handleUpdateMessages(updatedMessages);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Función para enviar los mensajes a la IA y actualizar el estado
  const sendMessages = async (updatedMessages) => {
    setLoadingMessage(true);
    try {
      const res = await sendMessageAPI(updatedMessages);
      setMessages((prevMessages) => [...prevMessages, res.response.message]); // Añade la respuesta de la IA
      const upMessages = [...updatedMessages, res.response.message];
      console.log(upMessages);
      handleSaveMessages(upMessages);
      setLoadingMessage(false);
    } catch (error) {
      console.log(error);
      setLoadingMessage(false);
    }
  };

  // Funcion para actualizar los mensajes en la BD
  const handleUpdateMessages = async (updatedMessages) => {
    try {
      const res = await updateMessagesAPI(updatedMessages);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para guardar el mensaje que el user escribió, enviarlo a la IA y actualizar el estado con su respuesta.
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const tempMessage = { role: "user", content: newMessage }; // Guarda el mensaje en una variable temporal
      setMessages((prevMessages) => [...prevMessages, tempMessage]);

      const updatedMessages = [...messages, tempMessage]; // Crea una copia con el nuevo mensaje
      // Actualiza el estado usando la función de actualización
      console.log(updatedMessages);
      sendMessages(updatedMessages);
      // Limpia el input después de enviar
      setNewMessage("");
    }
  };

  // Funcion para manejar la tecla de enter. Con esto el usuario puede enviar el mensaje con el enter.
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que se agregue una nueva línea en el input
      handleSendMessage(); // Llama a la función de enviar mensaje
    }
  };

  // Función para obtener los mensajes del chat del usuario y actualizar el estado en caso de que exista el chat en la BD.
  const getUserChat = async () => {
    const res = await getChatAPI();
    if (res.status === 200) {
      if (res.response.length > 0) {
        console.log(res.response[0].messages);
        const updatedMessages = [...res.response[0].messages];
        setMessages(updatedMessages);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getUserChat();
  }, []);
  return (
    <div className="p-8 flex flex-col mt-4 h-full">
      {loading && <Loading />}
      <div
        ref={chatContainerRef}
        className="max-h-[540px] flex-grow overflow-y-auto flex flex-col gap-4"
      >
        {/* Mensajes en la parte superior */}
        {messages
          .filter((_, index) => index !== 1 && index !== 2) // Filtra los mensajes para excluir las posiciones 1 y 2
          .map((message, index) => (
            <ChatMessage
              key={index}
              user={message.role}
              message={message.content}
            />
          ))}
        {loadingMessage && (
          <div className="flex flex-col items-left justify-center w-full">
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              exit={{ x: "100%", opacity: 0 }} // Desaparece hacia la derecha
            >
              <Skeleton
                animation="wave"
                variant="text"
                height={20}
                width={1000}
              />
              <Skeleton
                animation="wave"
                variant="text"
                height={20}
                width={950}
              />
              <Skeleton
                animation="wave"
                variant="text"
                height={20}
                width={800}
              />
            </motion.div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        {/* Input en la parte inferior */}
        <input
          id="chat-input"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Agrega el evento onKeyDown
          placeholder="Escribe tu mensaje..."
          className="flex-grow p-2 border rounded-lg"
        />
        <button
          id="send-button"
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export { ChatIA };
