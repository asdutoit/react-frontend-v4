import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

const styles = {
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // borderRadius: 3,
    // border: 0,
    color: "#f44336",
    // height: 48,
    // padding: "0 3px",
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
};

function customNotDoneIcon(props) {
  const { classes, children, className, ...other } = props;

  return (
    <ClearIcon className={clsx(classes.root, className)} {...other}>
      {children || "class names"}
    </ClearIcon>
  );
}

customNotDoneIcon.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(customNotDoneIcon);
