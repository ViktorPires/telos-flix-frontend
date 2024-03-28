import React from "react";
import { InputAdornment, IconButton, FormControl } from "@mui/material";
import CustomOutlinedInput from "../customOutlinedInput";
import PasswordOutlinedInput from "../passwordOutlinedInput";
import "./index.css";

const CustomInput = ({
  marginTop = "30px",
  label,
  placeholder,
  type,
  icon,
  setValue,
  defaultValue,
  onChange,
  error,
  isPassword,
}) => {
  const inputClassName = error ? "inputContainer inputContainer--error" : "inputContainer";
  const InputComponent = isPassword ? PasswordOutlinedInput : CustomOutlinedInput;

  return (
    <div className={inputClassName} style={{ marginTop: marginTop }}>
      <label className="inputLabel">{label}</label>
      <FormControl sx={{ m: 0.5 }}>
        <InputComponent
          setValue={setValue}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          startAdornment={
            <InputAdornment>
              <IconButton>{icon}</IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {error && <span className="inputError">{error}</span>}
    </div>
  );
};

export default CustomInput;
