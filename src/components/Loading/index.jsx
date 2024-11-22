import DialogTemplate from "../templates/DialogTemplate";
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <DialogTemplate type={"loading"}>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <CircularProgress />
      </div>
    </DialogTemplate>
  );
};

export { Loading };
