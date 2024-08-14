const LoginTemplate = (props) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-main-white">
      <div className="w-96 h-100 rounded-lg shadow-md bg-white">
        {props.children}
      </div>
    </div>
  );
};

export default LoginTemplate;