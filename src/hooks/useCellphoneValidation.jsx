import { useCallback, useState } from "react";

const usePhoneValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const validatePhoneFormat = useCallback((phone) => {
    const brazilRegex = /^(0\d{2}|\(\d{2}\)|\d{2})?\s?9?\d{4,5}-?\d{4}$/;
    const usRegex = /^\+?1?\s*([0-9]{3}|\([0-9]{3}\))([-. ]?[0-9]{3})([-. ]?[0-9]{4})$/;

    return brazilRegex.test(phone) || usRegex.test(phone);
  }, []);

  const validatePhone = useCallback((phone) => {
    const trimmedPhone = phone?.trim();
    if (!trimmedPhone) {
      setErrorMessage("The phone field is required!");
      return false;
    }

    if (!validatePhoneFormat(trimmedPhone)) {
      setErrorMessage("The phone format is invalid!");
      return false;
    }

    setErrorMessage("");
    return true;
  }, [validatePhoneFormat]);

  return { validatePhone, errorPhone: errorMessage };
};

export default usePhoneValidation;
