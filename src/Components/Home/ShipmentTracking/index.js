import React  from "react";
import { dateFormatting} from "../../../Utilities/helperFunctions";
import ShipmentProgress from "./ShipmentProgress";
import { Box , Divider} from "@mui/material";
import { useTranslation } from 'react-i18next';

const ShipmentTracking = ({data , statusColor , match}) => {
    const status = data?.CurrentStatus?.state.replace(/_/g, " ")
    const {formattedDateString : lastUpdated} = dateFormatting(data?.CurrentStatus?.timestamp)
    const {fullYearFormatted : deliveryTime} = dateFormatting(data?.PromisedDate)
    const { t } = useTranslation();

    let direction = localStorage.getItem('direction')
    const paragraphStyle = {color: "#A8A8A8"}
  return (
    <Box
      sx={{
        border: "1px solid #A8A8A8",
        borderRadius: "5px",
        marginTop: "60px",
        direction : direction,
        overflow : 'auto'
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          fontSize : `${match ? '12px' : '22px'}`,
          direction : direction,
        }}
      >
        <Box>
          <p style={paragraphStyle}>
            {t("Delivery Number")} {data?.TrackingNumber}
          </p>
          <h5 style={{ color: statusColor, textTransform: "capitalize" }}>
            {t(status)}
          </h5>
        </Box>
        <Box>
          <p style={paragraphStyle}>{t("Last Update")}</p>
          <h5>{lastUpdated}</h5>
        </Box>
        <Box>
          <p style={paragraphStyle}>{t('Trader Name')}</p>
          <h5>{data?.provider}</h5>
        </Box>
        <Box>
          <p style={paragraphStyle}>{t('Delivery time within')}</p>
          {data?.PromisedDate ? (<h5>{deliveryTime}</h5>) : (<h5>-----</h5>)}
        </Box>
      </Box>
      <Divider />

      <Box sx={{ padding: "20px" , overflow : 'hidden'}}>
        <ShipmentProgress match={match} direction={direction} status={status} statusColor={statusColor}/>
      </Box>

    </Box>
  );
};

export default ShipmentTracking;
