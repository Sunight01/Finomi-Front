import { useState, useEffect } from "react";

import Template from "../../../../components/templates/Template";
import { DialogSuggest } from "./DialogSuggest";

import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";

import { getAllSuggestionsAPI } from "../../../../services/api/suggest";
import { EmptyMessage } from "../../../../components/Wallet/EmptyMessage";

import { Loading } from "../../../../components/Loading";

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

const ViewSuggests = () => {
  const [suggests, setSuggests] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Cantidad de solicitudes por página
  const [dialogData, setDialogData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleOpen = (data) => {
    setDialogData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const callSuggests = async () => {
    try {
      const res = await getAllSuggestionsAPI();
      if (res.status === 200) {
        setSuggests(res.response);
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  // Paginación: determinar solicitudes actuales según la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuggests = suggests.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    callSuggests();
  }, []);
  return (
    <>
      <Template>
        {loading && <Loading />}
        <div className="p-10">
          <div className=" flex flex-wrap justify-between sm:max-mdm:flex-col sm:max-mdm:items-center gap-4">
            <h1 className="text-2xl font-semibold">
              Solicitudes de los usuarios
            </h1>
          </div>
          <div className="mt-4 w-full h-[540px] overflow-y-auto">
            {suggests.length === 0 ? (
              <EmptyMessage message="No tienes solicitudes pendientes" />
            ) : (
              <div
                id="requests-list"
                className="flex flex-wrap gap-4 mbm:max-xl:justify-center m-2"
              >
                {currentSuggests.map((solicitud) => (
                  <div
                    key={solicitud.id}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 flex-wrap min-w-[300px] sm:max-mbm:min-w-[200px] gap-3 flex-1"
                  >
                    <div className="flex flex-row justify-between items-center">
                      <h2 className="text-xl font-semibold">
                        {solicitud.title}
                      </h2>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {solicitud.description}
                    </p>
                    <p className="text-gray-500 text-sm">
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
                    <ThemeProvider theme={theme}>
                      <Stack spacing={0} direction="row">
                        <Button
                          id="response-button"
                          type="onSubmit"
                          variant="contained"
                          color="black"
                          onClick={() => handleOpen(solicitud)}
                        >
                          Ver
                        </Button>
                      </Stack>
                    </ThemeProvider>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(suggests.length / itemsPerPage)} // Total de páginas
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
        <DialogSuggest open={open} close={handleClose} data={dialogData} />
      </Template>
    </>
  );
};

export default ViewSuggests;
