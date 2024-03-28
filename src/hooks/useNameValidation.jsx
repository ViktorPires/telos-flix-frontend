import { useCallback, useState } from "react";

const useNameValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const validateNameFormat = useCallback((name) => {
    const regex = /^[a-zA-ZÀ-ÿ]+(\s[a-zA-ZÀ-ÿ]+)*$/;
    return regex.test(name);
  }, []);

  const validateName = useCallback((name) => {
    const trimmedName = name?.trim();
    if (!trimmedName) {
      setErrorMessage("The name field is required!");
      return false;
    }

    if (trimmedName.length < 3) {
      setErrorMessage("The name must have at least 3 characters!");
      return false;
    }

    if (!validateNameFormat(trimmedName)) {
      setErrorMessage("The name must contain only letters and spaces!");
      return false;
    }

    setErrorMessage("");
    return true;
  }, [validateNameFormat]);

  return { validateName, errorName: errorMessage };
};

export default useNameValidation;
