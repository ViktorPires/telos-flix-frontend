import React, { useContext, useState } from "react";
import "./index.css";
import image from "./image.png";
import { Email } from "@mui/icons-material";
import LoginButton from "../loginButton";
import CreateAccountButton from "../createAccountButton";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import CustomInput from "../customInput";
import useEmailValidation from "../../hooks/useEmailValidation";
import usePasswordValidation from "../../hooks/usePasswordValidation";

export default function LoginModalContent({ setCreateAccountContent }) {
  const { login } = useContext(AuthenticateContext);
  const { validateEmail, errorEmail } = useEmailValidation();
  const { validateLoginPassword, errorPassword } = usePasswordValidation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const isValidEmail = validateEmail(email);
    const isValidPassword = validateLoginPassword(password);
    if (!isValidEmail || !isValidPassword) {
      return;
    }
    login({email, password});
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <>
      <div className="loginModalContent" onKeyDown={handleKeyDown}>
        <div className="firstSection">
          Login
          <div className="imageContainer">
            <img width="295px" height="127px" src={image} alt="" />
          </div>
        </div>
        <div className="secondSection">
          <CustomInput
            setValue={setEmail}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
            styledClassLabel={"inputLabel"}
            placeholder={"Email"}
            type={"email"}
            icon={<Email sx={{ color: "#EEEEEE" }} />}
            error={errorEmail}
          />
          <CustomInput
            marginTop={"20px"}
            setValue={setPassword}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            styledClassLabel={"inputLabel"}
            placeholder={"Password"}
            type={"password"}
            isPassword={true}
            error={errorPassword}
          />
          <div className="buttonsSection">
            <LoginButton showIcon={false} onClick={handleLogin} />
            <CreateAccountButton onClick={setCreateAccountContent} />
          </div>
        </div>
      </div>
    </>
  );
}
