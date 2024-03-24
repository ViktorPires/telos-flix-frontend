import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import { Home, Search, Book } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "./Brand.png";
import LoginButton from "../loginButton";
import CreateAccountButton from "../createAccountButton";
import AppBarActions from "../appBarActions";
import CustomModal from "../customModal";
import LoginModalContent from "../loginModalContent";
import CreateAccountModalContent from "../createAccountModalContent";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import { StyledNavLinkButton, StyledMenuLink, AppBar, Drawer, DrawerHeader, StyledAccordionDetails } from "./styles";
import CreateFilms from "../../pages/createFilms";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Header(setCreateAccountContent) {
  const { authenticateData, isAuthenticated, logout } = useContext(AuthenticateContext);
  const [open, setOpen] = useState(false);
  const [contentToShow, setContentToShow] = useState(<></>);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <div data-testid="header-component">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" elevation={0} sx={{ paddingTop: 3 }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "nowrap",
              }}
            >
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <img
                  src={logo}
                  alt="logo"
                  style={{ verticalAlign: "middle" }}
                />
                <h1 style={{ marginLeft: "1rem", color: "#fff" }}>
                  Télos<span style={{ textTransform: "uppercase" }}>FLIX</span>
                </h1>
              </Link>
            </div>
            {isAuthenticated ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <h1
                  style={{
                    marginRight: "1rem",
                    background: "red",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "18px",
                    marginTop: "-0.1rem",
                  }}
                >
                  {authenticateData?.name.charAt(0).toUpperCase()}
                </h1>
                <h1 style={{ marginRight: "8rem" }}>{authenticateData?.name}</h1>
                  <Accordion
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: "#737070",
                      borderRadius: "18px",
                      position: "absolute",
                      right: "0",
                    }}
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <span style={{ marginRight: "0.4rem" }}>Menu</span>
                    </AccordionSummary>
                    <StyledAccordionDetails>
                      <StyledMenuLink to="/Person">
                        <AccountCircleIcon sx={{ right: "0.2rem" }} />
                        <Typography>Profile</Typography>
                      </StyledMenuLink>
                      <StyledMenuLink onClick={(event) => { event.preventDefault(); logout(); }} >
                        <LogoutIcon />
                        <Typography>Logout</Typography>
                      </StyledMenuLink>
                    </StyledAccordionDetails>
                  </Accordion>
              </Box>
            ) : (
              <AppBarActions
                actions={[
                  <CreateAccountButton
                    onClick={() => {
                      setContentToShow(<CreateAccountModalContent />);
                      setOpen(true);
                    }}
                  />,
                  <LoginButton
                    onClick={() => {
                      setContentToShow(
                        <LoginModalContent
                          setCreateAccountContent={() =>
                            setContentToShow(<CreateAccountModalContent />)
                          }
                        />
                      );
                      setOpen(true);
                    }}
                  />,
                ]}
              />
            )}
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent">
          <List
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <StyledNavLinkButton to="/">
                <Home sx={{ height: 23, width: 23, color: "#EEEEEE" }} />
              </StyledNavLinkButton>

              <StyledNavLinkButton to="/cardsFilms">
                <Search
                  className="svg"
                  color="#fff"
                  sx={{ height: 23, width: 23, color: "#EEEEEE" }}
                />
              </StyledNavLinkButton>

              {isAuthenticated && authenticateData.role === "admin" ? (
                <StyledNavLinkButton
                  onClick={() => {
                    setOpen(true);
                    setContentToShow(<CreateFilms />);
                  }}
                >
                  <Book
                    color="#fff"
                    sx={{ height: 23, width: 23, color: "#EEEEEE" }}
                  />
                </StyledNavLinkButton>
              ) : (
                ""
              )}
            </Box>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
        <CustomModal open={open} setOpen={setOpen} content={contentToShow} />
      </Box>
    </div>
  );
}
