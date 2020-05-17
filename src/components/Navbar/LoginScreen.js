import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import { StyledTextFieldMobile } from "./ComponentStyles/ContactUsStyles";
const LoginScreenStyle = styled.div`
  position: fixed;
  top: 42px;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  height: 500px;
  width: 100%;
  z-index: 99;
  background-color: #1980ba;
  clip-path: polygon(0 0, 100% 0, 100% 95%, 0% 100%);
`;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
    // flexWrap: "wrap"
  }
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: 350
  // }
}));

const INITIAL_STATE = {
  name: "",
  surname: "",
  cell: "",
  message: "",
  email: ""
};

export default function MenuPopup() {
  const classes = useStyles();
  const [vals, setVals] = React.useState(INITIAL_STATE);

  function handleChange(event) {
    setVals({
      ...vals,
      [event.target.name]: event.target.value
    });
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   console.log(vals);
  // }

  return (
    <LoginScreenStyle>
      <div className="form__item">
        <Formik
          initialValues={INITIAL_STATE}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <>
              <form
                htmlFor="loginform"
                onSubmit={handleSubmit}
                className={classes.container}
              >
                <StyledTextFieldMobile
                  label="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {
                  <span
                    style={{
                      color: "#f48636",
                      fontWeight: "bold",
                      fontFamily: "Akrobat"
                    }}
                  >
                    {errors.email && touched.email && errors.email}
                  </span>
                }
              </form>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </>
          )}
        </Formik>
      </div>
    </LoginScreenStyle>
  );
}
