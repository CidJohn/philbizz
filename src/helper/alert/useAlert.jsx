import Swal from "sweetalert2";

const useAlert = () => {
  const showAlert = (
    title,
    text,
    icon,
    width = "400px",
    cancel = false,
    btnConfirm,
    btnCancel,
    btnConfirmColor = "#d33",
    btnCancelColor = "#3085d6"
  ) => {
    return Swal.fire({
      title,
      text,
      icon,
      width,
      showCancelButton: cancel,
      confirmButtonText: btnConfirm,
      cancelButtonText: btnCancel,
      confirmButtonColor: btnConfirmColor,
      cancelButtonColor: btnCancelColor,
    });
  };
  return showAlert;
};

export default useAlert;
