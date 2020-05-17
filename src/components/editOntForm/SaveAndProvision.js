import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  text: {
    textAlign: "left",
    fontWeight: 600,
  },
  text2: {
    textAlign: "left",
    color: "#18a5e1",
    fontWeight: 600,
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const { address } = props;

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Review and Confirm
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6} md={2}>
          <Typography className={classes.text}>Name:</Typography>
          <Typography className={classes.text}>Surname:</Typography>
          <Typography className={classes.text}>Email:</Typography>
          <Typography className={classes.text}>Cell:</Typography>
          <Typography className={classes.text}>Unit Number:</Typography>
          <Typography className={classes.text}>Estate Name:</Typography>
          <Typography className={classes.text}>Street:</Typography>
          <Typography className={classes.text}>Suburb:</Typography>
          <Typography className={classes.text}>City:</Typography>
          <Typography className={classes.text}>Province:</Typography>
          <Typography className={classes.text}>Country:</Typography>
          <Typography className={classes.text}>Postal Code:</Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography className={classes.text2}>
            {address.resident_name}
          </Typography>
          <Typography className={classes.text2}>
            {address.resident_surname}
          </Typography>
          <Typography className={classes.text2}>
            {address.resident_email}
          </Typography>
          <Typography className={classes.text2}>
            {address.resident_cell}
          </Typography>
          <Typography className={classes.text2}>{address.unit_no}</Typography>
          <Typography className={classes.text2}>{address.complex}</Typography>
          <Typography className={classes.text2}>
            {!address.street ? "-" : address.street}
          </Typography>
          <Typography className={classes.text2}>{address.suburb}</Typography>
          <Typography className={classes.text2}>{address.city}</Typography>
          <Typography className={classes.text2}>
            {!address.state ? "-" : address.state}
          </Typography>
          <Typography className={classes.text2}>
            {!address.country ? "-" : address.country}
          </Typography>
          <Typography className={classes.text2}>
            {!address.zip ? "-" : address.zip}
          </Typography>
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography className={classes.text}>Bandwidth:</Typography>
          <Typography className={classes.text}>ISP:</Typography>
          {address.model.includes("5317") || address.model.includes("5617") ? (
            <>
              <Typography className={classes.text}>Wi-Fi SSID:</Typography>
              <Typography className={classes.text}>Wi-Fi Password:</Typography>
            </>
          ) : null}
          <Typography className={classes.text}>Port Eth1:</Typography>
          {address.model.includes("5317") || address.model.includes("5617") ? (
            <>
              <Typography className={classes.text}>Port Eth2:</Typography>
              <Typography className={classes.text}>Port Eth3:</Typography>
              <Typography className={classes.text}>Port Eth4:</Typography>
            </>
          ) : null}
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography className={classes.text2}>{address.package}</Typography>
          <Typography className={classes.text2}>
            {address.isp_owner.name}
          </Typography>
          {address.model.includes("5317") || address.model.includes("5617") ? (
            <>
              <Typography className={classes.text2}>
                {address.wifi_ssid}
              </Typography>
              <Typography className={classes.text2}>
                {address.wifi_password}
              </Typography>
            </>
          ) : null}
          <Typography className={classes.text2}>
            {/* {address.device.eth1} */}
            Internet
          </Typography>
          {address.model.includes("5317") || address.model.includes("5617") ? (
            <>
              <Typography className={classes.text2}>
                {/* {address.device.eth2} */}
                VOIP
              </Typography>
              <Typography className={classes.text2}>
                {/* {address.device.eth3} */}
                Streaming TV
              </Typography>
              <Typography className={classes.text2}>
                {/* {address.device.eth4} */}
                Custom VLAN
              </Typography>
            </>
          ) : null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
