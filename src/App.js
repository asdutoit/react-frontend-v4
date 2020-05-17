import React, { useContext, useReducer } from "react";
import { ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import theme from "./utils/theme";
import OntTable from "./components/MainTable/ontTable";
// import OntTable2 from "./components/MainTable/ontTable2";
// import axios from "axios";
import Context from "./context";
import reducer from "./reducer";
import EditOnt from "./components/editOntForm/EditOnt";
import NotFound from "./components/NotFound";
import "./App.css";
import Drawer from "./components/Drawer/Drawer";
import NewNavbar from "./components/Navbar/newNavbar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -drawerWidth,
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

export default function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className="App">
      <Router>
        <Context.Provider value={{ state, dispatch }}>
          <ThemeProvider theme={theme}>
            <div className="yellow-figure-temp">
              <Drawer open={open} setOpen={setOpen} />
              <div
                className={clsx(classes.content, {
                  [classes.contentShift]: open,
                })}
              >
                <NewNavbar handleDrawerOpen={handleDrawerOpen} open={open} />

                <div
                  style={{
                    maxWidth: "90%",
                    margin: "auto",
                    paddingTop: "6rem",
                  }}
                >
                  <Switch>
                    <Route exact path="/" component={OntTable} />
                    {/* <Route exact path="/test" component={OntTable2} /> */}
                    <Route
                      exact
                      path="/editont/:ontId"
                      render={(routeProps) => <EditOnt {...routeProps} />}
                    />
                    <Route render={() => <NotFound />} />
                  </Switch>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </Context.Provider>
      </Router>
    </div>
  );
}
