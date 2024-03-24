import React, { useContext, useState } from "react";
import {
  Alert,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import {
  DnsRounded,
  EastOutlined,
  EmailOutlined,
  InfoRounded,
  PersonOutlined,
  ShowChartOutlined,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomOutlinedInput from "../customOutlinedInput";
import PasswordOutlinedInput from "../passwordOutlinedInput";
import PrimaryGradientButton from "../primaryGrandientButton";
import SecondaryGradientButton from "../secondaryGrandientButton";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import { UserContext } from "../../contexts/UserContext";
import usePasswordValidation from "../../hooks/usePasswordValidation";
import "./index.css";

export function Profile() {
  const { authenticateData, isAuthenticated } = useContext(AuthenticateContext);
  const { updateProfile, updatePassword } = useContext(UserContext);
  const [name, setName] = useState(authenticateData?.name);
  const [email, setEmail] = useState(authenticateData?.email);
  const [cellphone, setCellphone] = useState(authenticateData?.cellphone);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const { validatePassword, errorMessage } = usePasswordValidation();

  async function handleUpdate() {
    const payload = {
      id: authenticateData?.id,
      name,
      email,
      cellphone,
    };

    const statusCode = await updateProfile(payload);

    if (statusCode === 200) {
      setMessage("Profile updated with success");
      setIsSuccessMessage(true);
      setOpen(true);
    }
  }

async function handleUpdatePassword() {
    const isValidPassword = validatePassword(password, confirmPassword);

    if (!isValidPassword) {
        setMessage(errorMessage);
        setIsSuccessMessage(false);
        setOpen(true);
        return;
    }

    const payloadPassword = {
        id: authenticateData?.id,
        password,
    };

    const statusCode = await updatePassword(payloadPassword);

    if (statusCode === 200) {
        setMessage("Password changed with success");
        setIsSuccessMessage(true);
        setOpen(true);
    }
}

  if (!isAuthenticated) {
    return <h1>You need to be logged in to update your profile</h1>;
  }

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={isSuccessMessage ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <div className="modifyPerson">
        <div
          style={{
            height: "150px",
            borderBottom: "1px solid #A9A9A9 ",
            marginTop: "-1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccountCircleIcon
              sx={{ color: "#EEEEEE", fontSize: "2rem", marginRight: "0.5rem" }}
            />
            <h1>{name}</h1>
          </div>
          <div>
            <SecondaryGradientButton
              icon={<DnsRounded />}
              text="Personal data"
              alwaysActive={true}
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
                defaultValue={name}
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
                defaultValue={email}
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
                defaultValue={cellphone}
                placeholder="Cellphone"
                type="text"
              />
            </div>
            <FormControlLabel
              sx={{
                marginTop: "42px",
                width: "700px",
                textAlign: "start",
                fontSize: "14px",
                display: "flex",
                gap: "10px",
                color: "#fff",
              }}
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
                <PasswordOutlinedInput
                    onChange={(e) => setPassword(e.target.value)}
                    setValue={setPassword}
                  placeholder="New password"
                />
              </div>
              <div className="inputContainer" style={{ marginTop: "46px" }}>
                <label className="inputLabel">Confirm password</label>
                <PasswordOutlinedInput
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    setValue={setConfirmPassword}
                    placeholder="Confirm password"
                />
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
