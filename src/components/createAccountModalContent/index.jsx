import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import CustomOutlinedInput from "../customOutlinedInput";
import { EmailOutlined, PersonOutlined, PhoneOutlined } from "@mui/icons-material";
import PasswordOutlinedInput from "../passwordOutlinedInput";
import PrimaryGradientButton from "../primaryGrandientButton";
import "./index.css";

import { api } from "../../server/api";

function CreateAccountModalContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignUp(){
         if(!name || !email || !password ){
              return alert("Preencha todos os campos")
         }
        
         api.post("/users", {name, email, password, phone, birthDate, confirmPassword})
         .then(() => {
          alert("Usuário cadastrado com sucesso!")
         })
         .catch(() => {
           if( name || email || password){
            alert("Usuário cadastrado")
           }else{
            alert("Não foi possível cadastrar, verificar campos preenchidos")
           }
         })
  }

  return (
    <div className="createAccountModalContent">
      <div className="firstSection">
        <span>Crie sua conta</span>
        <FormControl sx={{ m: 1, width: "366px" }}>
          <div className="inputContainer" style={{ marginTop: "56px" }}>
            <label className="inputLabel">Nome</label>
            <CustomOutlinedInput
              setValue={setName}
              onChange={e => setEmail(e.target.value)}
              placeholder="Nome"
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
            <label className="inputLabel">Celular</label>
            <CustomOutlinedInput
            setValue={setPhone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Celular"
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
          <div className="inputContainer" style={{ marginTop: "46px" }}>
            <label className="inputLabel">Data de nascimento</label>
            <CustomOutlinedInput
              setValue={setBirthDate}
              onChange={e => setBirthDate(e.target.value)}
              placeholder="Data de nascimento"
              type="date"
            />
          </div>
        </FormControl>
      </div>
      <div className="secondSection">
        <FormControl sx={{ m: 1, width: "366px" }}>
          <div className="inputContainer" style={{ marginTop: "56px" }}>
            <label className="inputLabel">Senha</label>
            <PasswordOutlinedInput setValue={setPassword}  onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className="inputContainer" style={{ marginTop: "46px" }}>
            <label className="inputLabel">Confirmar Senha</label>
            <PasswordOutlinedInput setValue={setConfirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmar Senha" />
          </div>
          <FormControlLabel
            sx={{ marginTop: "42px" }}
            control={<Checkbox style={{ color: "#404040" }} defaultChecked />}
            label="Aceito os termos de uso da plataforma"
          />
          <div className="buttonsSection">
            <PrimaryGradientButton onClick={handleSignUp} text="Entrar" />
          </div>
        </FormControl>
      </div>
    </div>
  );
}

export default CreateAccountModalContent;
