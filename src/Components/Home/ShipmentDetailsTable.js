import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { castTransitEvents } from "../../Utilities/helperFunctions";
import { useTranslation } from "react-i18next";

const ShipmentDetailsTable = ({ rows, isLoading, statusColor }) => {
  let direction = localStorage.getItem("direction");
  const { t } = useTranslation();
  if (isLoading) {
    return <h4>Loading ...</h4>;
  }
  const branchName = rows.map((row) => row?.hub);
  const currentStatus = rows.map((row) => row?.reason);
  const newRaws = castTransitEvents(rows);
  const tableHead = ["Branch", "Date", "Time", "Details"];

  const tableDirectionStyle = {
    fontFamily: "Cairo !important",
    direction: direction,
    align: `${direction === "rtl" ? "right" : "left"}`,
    textAlign: `${direction === "rtl" ? "right" : "left"}`,
  };
  
  return (
    <div sx={tableDirectionStyle}>
      <div sx={tableDirectionStyle}>
        <h3>{t("Shipment Details")}</h3>
      </div>
      <TableContainer component={Paper} sx={tableDirectionStyle}>
        <Table
          sx={{ minWidth: 650, ...tableDirectionStyle }}
          aria-label="simple table"
        >
          <TableHead
            sx={{ backgroundColor: "#FBFBFB", ...tableDirectionStyle }}
          >
            <TableRow sx={tableDirectionStyle}>
              {tableHead.map((head) => (
                <TableCell key={head} sx={tableDirectionStyle} >
                  {t(head)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {newRaws?.map((row, index) => (
              <TableRow
                key={row.time}
                sx={{ "&:last-child td, &:last-child th": { border: 0  , }  }}
              >
                <TableCell sx={tableDirectionStyle}>
                  {t(branchName[3])}
                </TableCell>
                <TableCell sx={tableDirectionStyle}>
                  {t(row.fullYearFormatted)}
                </TableCell>
                <TableCell sx={tableDirectionStyle}>{t(row.time)}</TableCell>
                <TableCell sx={tableDirectionStyle}>
                  {t(row.details)}
                  <p style={{ display: "block", color: statusColor ,}}>
                    {t(currentStatus[index])}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShipmentDetailsTable;
