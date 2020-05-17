import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import blueFigureSmall from "../../img/blue_figure_small.svg";
import greenFigure from "../../img/green_figure.svg";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350
  }
}));

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    font-size: 20px;
    color: #fdcd39;
    font-family: Akrobat;
    font-weight: 800;
    margin-bottom: 20px;
  }
  .MuiFormLabel-root.Mui-error {
    color: #f48636;
  }
  .MuiFormLabel-asterisk.Mui-error {
    color: #f48636;
  }
  .MuiFormHelperText-root.Mui-error {
    color: #f48636;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .MuiInput-underline.Mui-error:after {
    border-bottom-color: #f48636;
  }
  .MuiInputLabel-root {
    color: #fff;
    font-size: 20px;
    font-family: Akrobat;
    font-weight: 700;
  }
  .MuiInputLabel-root.Mui-focused {
    color: #fff;
  }
  .MuiInput-underline::before {
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }
  .MuiInput-underline:hover:not(.Mui-disabled)::before {
    border-bottom-color: white;
  }
  .MuiInput-underline::after {
    border-bottom-color: #fdcd39;
  }
`;

const StyledTextFieldMobile = styled(TextField)`
  .MuiInputBase-root {
    font-size: 30px;
    color: #fdcd39;
    font-family: Akrobat;
    font-weight: 800;
    margin-bottom: 20px;
  }
  .MuiFormLabel-root.Mui-error {
    color: #f48636;
  }
  .MuiFormLabel-asterisk.Mui-error {
    color: #f48636;
  }
  .MuiFormHelperText-root.Mui-error {
    color: #f48636;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .MuiInput-underline.Mui-error:after {
    border-bottom-color: #f48636;
  }
  .MuiInputLabel-root {
    color: #fff;
    font-size: 30px;
    font-family: Akrobat;
    font-weight: 700;
  }
  .MuiInputLabel-root.Mui-focused {
    color: #fff;
  }
  .MuiInput-underline::before {
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }
  .MuiInput-underline:hover:not(.Mui-disabled)::before {
    border-bottom-color: white;
  }
  .MuiInput-underline::after {
    border-bottom-color: #fdcd39;
  }
`;

const ContactUsStyles = styled.div`
  background-image: url(${blueFigureSmall});
  background-repeat: no-repeat;
  background-position-x: 299px;
  background-size: 900px;
  height: 905px;
  width: 1200px;
  margin: auto;
  display: flex;
  justify-content: center;
  background-color: transparent;
  form {
    margin-top: 135px;
  }
  .contactInfo {
    background-image: url(${greenFigure});
    background-repeat: no-repeat;
    height: 688px;
    width: 523px;
    margin-top: 129px;
    margin-right: 40px;
    .title {
      margin-top: 6.9rem;
      height: 89px;
      font-family: Akrobat;
      font-size: 89px;
      font-weight: 100;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #ffffff;
      margin-bottom: 5rem;
    }
    p {
      color: #fff;
      text-align: center;
      margin: 2rem;
    }
    a {
      color: #fff;
      text-decoration: none;
      text-align: center;
      margin: 2rem;
    }
  }
  .social-container {
    margin-top: 200px;
    display: flex;
    justify-content: center;
  }
  .icon-small {
    fill: #3776ff;
    fill: #fff;
    width: 28px;
    height: 28px;
  }
  .contactForm {
    margin-top: 50px;
    margin-right: 150px;
    width: 400px;
  }
  .contactForm--loading {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-right: 150px;
    width: 400px;
  }
`;

export { useStyles, ContactUsStyles, StyledTextField, StyledTextFieldMobile };
