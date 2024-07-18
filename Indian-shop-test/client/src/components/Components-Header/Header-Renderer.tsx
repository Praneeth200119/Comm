import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, InputBase, Divider, Button, Grid, Container } from '@material-ui/core';
import { ShoppingCart, ArrowDropDown} from '@mui/icons-material';
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawerRenderer from "../Components-Cart/Cart-Drawer-Renderer";
import { useCategoriesAPI } from "./../../api/productsAPI";

import { useNavigate } from 'react-router-dom';

import apiConfig from "../../api/client/endpoint";
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core';
import LocationSearchRenderer from '../Components-Nav-Bar/Location-Search-Renderer';
import { useAuth } from '../Authentication-Components/Auth';
const BASE_URL = apiConfig.BASE_URL;
import GroceryItemCardRenderer from '../Grocery-Item-Card/Grocery-Item-Card-Renderer';
import { useGetProductsByFilterAPI } from "../../api/productsAPI";
import NavbarRenderer from '../Components-Nav-Bar/Nav-Bar-Renderer';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {red} from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'white',
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 10,
  },
  logo: {
    flexGrow: 1,
    fontFamily: 'Playfair Display',
    fontWeight: 900,
    fontSize: 22,
    color: '#0D3823',
    textTransform: 'capitalize',
    marginLeft: theme.spacing(2), // Add margin left for logo
  },
  menuContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  menuContainerGreen: {
    display: 'flex',
    alignItems: 'center',
    color:'green'
  },
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  menuItem: {
    display: 'flex',
    justifyContent:'flex-start',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    color: '#323232',
    fontFamily: 'Proxima Nova',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '24px',
    textTransform: 'capitalize'
  },
  categoryMenuItem: {
    display: 'flex',
    justifyContent:'flex-start',
    alignItems: 'center',
    // padding: theme.spacing(1, 2),
    color: '#323232',
    fontFamily: 'Proxima Nova',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '15px',
    textTransform: 'capitalize'
  },
  searchContainer: {
    position: 'relative',
    backgroundColor: '#F2F2F2',
    borderRadius: 6,
    width: 632,
    marginRight: theme.spacing(2)
  },
  searchInput: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: '#909592',
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '24px',
    '&::placeholder': {
      color: '#909592'
    },
    width: 632,
    height: 50
  },
  searchIcon: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#909592',
    width: 14.35,
    height: 14.35,
    right: 10,
    top: '50%',
    paddingRight: 20,
    transform: 'translateY(-50%)'
  },
  cartIcon: {
    marginLeft: theme.spacing(2),
    color: '#0D3823'
  }
}));

const HeaderRenderer = () => {
    //global search of products
    const [searchString,setSearchString]=useState("");
    const [products,setProducts]=useState<any[]>([]);
    const [productsToShow,setProductsToShow]=useState<any[]>([]);
    useEffect(()=>{
        fetchProducts();
      },[]);
    const fetchProducts=async ()=>{
        const productsReceived=await useGetProductsByFilterAPI({});
        setProducts(productsReceived);
        setProductsToShow(productsReceived);
    }
    const handleSearchStringChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const newSearchString=e.target.value;
        setSearchString(newSearchString);
        updateProductsToShow(newSearchString)
    }
    const updateProductsToShow=(searchString:string)=>{
        setProductsToShow(
            products.filter((product)=>{
            return product.Name.toUpperCase().includes(searchString.toLocaleUpperCase());
            })
        )
    }
    //end
  const navigate=useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const auth=useAuth();

  
  const handleCartClose = () => {
    setIsCartOpen(false);
  };
 
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const backToHome=()=>{
    navigate(`/`);
  }
  const handleLogout=()=>{
    auth?.logout();
  }
  return (
    <div className={classes.root}>
      
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img src={`${BASE_URL}images/logo.jpeg`} width="84px" height="46px" onClick={backToHome} style={{cursor:"pointer"}}/>
          <div style={{ width: 151, height: 44, background: '#F2F2F2', alignContent: 'center', position:"relative", left:"-18px", cursor:"pointer"}}
          onClick={backToHome}
          >
            <Typography variant="h1" className={classes.logo}>
              Indian Shop
            </Typography>
          </div>
          <div className={classes.locationContainer}>
            <div className={classes.menuItem}>
              <LocationSearchRenderer />
            </div>
            <ArrowDropDown style={{ color: '#FF6600' }} />
          </div>
          <Divider
            orientation="vertical"
            style={{
              width: 0,
              height: 44,
              marginRight: 20,
              marginLeft: 20,
              transformOrigin: '0 0',
              border: '1px rgba(0, 0, 0, 0.27) solid'
            }}
          />
          {auth?.user?.userRole!="admin" &&
            <div className={classes.searchContainer} style={{flex:1}}>
              <InputBase
                placeholder="Search everything at our store"
                className={classes.searchInput}
                value={searchString}
                onChange={(e)=>{handleSearchStringChange(e)}}
              />
              <div className={classes.searchIcon}>
                <SearchIcon style={{ width: 30, height: 30 }} />
              </div>
            </div>
          }
          {auth?.user?.userRole=="admin" &&
              <div className={classes.menuContainerGreen} style={{flex:1}}>
                <Button style={{color:"blue", fontWeight:'bold'}} onClick={()=>{navigate("/admin")}}>
                  <AdminPanelSettingsIcon />
                  Admin
                </Button>
              </div>
            }
        {!auth?.user &&
            <div className={classes.menuContainerGreen}>
            <Button style={{color:"blue", fontWeight:'bold', marginLeft:"auto"}} onClick={()=>{navigate("/login")}}>
                LOGIN
            </Button>
            </div>
        }
        {auth?.user &&
            <div className={classes.menuContainerGreen}>
            <Button style={{color:"#f44336", fontWeight:'bold', marginLeft:"auto"}} onClick={()=>{handleLogout()}}>
                LOGOUT
            </Button>
            </div>
        }
          {/* <Button to="/login" style={{ marginLeft: "auto" }} className={classes.menuItem}>
            Login
          </Button>
          <Button to="/register" className={classes.menuItem}>
            Register
          </Button> */}
          {/* <IconButton
            aria-label="cart"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <ShoppingCartIcon style={{ color: '#0D3823' }} onClick={handleCartClick} />
            <CartDrawerRenderer isOpen={isCartOpen} onClose={handleCartClose} />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      
        <NavbarRenderer />
      
      
      {
        searchString.length>0 &&
        <>
            <Divider
                orientation="horizontal"
                style={{
                    marginTop:"10px",
                    width: '100%',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            />
            <Typography style={{margin:"10px",color:"green"}}>
                Total Products Filtered: {productsToShow.length}
            </Typography>
            <Container maxWidth="lg" style={{marginTop:"20px",marginBottom:"20px"}}>
                <Grid container spacing={3}>
                    {productsToShow.map((product,index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                        <GroceryItemCardRenderer product={product}/>
                    </Grid>
                    ))}
                </Grid>
            </Container>
            <Divider
                orientation="horizontal"
                style={{
                    marginTop:"10px",
                    width: '100%',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            />
        </>
      }
    </div>
  );
};

export default HeaderRenderer;
