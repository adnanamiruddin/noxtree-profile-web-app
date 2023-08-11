import { ToastContainer } from "react-toastify";

export default function ToastNotif() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      theme="dark"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
    />
  );
}
