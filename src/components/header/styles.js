import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import AccordionDetails from "@mui/material/AccordionDetails";

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

const StyledNavLinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  margin: 0.5rem;

  border: none;
  background: none;
  border-radius: 20px;
  transition: 0.2s;

  &:hover {
    background-color: #fff;

    svg {
      color: #252525;
    }
  }
`;

const StyledMenuLink = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  '& svg': {
    marginRight: '0.5rem',
    position: 'relative',
  },
  '& svg, & .MuiTypography-root': {
    color: '#fff',
  },
  '&:hover': {
    '& svg, & .MuiTypography-root': {
      color:'#c2c4fd'
    },
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '-0.5rem',
  '& > *:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
}));


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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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
}));

export { StyledNavLinkButton, StyledMenuLink, AppBar, Drawer, DrawerHeader, StyledAccordionDetails };