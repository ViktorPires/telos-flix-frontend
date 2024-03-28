import { useCallback, useState } from "react";

const useEmailValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const errorMessages = {
    required: "The email field is required!",
    format: "The email format is invalid!",
  }

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
        setErrorMessage(errorMessages.required);
        return false;
      }

      if (!validateEmailFormat(formattedEmail)) {
        setErrorMessage(errorMessages.format);
        return false;
      }

      setErrorMessage("");
      return true;
      // eslint-disable-next-line
    },[validateEmailFormat, formatEmail]);

  return { validateEmail, errorEmail: errorMessage };
};

export default useEmailValidation;
