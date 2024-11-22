import { useState, useEffect } from "react";

import Template from "../../../components/templates/Template";
import { EmptyMessage } from "../../../components/Wallet/EmptyMessage";
import { CreateSuggest } from "./CreateSuggest";

import Pagination from "@mui/material/Pagination";

import { getSuggestionsAPI } from "../../../services/api/suggest";

import { Loading } from "../../../components/Loading";

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Cantidad de solicitudes por página
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addSuggest = (newSuggest) => {
    setSolicitudes((prevSuggest) => [...prevSuggest, newSuggest]);
  };

  const callSolicitudes = async () => {
    try {
      const res = await getSuggestionsAPI();
      if (res.status === 200) {
        setSolicitudes(res.response);
      }
      setLoading(false);
    } catch (error) {
      setSolicitudes([]);
    }
  };

  // Paginación: determinar solicitudes actuales según la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolicitudes = solicitudes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    callSolicitudes();
  }, []);
  return (
    <>
      <Template>
        {loading && <Loading />}
        <div className="p-10">
          <div className=" flex flex-wrap justify-between sm:max-mdm:flex-col sm:max-mdm:items-center gap-4">
            <h1 className="text-2xl font-semibold">Mis solicitudes</h1>
            <button
              id="create-req"
              className="rounded-lg border-black border-2 p-2 hover:bg-gray-200 active:bg-green-200 duration-200"
              onClick={handleOpen}
            >
              Crea una solicitud
            </button>
          </div>
          <div className="mt-4 w-full h-[540px] overflow-y-auto">
            {solicitudes.length === 0 ? (
              <EmptyMessage message="No tienes solicitudes pendientes" />
            ) : (
              <div
                id="requests-list"
                className="flex flex-wrap gap-4 mbm:max-xl:justify-center m-2"
              >
                {currentSolicitudes.map((solicitud) => (
                  <div
                    key={solicitud.id}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 flex-wrap min-w-[300px] sm:max-mbm:min-w-[200px] gap-3 flex-1"
                  >
                    <div className="flex flex-row justify-between items-center">
                      <h2 id="card-title" className="text-xl font-semibold">
                        {solicitud.title}
                      </h2>
                    </div>
                    <p id="card-description" className="text-gray-500 text-sm">
                      {solicitud.description}
                    </p>
                    <p id="card-state" className="text-gray-500 text-sm">
                      {solicitud.state === "pending"
                        ? "Pendiente"
                        : "Finalizada"}
                    </p>
                    <p>
                      {solicitud.response === null ? (
                        <span>No respondido aún</span>
                      ) : (
                        <span>{solicitud.response}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(solicitudes.length / itemsPerPage)} // Total de páginas
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
        <CreateSuggest open={open} close={handleClose} add={addSuggest} />
      </Template>
    </>
  );
};

export default Solicitudes;
