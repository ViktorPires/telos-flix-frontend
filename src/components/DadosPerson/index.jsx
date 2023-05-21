import { FormControl, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import CustomOutlinedInput from "../customOutlinedInput";
import { DnsRounded, EastOutlined, EmailOutlined, InfoRounded, PersonOutlined, ShowChartOutlined, StarBorderOutlined } from "@mui/icons-material";
import PasswordOutlinedInput from "../passwordOutlinedInput";
import PrimaryGradientButton from "../primaryGrandientButton";
import "./index.css";
import SecondaryGradientButton from "../secondaryGrandientButton";
import Logo from './Icon.png'
import { useAuth } from "../../hooks/auth";


export function DadosPerson() {
    const { updateProfile } = useAuth

    
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [birthDate, setBirthDate] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();


    async function handleUpdate(){
        const user = {
            name,
            email,
            birthDate,
            password,
            confirmPassword
        }
        await updateProfile({ user })
    }
     
    


    return (
        <div>
            <div className="modifyPerson">
                <div style={{height: "150px", borderBottom: "1px solid #A9A9A9 ", marginTop: "-1rem"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={Logo} alt="" />
                        <h1>Nome</h1>
                    </div>
                    <div>
                        <SecondaryGradientButton
                            icon={<DnsRounded />}
                            text="Dados pessoais"
                        />
                    </div>
                </div>

                <div className="firstSection">
                    <span>Dados Pessoais</span>
                    <FormControl sx={{ m: 1, width: "366px" }}>
                        <div className="inputContainer" style={{ marginTop: "56px" }}>
                            <label className="inputLabel">Nome</label>
                            <CustomOutlinedInput
                                onChange={e => setName(e.target.value)}
                                setValue={setName}
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
                            onChange={e => setEmail(e.target.value)}
                                setValue={setEmail}
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
                            <label className="inputLabel">Data de nascimento</label>
                            <CustomOutlinedInput
                            onChange={e => setBirthDate(e.target.value)}
                                setValue={setBirthDate}
                                placeholder="Data de nascimento"
                                type="date"
                            />
                        </div>
                        <FormControlLabel
                            sx={{ marginTop: "42px", width: "700px", textAlign: "start", fontSize: "14px", display: "flex", gap: "10px" }}
                            control={<InfoRounded />}
                            label="Please see our privacy statement to learn more about how we use this information."
                        />

                        <div className="buttonsSection">
                            <PrimaryGradientButton
                                icon={<ShowChartOutlined />}
                                text="Alterar Dados"
                                img={<EastOutlined />}
                                onClick={handleUpdate}
                            />

                        </div>
                        <div>
                            <div className="inputContainer" style={{ marginTop: "56px" }}>
                                <label className="inputLabel">Senha atual</label>
                                <PasswordOutlinedInput onChange={e => setPassword(e.target.value)}  setValue={setPassword} />
                            </div>
                            <div className="inputContainer" style={{ marginTop: "46px" }}>
                                <label className="inputLabel">Nova Senha</label>
                                <PasswordOutlinedInput onChange={e => setConfirmPassword(e.target.value)} setValue={setConfirmPassword} placeholder="Confirmar Senha" />
                            </div>

                            <div className="buttonsSection">
                                <PrimaryGradientButton
                                    icon={<ShowChartOutlined />}
                                    text="Mudar senha"
                                    img={<EastOutlined />}
                                />

                            </div>
                        </div>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}