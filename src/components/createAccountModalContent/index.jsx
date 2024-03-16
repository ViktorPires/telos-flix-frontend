import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import React, { useState, useContext } from "react";
import CustomOutlinedInput from "../customOutlinedInput";
import { EmailOutlined, PersonOutlined, PhoneOutlined } from "@mui/icons-material";
import PasswordOutlinedInput from "../passwordOutlinedInput";
import PrimaryGradientButton from "../primaryGrandientButton";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";

function CreateAccountModalContent() {
  const { createUser } = useContext(AuthenticateContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');


  async function handleSignUp(event) {
    event.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage('Fill all fields')
      return
    }
    if (confirmPassword !== password) {
      setErrorMessage('The passwords must match')
      return
    }
    await createUser({ name, email, password, age, confirmPassword })
  }

  return (
    <div className="createAccountModalContent">
      <div className="firstSection">
        <span>Create your account</span>
        <FormControl sx={{ m: 1, width: "366px" }}>
          <div className="inputContainer" style={{ marginTop: "56px" }}>
            <label className="inputLabel">Name</label>
            <CustomOutlinedInput
              setValue={setName}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              type="text"
              startAdornment={
                <InputAdornment>
                  <IconButton>
                    <PersonOutlined sx={{ color: "#EEEEEE" }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="inputContainer" style={{ marginTop: "46px" }}>
            <label className="inputLabel">E-mail</label>
            <CustomOutlinedInput
              setValue={setEmail}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail"
              type="text"
              startAdornment={
                <InputAdornment>
                  <IconButton>
                    <EmailOutlined sx={{ color: "#EEEEEE" }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="inputContainer" style={{ marginTop: "46px" }}>
            <label className="inputLabel">Cellphone</label>
            <CustomOutlinedInput
              setValue={setAge}
              onChange={e => setAge(e.target.value)}
              placeholder="Cellphone"
              type="text"
              startAdornment={
                <InputAdornment>
                  <IconButton>
                    <PhoneOutlined sx={{ color: "#EEEEEE" }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </FormControl>
      </div>
      <div className="secondSection">
        <FormControl sx={{ m: 1, width: "366px" }}>
          <div className="inputContainer" style={{ marginTop: "56px" }}>
            <label className="inputLabel">Password</label>
            <PasswordOutlinedInput setValue={setPassword} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <div className="inputContainer" style={{ marginTop: "46px" }}>
            <label className="inputLabel">Confirm password</label>
            <PasswordOutlinedInput setValue={setConfirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
          </div>
          <span style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</span>

          <FormControlLabel
            sx={{ marginTop: "42px" }}
            control={<Checkbox style={{ color: "#404040" }} onChange={(e) => setAgreeToTerms(e.target.checked)} />}
            label="I agree with the terms and services of the plataform"
          />
          <div className="buttonsSection">
            <PrimaryGradientButton onClick={handleSignUp} text="Register" disabled={!agreeToTerms}/>
          </div>
        </FormControl>
      </div>
    </div>
  );
}

export default CreateAccountModalContent;
