import React, { useState } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
// import schedule from "node-schedule";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// const moment = require("moment");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  root2: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38",
      contrastText: "#fff",
    },
    secondary: red,
  },
});

function Chips({ ontSN, unit_no, complex }) {
  const classes = useStyles();
  const [query, setQuery] = useState(false);
  const [queryAnswer, setQueryAnswer] = useState("Check Status");
  const [open, setOpen] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [buttonColor, setButtonColor] = useState("default");

  const fetchONTStatus = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:7788/api/checkontstatus/${ontSN}`,
      });
      if (response.data.result.Status !== "IS") {
        setQueryAnswer("Offline");
        setOpenFailure(true);
        setButtonColor("secondary");
      } else {
        setQueryAnswer("Online");
        setOpen(true);
        setButtonColor("primary");
      }
      console.log(response.data.result.Status);
    } catch (error) {
      console.log("ONTS error: ", error);
    }
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
    setQuery(true);
    fetchONTStatus();
    setTimeout(() => setQuery(false), 16000);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailure(false);
  };

  return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <Button
            size="small"
            variant="contained"
            onClick={handleClick}
            color={buttonColor}
          >
            {query === true ? (
              <>
                <CircularProgress color="inherit" size="1rem" />{" "}
                <span style={{ fontSize: "12px" }}>
                  <p> Querying...</p>
                </span>
              </>
            ) : (
              queryAnswer
            )}
          </Button>
        </ThemeProvider>
      </div>
      <div className={classes.root2}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSuccessClose}
        >
          <Alert onClose={handleSuccessClose} severity="success">
            {`The ONT for ${unit_no} ${complex} is Online`}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openFailure}
          autoHideDuration={6000}
          onClose={handleFailureClose}
        >
          <Alert onClose={handleFailureClose} severity="error">
            {`The ONT for ${unit_no} ${complex} Offline`}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

const MemoizedChips = React.memo(Chips);

export default MemoizedChips;
