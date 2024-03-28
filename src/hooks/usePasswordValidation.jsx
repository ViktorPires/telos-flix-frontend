import { useCallback, useState } from "react";
const usePasswordValidation = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const errorMessages = {
        required: "The password field is required!",
        length: "The password must be between 8 and 20 characters!",
        complexity: "The password must include lowercase letters, uppercase letters, numbers, and special characters!",
        match: "The passwords must match!",
    };

    const validateLength = useCallback((password) => {
        return password.length >= 8 && password.length <= 20;
    }, []);

    const validateComplexity = useCallback((password) => {
        return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
    }, []);

    const validateMatch = useCallback((password, confirmPassword) => {
        return password === confirmPassword;
    }, []);

    const validateRequired = useCallback((password) => {
        return !!password;
    }, []);

    const validatePassword = useCallback((password, confirmPassword) => {
        if (!validateRequired(password)) {
            setErrorMessage(errorMessages.required);
            return false;
        }

        if (!validateLength(password)) {
            setErrorMessage(errorMessages.length);
            return false;
        }

        if (!validateComplexity(password)) {
            setErrorMessage(errorMessages.complexity);
            return false;
        }

        if (!validateMatch(password, confirmPassword)) {
            setErrorMessage(errorMessages.match);
            return false;
        }

        setErrorMessage("");
        return true;
        // eslint-disable-next-line
    }, [validateLength, validateComplexity, validateMatch, validateRequired]);

    const validateLoginPassword = useCallback((password) => {
        if (!validateRequired(password)) {
            setErrorMessage(errorMessages.required);
            return false;
        }
        if (!validateLength(password)) {
            setErrorMessage(errorMessages.length);
            return false;
        }
    
        setErrorMessage("");
        return true;
        // eslint-disable-next-line
    }, [validateRequired, validateLength]);

    return { validatePassword, validateLoginPassword, errorPassword: errorMessage };
};

export default usePasswordValidation;