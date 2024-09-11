const DialogTemplate = ({ children }) => {
  // Componente para mostrar el dialog
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-950 z-50 bg-opacity-30">
      <div className="min-w-[300px] min-h-[300px] bg-white opacity-100 rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default DialogTemplate;
