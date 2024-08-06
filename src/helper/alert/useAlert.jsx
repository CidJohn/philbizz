import Swal from "sweetalert2";

const useAlert = () => {
  const showAlert = (title, text, icon, width = "400px") => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
      width,
    });
  };
  return showAlert;
};

export default useAlert;
