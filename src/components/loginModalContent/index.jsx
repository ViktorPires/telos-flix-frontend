import React, { useContext, useState } from "react";
import "./index.css";
import image from "./image.png";
import { Email } from "@mui/icons-material";
import { AddBoxOutlined } from "@mui/icons-material";
import LoginButton from "../loginButton";
import CreateAccountButton from "../createAccountButton";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import CustomInput from "../customInput";
import SecondaryGradientButton from "../secondaryGrandientButton";

export default function LoginModalContent({ setCreateAccountContent }) {
  const { login } = useContext(AuthenticateContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="loginModalContent">
        <div className="firstSection">
          Login
          <div className="imageContainer">
            <img width="295px" height="127px" src={image} alt="" />
          </div>
        </div>
        <div className="secondSection">
          <CustomInput
            marginTop={"-10px"}
            setValue={setEmail}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
            styledClassLabel={"inputLabel"}
            placeholder={"Email"}
            type={"email"}
            icon={<Email sx={{ color: "#EEEEEE" }} />}
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
          />
          <div className="buttonsSection">
            <LoginButton showIcon={false} onClick={() => login(email, password)} />
            <CreateAccountButton onClick={setCreateAccountContent} />
          </div>
        </div>
      </div>
    </>
  );
}
