import { useCallback, useState } from "react";

const usePhoneValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const errorMessages = {
    required: "The phone field is required!",
    format: "The phone format is invalid!",
  }

  const validatePhoneFormat = useCallback((phone) => {
    const brazilRegex = /^(0\d{2}|\(\d{2}\)|\d{2})?\s?9?\d{4,5}-?\d{4}$/;
    const usRegex = /^\+?1?\s*([0-9]{3}|\([0-9]{3}\))([-. ]?[0-9]{3})([-. ]?[0-9]{4})$/;

    return brazilRegex.test(phone) || usRegex.test(phone);
  }, []);

  const validatePhone = useCallback((phone) => {
    const trimmedPhone = phone?.trim();
    if (!trimmedPhone) {
      setErrorMessage(errorMessages.required);
      return false;
    }

    if (!validatePhoneFormat(trimmedPhone)) {
      setErrorMessage(errorMessages.format);
      return false;
    }

    setErrorMessage("");
    return true;
    // eslint-disable-next-line
  }, [validatePhoneFormat]);

  return { validatePhone, errorPhone: errorMessage };
};

export default usePhoneValidation;
