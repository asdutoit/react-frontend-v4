import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, styled } from "@material-ui/core/styles";
import { ExportToExcel } from "../../utils/ExportToExcel";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchFunction from "../../utils/searchTable";

const StyledToolbar = styled(Toolbar)({
  // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  background: "#fdcd3a",
  // color: "#fff",
  // fontFamily: "Akrobat-regular",
});

const headCells = [
  {
    id: "complex",
    numeric: false,
    disablePadding: false,
    label: "Complex",
  },
  { id: "unit_no", numeric: true, disablePadding: false, label: "Unit No" },
  {
    id: "resident_name",
    numeric: false,
    disablePadding: false,
    label: "Resident Name",
  },
  {
    id: "resident_surname",
    numeric: false,
    disablePadding: false,
    label: "Resident Surname",
  },
  { id: "package", numeric: false, disablePadding: false, label: "Package" },
  // { id: "suburb", numeric: false, disablePadding: false, label: "suburb" },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "ISP",
  },
  {
    id: "serial_number",
    numeric: false,
    disablePadding: false,
    label: "ONT SN",
  },
  {
    id: "provisioned",
    numeric: false,
    disablePadding: false,
    label: "Provision Status",
  },

  {
    id: "devicestatus",
    numeric: false,
    disablePadding: false,
    label: "Device Status",
  },
  { id: "action", numeric: false, disablePadding: false, label: "Action" },
];

const StyledTableHead = styled(TableHead)({
  background: "#fdcd3a",
});

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <StyledTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </StyledTableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const filename = "Lighttree Report";

  return (
    <StyledToolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Lighttree Provisioning Portal
          </Typography>
          <ExportToExcel csvData={props.rows} fileName={filename} />
          <SearchFunction
            handleFilterChange={props.handleFilterChange}
            filterInput={props.filterInput}
          />
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </StyledToolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const MemoizedEnhancedTableHead = React.memo(EnhancedTableHead);
const MemoizedEnhancedTableToolbar = React.memo(EnhancedTableToolbar);

// export { EnhancedTableHead, EnhancedTableToolbar };
export { MemoizedEnhancedTableHead, MemoizedEnhancedTableToolbar };
