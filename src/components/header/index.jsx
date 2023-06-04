import React, { useContext, useState } from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Home, Search, Book } from "@mui/icons-material";
import logo from "./Brand.png";
import LoginButton from "../loginButton";
import CreateAccountButton from "../createAccountButton";
import AppBarActions from "../appBarActions";
import CustomModal from "../customModal";
import LoginModalContent from "../loginModalContent";
import CreateAccountModalContent from "../createAccountModalContent";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import { NavButton } from './styles'
import CreateFilms from '../../pages/createFilms'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  border: "none",
  width: drawerWidth,
  backgroundColor: "#212121",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  border: "none",
  backgroundColor: "#212121",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#212121",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export default function Header() {
  const { savedUser } = useContext(AuthenticateContext)

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [contentToShow, setContentToShow] = useState(<></>);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  useEffect(() => {
    if (savedUser) {
      setOpen(false)

    }
  }, [savedUser])

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0} sx={{ paddingTop: 3 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
         
          <img src={logo} alt="logo" />
          {savedUser ?
            (<Box sx={{ display: "flex", alignItems: "center", width: 150, justifyContent: "space-between" }}>  <Link style={{textDecoration: "none"}} to="/Person"> <h1>{savedUser.name}</h1> </Link><button onClick={() => { localStorage.removeItem("user"); window.location.reload(false) }} style={{ background: "none", border: "none", cursor: "Pointer" }} to="/"><img src={arrow} alt="Log out" /></button></Box>)
            : (
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
                        <LoginModalContent />
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
        <DrawerHeader>
          <IconButton sx={{ color: "#fff" }}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

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
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src={logo} alt="logo" />
              <h1 style={{ fontWeight: "400", letterSpacing: "5px" }}>Télos</h1>
            </div>
            {savedUser ?
              (<Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}> <h1 style={{ marginRight: "5rem" }}>{savedUser.name}</h1>
                <div style={{ position: "absolute", right: "0", marginLeft: "0.5rem" }}>
                  <Accordion sx={{ backgroundColor: "#737070", borderRadius: "18px" }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                    </AccordionSummary>
                    <div style={{ marginTop: "-1rem" }}>
                      <Typography
                        sx={{ padding: "0.8rem 0rem" }}
                      >
                        <Link style={{ textDecoration: "none", color: "#ffff" }} to="/Person"> Perfil </Link>
                      </Typography>
                      <Typography
                        sx={{ padding: "0.2rem 0rem 0.8rem" }}
                      >
                        <Link style={{ textDecoration: "none", color: "#ffff" }} onClick={() => { localStorage.removeItem("user"); window.location.reload(false) }} to="/"> Sair </Link>
                      </Typography>
                    </div>
                  </Accordion>
                </div>
              </Box>)
              : (
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
                          <LoginModalContent setCreateAccountContent={() => { setContentToShow(<CreateAccountModalContent />) }} />
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
          <DrawerHeader>
            <IconButton sx={{ color: "#fff" }}>
              {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>

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
              <NavButton href="/">
                <Home sx={{ height: 23, width: 23, color: "#EEEEEE" }} />
              </NavButton>

              <NavButton href="/cardsFilms">
                <Search className="svg" color="#fff" sx={{ height: 23, width: 23, color: "#EEEEEE" }} />
              </NavButton>

              {savedUser && savedUser.role === "admin" ? (<NavButton onClick={() => {
                setOpen(true);
                setContentToShow(<CreateFilms />)
              }}>
                <Book color="#fff" sx={{ height: 23, width: 23, color: "#EEEEEE" }} />
              </NavButton>) : ""}
            </Box>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
        <CustomModal open={open} setOpen={setOpen} content={contentToShow} />
      </Box>
    </>
  );
}
