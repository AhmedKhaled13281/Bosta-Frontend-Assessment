import React, { useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Menu,
  Button,
  TextField,
  FormControl,
  Popover,
  Select,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import { searchSliceAction } from "../Store/searchReducer";
import {useDispatch} from 'react-redux'
import { useTranslation } from 'react-i18next';

const pages = ["Home", "Pricing", "Sales"];

const NavBar = ({match}) => {
  const searchInputRef = useRef('')
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [langValue, setLangValue] = useState(localStorage.getItem('language'));
  const [anchorPop, setAnchorPop] = useState(null);
  const dispatch = useDispatch()
  const { t , i18n } = useTranslation();
  
  // Handle Popover Component
  const handlePopoverOpen = (event) => {
    setAnchorPop(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorPop(null);
  };

  // Handle Search Input Value
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchInputValue = searchInputRef.current.value;
    dispatch(searchSliceAction.setSearchInput(searchInputValue))
    handlePopoverClose()
  }

  // Handle Language Drop Down
  const handleDropDownChange = (event) => {
    setLangValue(event.target.value);
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
    localStorage.setItem('direction' , langValue === 'en' ? 'rtl' : 'ltr')
  };

  // Handle Nav Menu (The Nav Bar Headers in Small Screens)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  let direction = localStorage.getItem('direction')

  return (
    <div style={{fontFamily : "Cairo !important"}}>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "white", color: "black" , }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters style={{ direction: direction  , }}>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", direction: direction },
              }}
            >
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu} style={{fontWeight : 'bold'}}>
                    <Typography
                      sx={{  fontSize : `${match ? '14px' : '22px'}` , fontWeight : 'bold' , fontFamily : "Cairo !important"}}
                      textAlign="center"
                    >
                      {t(page)}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box>
              {langValue === "en" ? (
                <img
                  src="https://business.bosta.co/943f9ca6c0d5f0964ad49326c8da07f2.svg"
                  width={120}
                  alt="logo "
                />
              ) : (
                <img
                  src="https://bosta.co/a6d7cb1c389cd7727e0b9fb85060da24.svg"
                  width={120}
                  alt="logo "
                />
              )}
            </Box>

            {/* NavBar Headers (Pages) */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", justifyContent: "center" },
              }}
            >
              {pages.map((page) => (
                <Typography
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "flex",
                    marginRight: "30px",
                    fontWeight: "700",
                    fontSize : `${match ? '14px' : '22px'}`,
                    "&:hover": {
                      color: "#E30613",
                      cursor: "pointer",
                    },
                    fontFamily : "Cairo !important"
                  }}
                >
                  {t(page)}
                </Typography>
              ))}
            </Box>

            {/* Search Input & Toggle Language */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{ display: "inline-block" , margin : '10px'}}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize : `${match ? '14px' : '22px'}`,
                    color: anchorPop ? "#E30613" : "inherit",
                    direction : direction,
                    fontFamily : "Cairo !important"
                  }}
                >
                  {t("Track Shipment")}
                </Typography>
                <Popover
                  style={{
                    marginTop: "20px",
                    borderRadius: "10px",
                    direction : direction
                  }}
                  open={Boolean(anchorPop)}
                  anchorEl={anchorPop}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <p style={{ paddingLeft: "15px" , paddingRight : '15px'}}>
                    {t("Track Your Shipment")}
                  </p>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSearchSubmit}
                    style={{padding: "15px"}}
                  >
                    <TextField
                      type="number"
                      placeholder={t("Tracking No.")}
                      variant="outlined"
                      size="small"
                      id="filled-start-adornment"
                      inputRef={searchInputRef}
                      inputProps={{
                        min: 0,
                      }}
                      style={{fontFamily : "Cairo !important"}}
                    />
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: "red !important",
                        width: "10px",
                        height: "40px",
                        marginBottom : '10px'
                      }}
                    >
                      <SearchIcon sx={{ color: "white", fontSize: "35px" }} />
                    </Button>
                  </Box>
                </Popover>
              </Box>

              {/* Language Toggle */}
              <FormControl variant="standard">
                <Select
                  value={langValue}
                  onChange={handleDropDownChange}
                  sx={{
                    marginLeft: "20px",
                    fontWeight: "500",
                    fontSize: "20px",
                    "&:hover": {
                      color: "#E30613",
                      cursor: "pointer",
                    },
                    fontFamily : "Cairo !important"
                  }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ar">Arabic</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default NavBar;
