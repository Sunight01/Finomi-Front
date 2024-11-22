const DialogTemplate = ({ children, type }) => {
  // Componente para mostrar el dialog
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-950 z-50 bg-opacity-30 backdrop-blur-lg p-2">
      <div
        className={`max-w-[400px] bg-white opacity-100 rounded-3xl ${
          type === "form"
            ? "min-w-[300px] min-h-[400] w-full"
            : "min-w-[150px] min-h-[150px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DialogTemplate;
