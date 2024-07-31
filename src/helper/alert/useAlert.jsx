import Swal from "sweetalert2";

const useAlert = () => {
  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
    });
  };

  return showAlert;
};

export default useAlert;
