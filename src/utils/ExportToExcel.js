import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import SaveIcon from "@material-ui/icons/Save";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
}));

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const exportToCSV = (csvData, fileName) => {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = {
    Sheets: {
      data: ws,
    },
    SheetNames: ["data"],
  };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });
  const data = new Blob([excelBuffer], {
    type: fileType,
  });
  FileSaver.saveAs(data, fileName + fileExtension);
};

export const ExportToExcel = ({ csvData, fileName }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      // size="small"
      className={classes.button}
      startIcon={<SaveIcon />}
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      Excel
    </Button>
  );
};
