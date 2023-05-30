import React, { useContext, useState } from "react";
import "./index.css";
import image from "./image.png";
import { FormControl, IconButton, InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";
import { AddBoxOutlined } from "@mui/icons-material";
import PrimaryGradientButton from "../primaryGrandientButton";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import CustomOutlinedInput from "../customOutlinedInput";
import PasswordOutlinedInput from "../passwordOutlinedInput";
import SecondaryGradientButton from "../secondaryGrandientButton";

export default function LoginModalContent({ setCreateAccountContent }) {
  const { login } = useContext(AuthenticateContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginButtonClicked = async () => {
    await login({ email, password })
    window.location.reload(false)
  }

  return (
    <div className="loginModalContent">
      <div className="firstSection">
        Login
        <div className="imageContainer">
          <img width="295px" height="127px" src={image} alt=""></img>
        </div>
      </div>
      <div className="secondSection">
        <div style={{ m: 1, width: "366px" }} >
          <div className="inputContainer">
            <label className="inputLabel">Email</label>
            <CustomOutlinedInput
              setValue={setEmail}
              placeholder="Email"
              type="text"
              startAdornment={
                <InputAdornment>
                  <IconButton>
                    <Email sx={{ color: "#EEEEEE" }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="inputContainer" style={{ marginTop: "30px" }}>
            <label className="inputLabel">Senha</label>
            <PasswordOutlinedInput setValue={setPassword} />
          </div>
          <div className="buttonsSection">
            <PrimaryGradientButton text="Entrar" onClick={onLoginButtonClicked} />
            <SecondaryGradientButton text="Quero criar uma conta" onClick={setCreateAccountContent} icon={<AddBoxOutlined />} />
          </div>
        </div>
      </div>
    </div>
  );
}
