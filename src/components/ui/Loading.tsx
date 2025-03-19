import { ImSpinner6 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full text-secondary">
      <ImSpinner6 className="h-12 w-12 animate-spin text-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
