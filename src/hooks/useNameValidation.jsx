import { useCallback, useState } from "react";

const useNameValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const errorMessages = {
    required: "The name field is required!",
    length: "The name must have at least 3 characters!",
    format: "The name must contain only letters and spaces!",
  }

  const validateNameFormat = useCallback((name) => {
    const regex = /^[a-zA-ZÀ-ÿ]+(\s[a-zA-ZÀ-ÿ]+)*$/;
    return regex.test(name);
  }, []);

  const validateName = useCallback((name) => {
    const trimmedName = name?.trim();
    if (!trimmedName) {
      setErrorMessage(errorMessages.required);
      return false;
    }

    if (trimmedName.length < 3) {
      setErrorMessage(errorMessages.length);
      return false;
    }

    if (!validateNameFormat(trimmedName)) {
      setErrorMessage(errorMessages.format);
      return false;
    }

    setErrorMessage("");
    return true;
    // eslint-disable-next-line
  }, [validateNameFormat]);

  return { validateName, errorName: errorMessage };
};

export default useNameValidation;
