import React, { useContext, useState, useEffect } from "react";
import { Alert, FormControl, FormControlLabel, IconButton, InputAdornment, Snackbar } from "@mui/material";
import { DnsRounded, EastOutlined, EmailOutlined, InfoRounded, PersonOutlined, ShowChartOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import CustomOutlinedInput from "../customOutlinedInput";
import PasswordOutlinedInput from "../passwordOutlinedInput";
import PrimaryGradientButton from "../primaryGrandientButton";
import SecondaryGradientButton from "../secondaryGrandientButton";
import Logo from './Icon.png';
import { useAuth } from "../../hooks/auth";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import "./index.css";

export function Profile() {
    const { savedUser, updateProfile, updateProfilePassword } = useContext(AuthenticateContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState(savedUser?.email);
    const [cellphone, setCellphone] = useState(savedUser?.cellphone);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    async function handleUpdate() {
        try {
            const payload = {
                id: savedUser._id,
                name,
                email,
                cellphone
            };

            await updateProfile(payload).then((statusCode) => {
                setSuccessMessage("User changed with success")
                setOpen(true)
                setUpdateTrigger(true);
            });
        } catch (error) {
            console.log("Error: ", error);
            alert("Error! Something went wrong");
        }
    }

    async function handleUpdatePassword() {
        try {
            const payloadPassword = {
                id: savedUser._id,
                password,
                confirmPassword,
            };

            await updateProfilePassword(payloadPassword).then((statusCode) => {
                setSuccessMessage("Password successfully changed")
                setOpen(true)
            });
        } catch (error) {
            console.log("Error: ", error);
            alert("Error! Something went wrong while updating the password");
        }
    }

    useEffect(() => {
        if (updateTrigger) {
            navigate("/Person", { replace: true });
        }
    }, [updateTrigger, navigate]);

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => { setOpen(false) }}>
                <Alert onClose={() => { setOpen(false) }} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <div className="modifyPerson">
                <div style={{ height: "150px", borderBottom: "1px solid #A9A9A9 ", marginTop: "-1rem" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={Logo} alt="" />
                        <h1>{savedUser?.name}</h1>
                    </div>
                    <div>
                        <SecondaryGradientButton
                            icon={<DnsRounded />}
                            text="Personal data"
                        />
                    </div>
                </div>

                <div className="firstSection">
                    <span style={{ letterSpacing: "1rem" }}>PROFILE</span>
                    <FormControl sx={{ m: 1, width: "366px" }}>
                        <div className="inputContainer" style={{ marginTop: "56px" }}>
                            <label className="inputLabel">Name</label>
                            <CustomOutlinedInput
                                onChange={(e) => setName(e.target.value)}
                                setValue={setName}
                                placeholder="Name"
                                type="text"
                                defaultValue={savedUser?.name}
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
                                onChange={(e) => setEmail(e.target.value)}
                                setValue={setEmail}
                                placeholder="Email"
                                type="email"
                                defaultValue={savedUser?.email}
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
                                onChange={(e) => setCellphone(e.target.value)}
                                setValue={setCellphone}
                                defaultValue={savedUser?.cellphone}
                                placeholder="Cellphone"
                                type="text"
                            />
                        </div>
                        <FormControlLabel
                            sx={{ marginTop: "42px", width: "700px", textAlign: "start", fontSize: "14px", display: "flex", gap: "10px", color: "#fff" }}
                            control={<InfoRounded />}
                            label="Please see our privacy statement to learn more about how we use this information."
                        />

                        <div className="buttonsSection">
                            <PrimaryGradientButton
                                icon={<ShowChartOutlined />}
                                text="Edit"
                                img={<EastOutlined />}
                                onClick={handleUpdate}
                            />
                        </div>

                        <div>
                            <div className="inputContainer" style={{ marginTop: "56px" }}>
                                <label className="inputLabel">New password</label>
                                <PasswordOutlinedInput onChange={(e) => setConfirmPassword(e.target.value)} setValue={setConfirmPassword} placeholder="New password" />
                            </div>
                            <div className="inputContainer" style={{ marginTop: "46px" }}>
                                <label className="inputLabel">Confirm password</label>
                                <PasswordOutlinedInput onChange={(e) => setPassword(e.target.value)} setValue={setPassword} placeholder="Confirm password" />
                            </div>

                            <div className="buttonsSection">
                                <PrimaryGradientButton
                                    icon={<ShowChartOutlined />}
                                    text="Change password"
                                    img={<EastOutlined />}
                                    onClick={handleUpdatePassword}
                                />
                            </div>
                        </div>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}