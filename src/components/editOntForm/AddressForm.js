import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#73c59e",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      // borderColor: "purple",
    },
    "& .MuiFormLabel-root": {
      color: "#18a5e1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: "#73c59e",
      },
      "&:hover fieldset": {
        borderColor: "#73c59e",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#73c59e",
      },
    },
  },
})(TextField);

export default function AddressForm({
  address,
  handleChange,
  register,
  errors,
  currentOnt,
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CssTextField
            error={errors.resident_name ? true : null}
            helperText={errors.resident_name ? "First Name Required" : null}
            variant="outlined"
            id="resident_name"
            name="resident_name"
            label="First name"
            fullWidth
            autoComplete="fname"
            inputRef={register({ required: true })}
            defaultValue={address.resident_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            error={errors.resident_surname ? true : null}
            helperText={errors.resident_surname ? "Last Name Required" : null}
            variant="outlined"
            id="resident_surname"
            name="resident_surname"
            label="Last name"
            fullWidth
            autoComplete="lname"
            inputRef={register({ required: true })}
            defaultValue={address.resident_surname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            error={errors.resident_cell ? true : null}
            helperText={
              errors.resident_cell ? errors.resident_cell.message : null
            }
            variant="outlined"
            id="resident_cell"
            name="resident_cell"
            label="Cellphone Number"
            fullWidth
            autoComplete="cell"
            inputRef={register({ required: true })}
            defaultValue={address.resident_cell}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            error={errors.resident_email ? true : null}
            helperText={
              errors.resident_email ? errors.resident_email.message : null
            }
            defaultValue={address.resident_email}
            onChange={handleChange}
            variant="outlined"
            id="resident_email"
            name="resident_email"
            label="Email Address"
            fullWidth
            autoComplete="email"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CssTextField
            error={errors.unit_no ? true : null}
            helperText={errors.unit_no ? "Unit Number Required" : null}
            defaultValue={address.unit_no}
            onChange={handleChange}
            variant="outlined"
            id="unit_no"
            name="unit_no"
            label="Unit Number"
            fullWidth
            autoComplete="unit_no"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CssTextField
            error={errors.complex ? true : null}
            helperText={errors.complex ? "Name Required" : null}
            defaultValue={address.complex}
            onChange={handleChange}
            variant="outlined"
            id="complex"
            name="complex"
            label="Security Estate"
            fullWidth
            autoComplete="billing address-line2"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            error={errors.street ? true : null}
            helperText={errors.street ? "Street Invalid" : null}
            defaultValue={address.street}
            onChange={handleChange}
            variant="outlined"
            id="street"
            name="street"
            label="Street"
            fullWidth
            autoComplete="billing address-level2"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            error={errors.suburb ? true : null}
            helperText={errors.suburb ? "Suburb Required" : null}
            defaultValue={address.suburb}
            onChange={handleChange}
            variant="outlined"
            id="suburb"
            name="suburb"
            label="Suburb"
            fullWidth
            autoComplete="billing address-level2"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            error={errors.city ? true : null}
            helperText={errors.city ? "City Required" : null}
            defaultValue={address.city}
            onChange={handleChange}
            variant="outlined"
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            defaultValue={address.state}
            onChange={handleChange}
            variant="outlined"
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            defaultValue={address.zip}
            onChange={handleChange}
            variant="outlined"
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            error={errors.country ? true : null}
            helperText={errors.country ? "Email Required" : null}
            defaultValue={address.country}
            onChange={handleChange}
            variant="outlined"
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            inputRef={register}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
