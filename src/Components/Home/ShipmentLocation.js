import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from 'react-i18next';

const ShipmentLocation = ({ data, isLoading }) => {
  const { t } = useTranslation();
  let direction = localStorage.getItem('direction')
  if (isLoading) {
    return <h4>Loading ...</h4>;
  }
  const addressToDeliver = data?.map((row) => row?.hub);

  return (
    <div>
      <div style={{direction: direction}}>
        <h3>{t("Shipment Address")}</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ backgroundColor: "#FBFBFB", padding: "50px" }}>
          <h3 style={{ textAlign: "center" }}>{t(addressToDeliver[3] || addressToDeliver[5])}</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            border: "1px solid grey",
            borderRadius: "5px",
            marginTop: "15px",
            padding: "10px",
          }}
        >
          <div style={{width : '50%'}}>
            <img
            width={100}
              src="https://cdni.iconscout.com/illustration/premium/thumb/question-mark-10001644-8119529.png"
              alt="report problem "
            />
          </div>
          <div>
            <h3>{t("Any Problem in Your Shipment ?!")}</h3>
            <Button
              sx={{
                backgroundColor: "red !important",
                width: "100%",
                borderRadius: "10px",
              }}
              variant="contained"
            >
              {t("Report A Problem")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentLocation;
