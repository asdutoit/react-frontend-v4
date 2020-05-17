import React, { useState } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { DropzoneDialog } from "material-ui-dropzone";
import SaveIcon from "@material-ui/icons/Save";
import DisplayImages from "./DisplayImages";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: "none",
  },
}));

const OntSchema = yup.object().shape({
  serial_number: yup
    .string()
    .required("GPON/ONT Serial Number is required")
    .test("len", "Must be exactly 16 characters", (val) => val.length === 16),
  model: yup.string().required("Model Required"),
  // optical_signal: yup.string(),
  // package: yup
  //   .string()
  //   .required()
  //   .test("len", "Must choose a value", (val) => val.length === 1),
});

const CssFormControl = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#73c59e",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      // borderColor: "#737373",
    },
    "& .MuiFormLabel-root": {
      color: "#18a5e1",
    },
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: "#73c59e",
        // textAlign: "left",
      },
      "&:hover fieldset": {
        borderColor: "#73c59e",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#73c59e",
      },
    },
  },
})(FormControl);

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#73c59e",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      // borderColor: "#737373",
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

export default function OntAndServiceForm({
  address,
  handleChange,
  currentOnt,
  setAddress,
}) {
  const [imageUrls, setImageUrls] = useState(address.images || []);
  const [open, setOpen] = useState(false);
  const { register, errors } = useForm({
    mode: "onBlur",
    validationSchema: OntSchema,
  });
  const [savingInProgress, setSavingInProgress] = useState(false);
  const classes = useStyles();

  const handleImageUpload = async (img) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "LighttreeReactv4");
    data.append("cloud_name", "dthxtztu6");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dthxtztu6/image/upload",
      data
    );
    return res.data.url;
  };

  console.log("ADDRESS: ", address);

  const handleUpload = async (files) => {
    let urls = [];
    files.map(async (image) => {
      setSavingInProgress(true);
      const url = await handleImageUpload(image);
      urls.push(url);
      setImageUrls([...imageUrls, ...urls]);
      setAddress({ ...address, images: [...address.images, ...urls] });
      setSavingInProgress(false);
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ONT and Service
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CssTextField
            error={errors.serial_number ? true : null}
            helperText={
              errors.serial_number ? errors.serial_number.message : null
            }
            variant="outlined"
            id="serial_number"
            name="serial_number"
            label="GPON SN"
            fullWidth
            autoComplete="gponsn"
            inputRef={register({ required: true })}
            defaultValue={address.serial_number}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CssTextField
            variant="outlined"
            id="manufacturer"
            name="manufacturer"
            label="Manufacturer"
            fullWidth
            autoComplete="manufacturer"
            inputRef={register}
            defaultValue={address.manufacturer}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CssTextField
            error={errors.model ? true : null}
            helperText={errors.model ? errors.model.message : null}
            variant="outlined"
            id="model"
            name="model"
            label={address.type === "" ? "Model" : "Model - " + address.type}
            fullWidth
            autoComplete="model"
            inputRef={register({ required: true })}
            defaultValue={address.model}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CssTextField
            error={errors.optical_signal ? true : null}
            helperText={errors.optical_signal ? "First Name Required" : null}
            variant="outlined"
            id="optical_signal"
            name="optical_signal"
            label="Optical Signal"
            fullWidth
            autoComplete="optical_signal"
            inputRef={register}
            defaultValue={address.optical_signal}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CssFormControl
            variant="outlined"
            className={classes.formControl}
            error={address.package === "" ? true : false}
            required
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Bandwidth Profile
            </InputLabel>
            <Select
              labelId="package"
              id="package"
              name="package"
              value={address.package}
              onChange={handleChange}
              inputRef={register}
              label="Bandwidth Profile"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"4Mbps Down | 2Mbps Up"}>
                4Mbps Down | 2Mbps Up
              </MenuItem>
              <MenuItem value={"10Mbps Down | 5Mbps Up"}>
                10Mbps Down | 5Mbps Up
              </MenuItem>
              <MenuItem value={"20Mbps Down | 10Mbps Up"}>
                20Mbps Down | 10Mbps Up
              </MenuItem>
              <MenuItem value={"50Mbps Down | 25Mbps Up"}>
                50Mbps Down | 25Mbps Up
              </MenuItem>
              <MenuItem value={"100Mbps Down | 50Mbps Up"}>
                100Mbps Down | 50Mbps Up
              </MenuItem>
              <MenuItem value={"200Mbps Down | 100Mbps Up"}>
                200Mbps Down | 100Mbps Up
              </MenuItem>
              <MenuItem value={"400Mbps Down | 100Mbps Up"}>
                400Mbps Down | 100Mbps Up
              </MenuItem>
              <MenuItem value={"1000Mbps Down | 200Mbps Up"}>
                1000Mbps Down | 200Mbps Up
              </MenuItem>
            </Select>
            {address.package === "" ? (
              <FormHelperText>Please select Bandwidth Profile</FormHelperText>
            ) : null}
          </CssFormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <CssFormControl
            variant="outlined"
            className={classes.formControl}
            error={address.isp_owner === "" ? true : false}
            required
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Internet Service Provider
            </InputLabel>
            <Select
              labelId="isp_owner"
              id="isp_owner"
              name="isp_owner"
              value={
                address.isp_owner._id
                  ? address.isp_owner._id
                  : address.isp_owner
              }
              onChange={handleChange}
              inputRef={register}
              label="Internet Service Provider"
              // defaultValue={"None"}
            >
              <MenuItem value={"5bed6d4e22b3ecc5e2929c50"}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"5bed6d4e22b3ecc5e2929c4f"}>Snowball</MenuItem>
              <MenuItem value={"5bed6d4e22b3ecc5e2929c4d"}>
                Sonic Telecoms
              </MenuItem>
              <MenuItem value={"5e5676db7cfad80a59481408"}>SuperSonic</MenuItem>
              <MenuItem value={"5bed6d4e22b3ecc5e2929c4e"}>Ultrafast</MenuItem>
              <MenuItem value={"5ec0278357c09c029fa7831d"}>
                Evolve Internet
              </MenuItem>
            </Select>
            {address.isp_owner === "" ? (
              <FormHelperText>Please select ISP</FormHelperText>
            ) : null}
          </CssFormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          {savingInProgress ? <CircularProgress /> : null}
          {imageUrls ? (
            <Grid>
              <DisplayImages
                images={imageUrls}
                setImageUrls={setImageUrls}
                ontId={address._id}
                setAddress={setAddress}
              />
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid>
            <DropzoneDialog
              acceptedFiles={["image/*"]}
              cancelButtonText={"cancel"}
              submitButtonText={"submit"}
              maxFileSize={5000000}
              open={open}
              onClose={() => setOpen(false)}
              onSave={(files) => {
                // setImages(files)
                handleUpload(files);
                setOpen(false);
              }}
              showPreviews={true}
              showFileNamesInPreview={true}
              // onChange={(files) => setImages(files)}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => setOpen(true)}
            // onClick={handleUpload}
          >
            Add Images
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
