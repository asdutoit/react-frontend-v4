import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const styles = {
  root: {
    background: "rgba(244, 67, 54, 0.08)",
    borderRadius: 3,
    color: "#f44336",
    width: "120px",
    padding: "0 8px",
  },
};

function customInactiveChip(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Chip className={clsx(classes.root, className)} {...other}>
      {/* {children || "class names"} */}
    </Chip>
  );
}

customInactiveChip.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(customInactiveChip);
