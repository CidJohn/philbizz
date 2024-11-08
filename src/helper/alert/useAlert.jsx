import Swal from "sweetalert2";

const useAlert = () => {
  const showAlert = (title, text, icon, width = "400px", cancel = false, btnConfirm, btnCancel) => {
    // Return the promise from Swal.fire
    return Swal.fire({
      title,
      text,
      icon,
      width,
      showCancelButton: cancel,
      confirmButtonText: btnConfirm,
      cancelButtonText: btnCancel,
    });
  };
  return showAlert;
};

export default useAlert;
