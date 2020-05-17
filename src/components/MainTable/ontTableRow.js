import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import CustomActiveChip from "./customActiveChip";
import CustomDoneIcon from "./customDoneIcon";
import CustomInactiveChip from "./customInactiveChip";
import CustomNotDoneIcon from "./customNotDoneIcon";
import LinearProgress from "@material-ui/core/LinearProgress";
import DeviceStatus from "./DeviceStatus";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
// import Link from "@material-ui/core/Link";
// function provStateFunc(row) {
//   return row.provisioned === "Provisioned" ? true : false;
// }

function OntTableRow({ row, index, isItemSelected, handleClick }) {
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={1}
      key={row._id}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event) => handleClick(event, row._id)}
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row">
        {row.complex}
      </TableCell>
      <TableCell align="right">{row.unit_no}</TableCell>
      <TableCell align="left">{row.resident_name}</TableCell>
      <TableCell align="left">{row.resident_surname}</TableCell>
      <TableCell align="left">{row.package}</TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="left">{row.serial_number}</TableCell>
      <TableCell align="left">
        {row.provisioned === true ? (
          <CustomActiveChip
            label="Provisioned"
            icon={<CustomDoneIcon />}
            size="small"
          />
        ) : (
          <CustomInactiveChip
            label="Inactive"
            icon={<CustomNotDoneIcon />}
            size="small"
          />
        )}
      </TableCell>
      <TableCell align="left">
        {
          <DeviceStatus
            ontSN={row.serial_number}
            unit_no={row.unit_no}
            complex={row.complex}
          />
        }
      </TableCell>
      <TableCell align="left">
        <Link to={`/editont/${row._id}`} style={{ textDecoration: "none" }}>
          <Button variant="outlined">EDIT</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}

const MemoizedOntTableRow = React.memo(OntTableRow);

export default MemoizedOntTableRow;
