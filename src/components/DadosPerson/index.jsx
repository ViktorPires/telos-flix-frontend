import { FormControl, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import CustomOutlinedInput from "../customOutlinedInput";
import { DnsRounded, EastOutlined, EmailOutlined, InfoRounded, PersonOutlined, ShowChartOutlined, StarBorderOutlined } from "@mui/icons-material";
import PasswordOutlinedInput from "../passwordOutlinedInput";
import PrimaryGradientButton from "../primaryGrandientButton";
import "./index.css";
import SecondaryGradientButton from "../secondaryGrandientButton";
import Logo from './Icon.png'

export function DadosPerson() {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, SetBirthDate] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


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
                                setValue={setname}
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
                                setValue={SetBirthDate}
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
                            />

                        </div>
                        <div>
                            <div className="inputContainer" style={{ marginTop: "56px" }}>
                                <label className="inputLabel">Senha atual</label>
                                <PasswordOutlinedInput setValue={setPassword} />
                            </div>
                            <div className="inputContainer" style={{ marginTop: "46px" }}>
                                <label className="inputLabel">Nova Senha</label>
                                <PasswordOutlinedInput setValue={setConfirmPassword} placeholder="Confirmar Senha" />
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