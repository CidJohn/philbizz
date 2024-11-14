import React from "react";
import { useAuth } from "../../../helper/auth/useAuthContext";
import Spinner from "../../Spinner/Spinner";
import Button from "../../Button/Button";
import { Login } from "../../../pages/Login/Login";
import { Registration } from "../../../pages/Login/Registration";

export default function LoginButton({
  translation,
  hidden,
  handleRegistrationOpen,
  isRegistration,
  isModalOpen,
  handleModalOpen,
}) {
  const { isAuthenticated, logout, authload } = useAuth();

  return (
    <React.Fragment>
      {authload ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Button
          type="button"
          className={
            hidden
              ? "hidden"
              : "flex fira-sans-bold items-center bg-[#013A63] px-16 py-3 text-md text-white justify-center border rounded-md hover:bg-[#013A63]/95"
          }
          onClick={logout}
          text={"logout"}
        />
      ) : (
        <Button
          type="button"
          className={
            hidden
              ? "hidden"
              : "flex fira-sans-bold items-center bg-[#013A63] px-16 py-3 text-md text-white justify-center border rounded-md hover:bg-[#013A63]/95 "
          }
          onClick={handleModalOpen}
          text={translation("Login")}
        />
      )}
      {isModalOpen && (
        <Login
          handleModalOpen={handleModalOpen}
          handleRegistrationOpen={handleRegistrationOpen}
        />
      )}
      {isRegistration && (
        <Registration
          handleRegistrationClose={handleRegistrationOpen}
          handleLoginOpen={handleModalOpen}
        />
      )}
    </React.Fragment>
  );
}
