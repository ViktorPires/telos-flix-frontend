import { useCallback, useState } from "react";
const usePasswordValidation = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const validateLength = useCallback((password) => {
        return password.length >= 8 && password.length <= 20;
    }, []);

    const validateComplexity = useCallback((password) => {
        return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
    }, []);

    const validateWhitespace = useCallback((password) => {
        return !/\s/.test(password);
    }, []);

    const validatePassword = useCallback((password, confirmPassword) => {
        if (!password || !confirmPassword) {
            setErrorMessage("The password field is required!");
            return false;
        }

        if (!validateLength(password)) {
            setErrorMessage("The password must be between 8 and 20 characters!");
            return false;
        }

        if (!validateComplexity(password)) {
            setErrorMessage("The password must include lowercase letters, uppercase letters, numbers, and special characters!");
            return false;
        }

        if (!validateWhitespace(password)) {
            setErrorMessage("The password cannot contain whitespace!");
            return false;
        }

        if (password !== confirmPassword) {
            setErrorMessage("The passwords must match!");
            return false;
        }

        setErrorMessage("");
        return true;
    }, [validateLength, validateComplexity, validateWhitespace]);

    return { validatePassword, errorPassword: errorMessage };
};

export default usePasswordValidation;