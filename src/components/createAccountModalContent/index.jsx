import {
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState, useContext } from "react";
import CustomInput from "../customInput";
import {
  EmailOutlined,
  PersonOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import PrimaryGradientButton from "../primaryGrandientButton";
import "./index.css";
import { UserContext } from "../../contexts/UserContext";
import useNameValidation from "../../hooks/useNameValidation";
import useEmailValidation from "../../hooks/useEmailValidation";
import useCellphoneValidation from "../../hooks/useCellphoneValidation";
import usePasswordValidation from "../../hooks/usePasswordValidation";
import useSnackbar from "../../hooks/useSnackbar";

function CreateAccountModalContent() {
  const { createUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { validateName, errorName } = useNameValidation();
  const { validateEmail, errorEmail } = useEmailValidation();
  const { validatePhone, errorPhone } = useCellphoneValidation();
  const { validatePassword, errorPassword } = usePasswordValidation();
  const { handleOpenSnackbar, snackbar } = useSnackbar();

  async function handleSignUp(event) {
    event.preventDefault();
    const isValidName = validateName(name);
    const isValidEmail = validateEmail(email);
    const isValidPhone = validatePhone(cellphone);
    const isValidPassword = validatePassword(password, confirmPassword);

    if (!isValidName || !isValidEmail || !isValidPhone || !isValidPassword) {
      return;
    }

    const statusCode = await createUser({
      name,
      email,
      password,
      cellphone,
      confirmPassword,
    });
    if (statusCode === 201) {
      handleOpenSnackbar("User created successfully!", "success");
    }
  }

  return (
    <div className="createAccountModalContent">
      <div className="firstSection">
        <span>Create your account</span>
          <CustomInput
            setValue={setName}
            onChange={(e) => setName(e.target.value)}
            label={"Name"}
            placeholder={"Name"}
            type={"text"}
            icon={ <PersonOutlined sx={{ color: "#EEEEEE" }}/> }
            error={errorName}
          />
          <CustomInput
            setValue={setEmail}
            onChange={(e) => setEmail(e.target.value)}
            label={"E-mail"}
            placeholder={"E-mail"}
            type={"email"}
            icon={ <EmailOutlined sx={{ color: "#EEEEEE" }}/> }
            error={errorEmail}
          />
          <CustomInput
            setValue={setCellphone}
            onChange={(e) => setCellphone(e.target.value)}
            label={"Cellphone"}
            placeholder={"Cellphone"}
            type={"text"}
            icon={ <PhoneOutlined sx={{ color: "#EEEEEE" }}/> }
            error={errorPhone}
          />
      </div>
      <div className="secondSection">
        <CustomInput
            setValue={setPassword}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            type={"password"}
            isPassword={true}
          />
          <CustomInput
            setValue={setConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label={"Confirm password"}
            placeholder={"Confirm password"}
            type={"password"}
            isPassword={true}
            error={errorPassword}
          />

          <FormControlLabel
            sx={{ marginTop: "60px" }}
            control={
              <Checkbox
                style={{ color: "#404040" }}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
            }
            label="I agree with the terms and services of the plataform"
          />
          <div className="buttonsSection">
            <PrimaryGradientButton
              onClick={handleSignUp}
              text="Register"
              disabled={!agreeToTerms}
            />
          </div>
      </div>
      {snackbar}
    </div>
  );
}

export default CreateAccountModalContent;
