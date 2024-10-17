const DialogTemplate = ({ children }) => {
  // Componente para mostrar el dialog
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-950 z-50 bg-opacity-30 backdrop-blur-lg p-2">
      <div className="min-w-[300px] min-h-[400px] max-w-[400px] w-full bg-white opacity-100 rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default DialogTemplate;
