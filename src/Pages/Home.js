import React from "react";
import NavBar from "../Layout/NavBar";
import ShipmentTracking from "../Components/Home/ShipmentTracking.js";
import ShipmentDetailsTable from "../Components/Home/ShipmentDetailsTable.js";
import ShipmentLocation from "../Components/Home/ShipmentLocation.js";
import { Container, Grid } from "@mui/material";
import { currentStateColor } from "../Utilities/helperFunctions";
import useSwr from "swr";
import { useSelector } from "react-redux";
import { useTranslation  } from 'react-i18next';
import { getShipmentById } from "../Utilities/apiUrls.js";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const { searchValue } = useSelector((state) => state.searchReducer);
  const { data, isLoading } = useSwr(
    `${getShipmentById}${searchValue}`,
    fetcher
  );
  const statusColor = currentStateColor(data?.CurrentStatus?.state);
  let direction = localStorage.getItem('direction')
  const {t} = useTranslation()

  // Responsive Design
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <NavBar match={match} />
      <Container maxWidth="lg">
        {!data || data?.error ? (
          <h2 style={{ textAlign: "center" }}>
            {data?.error ? <p>{t(data?.error)}</p> : t("Please Enter The ID of your Shipment")}
          </h2> 
        ) : (
          <>
            <ShipmentTracking data={data} statusColor={statusColor} match={match}/>
            <Grid container spacing={2} sx={{ mt: 3 , flexDirection: direction === 'rtl' ? 'row' : 'row-reverse'}}>
              <Grid   item md={8} xs={12}>
                <ShipmentDetailsTable
                  direction={direction}
                  rows={data?.TransitEvents}
                  isLoading={isLoading}
                  statusColor={statusColor}
                />
              </Grid>
              <Grid item md={4} xs={12} >
                <ShipmentLocation
                  data={data?.TransitEvents}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;
