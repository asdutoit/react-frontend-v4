import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import SaveAndProvision from "./SaveAndProvision";
import AddressForm from "./AddressForm";
import OntAndServiceForm from "./ontAndServiceForm";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useMediaQuery } from "@material-ui/core";
import CustomActiveChip from "../../components/MainTable/customActiveChip";
import CustomDoneIcon from "../../components/MainTable/customDoneIcon";
import CustomInactiveChip from "../../components/MainTable/customInactiveChip";
import CustomNotDoneIcon from "../../components/MainTable/customNotDoneIcon";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddressSchema = yup.object().shape({
  resident_name: yup.string().required(),
  resident_surname: yup.string().required(),
  resident_cell: yup.number().required().typeError("Invalid Number"),
  resident_email: yup
    .string()
    .required("Email Required")
    .email("Invalid Email"),
  unit_no: yup.number().required(),
  complex: yup.string().required(),
  street: yup.string(),
  suburb: yup.string().required(),
  city: yup.string().required(),
  zip: yup.number().required(),
});

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "18%",
    left: "50%",
    marginTop: -1,
    marginLeft: -8,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
  },
  button: {
    // marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    minWidth: theme.spacing(1),
  },
  buttonProvision: {
    // marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    fontWeight: 900,
    letterSpacing: "1px",
  },
  text: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: theme.spacing(2),
  },
  buttonContainerSmall: {
    display: "flex",
    flexWrap: "wrap-reverse",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    marginTop: theme.spacing(2),
  },
  divEl: {
    marginTop: theme.spacing(2),
  },
}));

const INITIALADDRESS = {
  resident_name: "",
  resident_surname: "",
  resident_cell: "",
  resident_email: "",
  unit_no: "",
  complex: "",
  street: "",
  suburb: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  serial_number: "",
  manufacturer: "",
  model: "",
  package: "",
  optical_signal: "",
  type: "",
  images: [],
  isp_owner: "",
  wifi_ssid: "",
  wifi_password: "",
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://www.lighttree.co.za/">
        Lighttree
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Address", "Equipment Information", "Review Information"];

function getStepContent(step, custProps) {
  const [
    handleChange,
    address,
    errors,
    register,
    currentOnt,
    setAddress,
  ] = custProps;
  switch (step) {
    case 0:
      return (
        <AddressForm
          handleChange={handleChange}
          address={address}
          register={register}
          errors={errors}
          currentOnt={currentOnt}
        />
      );
    case 1:
      return (
        <OntAndServiceForm
          handleChange={handleChange}
          address={address}
          register={register}
          errors={errors}
          setAddress={setAddress}
        />
      );
    case 2:
      return <SaveAndProvision address={address} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function EditOnt(props) {
  const ontId = props.match.params.ontId;
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width: 520px)");
  const { register, errors } = useForm({
    mode: "onBlur",
    validationSchema: AddressSchema,
  });
  const [currentOnt, setCurrentOnt] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);

  useEffect(() => {
    fetchOneOnt(ontId);
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState(INITIALADDRESS);
  const [incomplete, setIncomplete] = React.useState({
    step1: true,
    step2: true,
    step3: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:7788/api/ont/${ontId}`,
        data: address,
      });
      //TODO: Handle response as a note to user that upload has been completed
      console.log(response);
      //FIXME: Fix above ^^^^^^^
      setLoading(false);
      setOpen(true);
      handleNext();
    } catch (error) {
      setOpenFailure(true);
      setLoading(false);
      console.log("Could not save to DB", error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailure(false);
    setOpen(false);
  };

  const fetchOneOnt = async (ontId) => {
    try {
      const response = await axios.get(
        // "http://ispprov.lighttree.co.za/api/onts"
        `http://localhost:7788/api/ont/${ontId}`
      );
      const preCleaned = response.data;
      // replaceSingleValue(preCleaned, "provisioned", "Provisioned");
      setAddress({ ...address, ...preCleaned });
      setCurrentOnt(preCleaned);
    } catch (error) {
      console.log("ONT error: ", error);
    }
  };
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  console.log("FULL ADDRESS: ", address);
  if (
    isEmpty(
      address.resident_name &&
        address.resident_surname &&
        address.resident_email &&
        address.resident_cell &&
        address.unit_no &&
        address.complex &&
        address.suburb &&
        address.city
    ) === true
  ) {
    incomplete.step1 = true;
  } else {
    incomplete.step1 = false;
  }
  if (
    isEmpty(address.serial_number && address.model && address.package) === true
  ) {
    incomplete.step2 = true;
  } else {
    incomplete.step2 = false;
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
      </Grid>
      {currentOnt !== null ? (
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Edit Service Profile
            </Typography>
            {address.provisioned === true ? (
              <CustomActiveChip
                label="Provisioned"
                icon={<CustomDoneIcon />}
                size="small"
                // provisioning={provisioning}
              />
            ) : (
              <CustomInactiveChip
                label="Inactive"
                icon={<CustomNotDoneIcon />}
                size="small"
                // provisioning={provisioning}
              />
            )}

            <Stepper
              activeStep={activeStep}
              className={classes.stepper}
              alternativeLabel={true}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Completed
                  </Typography>
                  <Typography variant="subtitle1">
                    Information has been updated and saved.
                  </Typography>
                  <br />
                  <Link to="/">
                    <Button variant="outlined">Home</Button>
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep, [
                    handleChange,
                    address,
                    errors,
                    register,
                    currentOnt,
                    setAddress,
                  ])}
                  <div
                    className={
                      isActive
                        ? classes.buttonContainerSmall
                        : classes.buttonContainer
                    }
                  >
                    <div className={isActive ? classes.divEl : null}>
                      <Link to="/">
                        <Button variant="outlined">Home</Button>
                      </Link>
                    </div>
                    <div>
                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                          <Button
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                        )}
                        <div className={classes.buttons}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={
                              activeStep === 0 || activeStep === 1
                                ? handleNext
                                : activeStep === 2
                                ? handleSave
                                : null
                            }
                            className={classes.button}
                            disabled={
                              (activeStep === 0 && incomplete.step1 === true) ||
                              (activeStep === 1 && incomplete.step2 === true)
                                ? true
                                : loading
                                ? true
                                : false
                            }
                          >
                            {activeStep === steps.length - 1 ? "Save" : "Next"}
                          </Button>
                          {loading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </div>
                        {activeStep === steps.length - 1 ? (
                          <div className={classes.buttons}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.buttonProvision}
                            >
                              Save and{" "}
                              {address.provisioned === true
                                ? "Unprovision"
                                : "Provision"}
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      ) : (
        "Loading..."
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Successfully Saved!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openFailure}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Error Saving. Please review all the fields and try again
        </Alert>
      </Snackbar>
    </div>
  );
}
