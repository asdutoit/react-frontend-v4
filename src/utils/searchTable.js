import React from "react";
import TextField from "@material-ui/core/TextField";

export default function SearchTable(props) {
  return (
    <form noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Search"
        value={props.filterInput}
        onChange={props.handleFilterChange}
      />
    </form>
  );
}
