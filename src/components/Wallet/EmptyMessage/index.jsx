const EmptyMessage = ({ message }) => {
  // Componente para mostrar un "mensaje vacío"
  return (
    <div className="h-auto w-auto p-10 pt-4 flex flex-row justify-center items-center">
      <p className="text-center text-gray-500 text-xl">
        {message}
      </p>
    </div>
  );
};

export { EmptyMessage };
