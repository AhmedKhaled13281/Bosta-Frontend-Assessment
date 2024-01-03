import React, { useState } from "react";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import SaveIcon from "@mui/icons-material/Save";
import Check from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/system";
import { useTranslation } from 'react-i18next';

const ColorlibConnector = styled(StepConnector)(({ theme, statusColor , direction}) => {
  return {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
      backgroundColor: statusColor,
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
      backgroundColor: statusColor,
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 5,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,

      // Handle RTL direction directly in CSS
      [theme.breakpoints.up('md')]: {
        marginRight: `${direction === 'rtl' ? '-280px' : '0px'}`,
        marginLeft: `${direction === 'rtl' ? '280px' : '0px'}`,
      },
    },

  };
});

const ColorlibStepIconRoot = styled("div")(
  ({ theme, ownerState, statusColor , direction}) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      width: 50,
      height: 50,
      backgroundColor: statusColor,
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundColor: statusColor,
    }),
  })
);

function ColorlibStepIcon(props) {
  const {direction ,  active, completed , totalSteps} = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      statusColor={props.statusColor}
      direction={direction}
    >
      {active && !totalSteps ? <AirportShuttleIcon style={{transform: `${direction === 'rtl' ? 'scaleX(-1)' : 'none'}`}}/> : totalSteps  ? <Check /> :  completed ? <Check />  : <SaveIcon />}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "TICKET CREATED",
  "PACKAGE RECEIVED",
  "OUT FOR DELIVERY",
  "DELIVERED",
];

const ShipmentProgress = ({direction ,  status, statusColor , match}) => {
  const { t } = useTranslation();

  let active = 0;
  let doneAll = false
  if (status === "CANCELLED") {
    active = 1;
  } else if (status === "DELIVERED TO SENDER") {
    active = 2;

  } else {
    active = 3;
    doneAll = true
  }

  return (
    <div>
      <Box style={{width : '100%'}}>
        <Stepper
          alternativeLabel
          activeStep={active}
          connector={
            <ColorlibConnector direction={direction} statusColor={statusColor} active={active} />
          }
        >
          {steps.map((label, index) => (
            <Step key={label} >
              <StepLabel
                StepIconComponent={() => (
                  <ColorlibStepIcon
                    direction={direction}
                    active={index === active}
                    completed={index < active}
                    statusColor={statusColor}
                    totalSteps={doneAll}
                  />
                )}
              >
                <p style={{fontSize : `${match ? '14px' : '18px'}` , fontWeight : "700" }}>{t(label)}</p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

      </Box>
    </div>
  );
};

export default ShipmentProgress;
