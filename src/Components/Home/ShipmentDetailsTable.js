import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  castTransitEvents,
} from "../../Utilities/helperFunctions";
import { useTranslation } from 'react-i18next';

const ShipmentDetailsTable = ({ rows, isLoading, statusColor }) => {
  let direction = localStorage.getItem('direction')
  const { t } = useTranslation();
  if (isLoading) {
    return <h4>Loading ...</h4>;
  }
  const branchName = rows.map((row) => row?.hub);
  const currentStatus = rows.map((row) => row?.reason);
  const newRaws = castTransitEvents(rows);
  const tableHead = ["Branch", "Date", "Time", "Details"];
  const direc = {align : `${direction === 'rtl' ? "right" : "left"}` , textAlign : `${direction === 'rtl' ? "right" : "left"}` , fontFamily : "Cairo !important"}

  return (
    <div style={direc}>
      <div sx={direc}>
        <h3>{t("Shipment Details")}</h3>
      </div>
      <TableContainer component={Paper} >
        <Table sx={{direction : direction , minWidth: 650 , align : `${direction === 'rtl' ? "right" : "left"}` , textAlign: `${direction === 'rtl' ? "right" : "left"}`}} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#FBFBFB"  , align : `${direction === 'rtl' ? "right" : "left"}` , textAlign: `${direction === 'rtl' ? "right" : "left"}`}}>
            <TableRow style={direc}>
              {tableHead.map((head) => (
                <TableCell key={head} style={direc}>{t(head)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {newRaws?.map((row, index) => (
              <TableRow
                key={row.time}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } ,fontFamily : "Cairo !important" , direction : direction ,align :  `${direction === 'rtl' ? "right" : "left"}` , textAlign:  `${direction === 'rtl' ? "right" : "left"}`}}
              >
                <TableCell style={{fontFamily : "Cairo !important"}}>{t(branchName[3])}</TableCell>
                <TableCell >{t(row.fullYearFormatted)}</TableCell>
                <TableCell>{t(row.time)}</TableCell>
                <TableCell sx={{fontFamily : "Cairo !important" , direction : direction ,align :  `${direction === 'rtl' ? "right" : "left"}` , textAlign:  `${direction === 'rtl' ? "right" : "left"}`}}>
                  {t(row.details)}
                  <p style={{ display: "block", color: statusColor }}>
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
