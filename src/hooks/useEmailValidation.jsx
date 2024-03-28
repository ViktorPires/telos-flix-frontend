import { useCallback, useState } from "react";

const useEmailValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmailFormat = useCallback((email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }, []);

  const formatEmail = (email) => {
    const trimmedEmail = email?.trim();
    const formattedEmail = trimmedEmail?.toLowerCase();
    return formattedEmail;
  }

  const validateEmail = useCallback((email) => {
    const formattedEmail = formatEmail(email);
      if (!formattedEmail) {
        setErrorMessage("The email field is required!");
        return false;
      }

      if (!validateEmailFormat(formattedEmail)) {
        setErrorMessage("The email format is invalid!");
        return false;
      }

      setErrorMessage("");
      return true;
    },[validateEmailFormat]);

  return { validateEmail, errorEmail: errorMessage };
};

export default useEmailValidation;
