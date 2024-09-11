const ChatMessage = ({ user, message }) => {
  const formatMessageContent = (content) => {
    // Convierte los saltos de línea y las listas de markdown en formato HTML
    const formattedContent = content
      .replace(/###/g, "<h3>") // Formatea encabezados
      .replace(/####/g, "<h4>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Formatea negritas
      //.replace(/-/g, "<li>") // Formatea listas
      .replace(/\n/g, "<br>") // Reemplaza saltos de línea por <br>
      .replace(/^- /g, "<li>") // Para listas con guiones
      .replace(/^\d+\. /g, "<li>") // Para listas ordenadas
      .replace(/(<li>.*?<\/li>)(?!<li>)/g, "$1</ul>") // Cierra listas
      .replace(/(?:^|\s)(\* .+)/g, "<ul><li>$1</li></ul>") // Agrega <ul> si no existe

    return { __html: formattedContent }; // Devuelve un objeto con la clave __html
  };

  return (
    <div>
      <span className="font-semibold">
        {user === "assistant" ? "Finomi" : "Tú"}
      </span>
      <div
        className="text-gray-800"
        dangerouslySetInnerHTML={formatMessageContent(message)} // Uso correcto aquí
      />
    </div>
  );
};

export { ChatMessage };
