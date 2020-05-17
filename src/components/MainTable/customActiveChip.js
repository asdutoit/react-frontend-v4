import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const styles = {
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    background: "rgba(76, 175, 80, 0.08)",
    borderRadius: 3,
    // border: 0,
    color: "#4caf50",
    // height: 48,
    width: "120px",
    padding: "0 8px",
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
};

function customActiveChip(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Chip className={clsx(classes.root, className)} {...other}>
      {/* {children || "class names"} */}
    </Chip>
  );
}

customActiveChip.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(customActiveChip);
