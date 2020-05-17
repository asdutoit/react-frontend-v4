import React, { useContext, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import axios from "axios";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const useStyles = makeStyles({
  root: {
    color: "black",
  },
});

export default function ServiceSwitch(props) {
  const [switchState, setSwitchState] = useState({
    checkedB: props.service,
  });
  const classes = useStyles();
  const { rowDetails } = props;

  const handleChange = async (event) => {
    console.log(rowDetails);
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
    // props.setProvisioning(!props.provisioning);
    // const response = await handleProvisioning();
    // console.log("RESPONSE 1: ", response);
    // const response2 = await checkProvisioningStatus(response);
    // console.log("RESPONSE 2: ", response2);

    // props.setProvisioning(false);
  };

  const handleProvisioning = async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost:7788/api/prov/${rowDetails.serial_number}`,
      data: {
        bwProfDown: "DS_10M_UST4",
        bwProfUp: "US_10M_UST4",
        vlan: "100",
        username: "root",
        password: "PHcpT4{oRH",
      },
    });
    return response;
  };

  const checkProvisioningStatus = async (response) => {
    const res = await axios({
      method: "post",
      url: `http://localhost:7788/api/checkProvisioningStatus/${response.data.task_id}`,
      data: {
        username: "root",
        password: "PHcpT4{oRH",
        tokenTenant: response.data.tokenTenant,
      },
    });
    return res;
  };

  //TODO: & FIXME: Write another network request that updates the Database if the provisioning was successful or failed.

  return (
    <FormGroup>
      <FormControlLabel
        classes={{
          root: classes.root,
        }}
        control={
          <IOSSwitch
            checked={switchState.checkedB}
            onChange={handleChange}
            name="checkedB"
          />
        }
        label={switchState.checkedB ? "Unprovision" : "Provision"}
      />
    </FormGroup>
  );
}
