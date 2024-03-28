import React, { useContext, useState } from "react";
import { FormControlLabel } from "@mui/material";
import {
  DnsRounded,
  EastOutlined,
  EmailOutlined,
  PhoneOutlined,
  InfoRounded,
  PersonOutlined,
  ShowChartOutlined,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomInput from "../customInput";
import PrimaryGradientButton from "../primaryGrandientButton";
import SecondaryGradientButton from "../secondaryGrandientButton";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import { UserContext } from "../../contexts/UserContext";
import usePasswordValidation from "../../hooks/usePasswordValidation";
import useEmailValidation from "../../hooks/useEmailValidation";
import useCellphoneValidation from "../../hooks/useCellphoneValidation";
import useNameValidation from "../../hooks/useNameValidation";
import useSnackbar from "../../hooks/useSnackbar";
import "./index.css";

export function Profile() {
  const { authenticateData, isAuthenticated } = useContext(AuthenticateContext);
  const { updateProfile, updatePassword } = useContext(UserContext);
  const [name, setName] = useState(authenticateData?.name);
  const [email, setEmail] = useState(authenticateData?.email);
  const [cellphone, setCellphone] = useState(authenticateData?.cellphone);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { validateName, errorName } = useNameValidation();
  const { validatePhone, errorPhone } = useCellphoneValidation();
  const { validateEmail, errorEmail } = useEmailValidation();
  const { validatePassword, errorPassword } = usePasswordValidation();
  const { handleOpenSnackbar, snackbar } = useSnackbar();

  async function handleUpdate() {
    const isValidName = validateName(name);
    const isValidEmail = validateEmail(email);
    const isValidPhone = validatePhone(cellphone);
    if (!isValidName || !isValidEmail || !isValidPhone) {
      return;
    }

    const payload = {
      id: authenticateData?.id,
      name: name,
      email: email,
      cellphone: cellphone,
    };

    const statusCode = await updateProfile({ ...payload });

    if (statusCode === 200) {
      handleOpenSnackbar("Profile updated successfully!", "success");
    }
  }

  async function handleUpdatePassword() {
    const isValidPassword = validatePassword(password, confirmPassword);
    if (!isValidPassword) {
      return;
    }

    const payloadPassword = {
      id: authenticateData?.id,
      password: password,
    };

    const statusCode = await updatePassword({ ...payloadPassword });

    if (statusCode === 200) {
      handleOpenSnackbar("Password updated successfuly!", "success");
    }
  }

  if (!isAuthenticated) {
    return <h1>You need to be logged in to update your profile</h1>;
  }

  return (
    <div>
      {snackbar}
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
            <h1>{authenticateData?.name}</h1>
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
            <CustomInput
              marginTop="20px"
              label="Name"
              placeholder="Name"
              type="text"
              icon={<PersonOutlined sx={{ color: "#fff" }} />}
              setValue={setName}
              defaultValue={authenticateData?.name}
              onChange={(e) => setName(e.target.value)}
              error={errorName}
            />
            <CustomInput
              marginTop="20px"
              label="E-mail"
              placeholder="E-mail"
              type="email"
              icon={<EmailOutlined sx={{ color: "#fff" }} />}
              setValue={setEmail}
              defaultValue={authenticateData?.email}
              onChange={(e) => setEmail(e.target.value)}
              error={errorEmail}
            />
            <CustomInput
              marginTop="20px"
              label="Cellphone"
              placeholder="Cellphone"
              type="text"
              icon={<PhoneOutlined sx={{ color: "#fff" }} />}
              setValue={setCellphone}
              defaultValue={authenticateData?.cellphone}
              onChange={(e) => setCellphone(e.target.value)}
              error={errorPhone}
            />
            <FormControlLabel
              sx={{
                marginTop: "55px",
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

            <div className="secondSection">
              <CustomInput
                marginTop="0px"
                label="New password"
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
                setValue={setPassword}
                type="password"
                isPassword={true}
              />
              <CustomInput
                marginTop="20px"
                label="Confirm password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                setValue={setConfirmPassword}
                type="password"
                isPassword={true}
                error={errorPassword}
              />
              <div className="buttonsSection">
                <PrimaryGradientButton
                  icon={<ShowChartOutlined />}
                  text="Change password"
                  img={<EastOutlined />}
                  onClick={handleUpdatePassword}
                />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
