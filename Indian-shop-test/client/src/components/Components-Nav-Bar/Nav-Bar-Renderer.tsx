import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Divider, Button, Hidden } from '@material-ui/core';
import { ShoppingCart, ArrowDropDown, Padding } from '@mui/icons-material';
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawerRenderer from "../Components-Cart/Cart-Drawer-Renderer";
import { useGetAllCategoriesAPI, useCategoriesAPI } from "./../../api/productsAPI";
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

import Avatar from '@mui/material/Avatar';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import apiConfig from "../../api/client/endpoint";
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core';
import LocationSearchRenderer from './Location-Search-Renderer';
import { useAuth } from '../Authentication-Components/Auth';
const BASE_URL = apiConfig.BASE_URL;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'white',
    paddingLeft: 100,
    paddingRight: 100,
    // paddingTop: 10,
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

const NavbarRenderer = () => {
  const navigate=useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const auth=useAuth();

  //category menu dropdown
  const [categoryMenuAnchor, setCategoryMenuAnchor]=useState<null | HTMLElement>(null);
  const menuCategoryOpen=Boolean(categoryMenuAnchor);
  
  const handleClickMenuCategory = (event: React.MouseEvent<HTMLButtonElement>) => {

    setCategoryMenuAnchor(event.currentTarget);
    
  };
  const handleCloseMenuCategory = () => {
    setCategoryMenuAnchor(null);
  };
  const handleCategoryClick=(categoryId:number)=>{
    handleCloseMenuCategory();
    console.log(categoryId)
    navigate(`/productList/category/${categoryId}`);
   // alert(categoryId);
   }
//end
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleCartClose = () => {
    setIsCartOpen(false);
  };
  const fetchCategories = async () => {
    const data = await useCategoriesAPI();
    setCategories(data);
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
  return (
    <div className={classes.root}>
      
      <AppBar position="static" className={classes.appBar}>
        
        <Toolbar style={{gap: '30px'}}>
          
            <div className={classes.menuContainer}>
              <Button
                id="category_list"
                aria-controls={menuCategoryOpen ? 'category-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuCategoryOpen ? 'true' : undefined}
                onClick={handleClickMenuCategory}
              >
                Categories
                  {
                    menuCategoryOpen ? <KeyboardArrowDownOutlinedIcon style={{paddingLeft: '20px'}} /> : <KeyboardArrowUpOutlinedIcon style={{paddingLeft: '20px'}} />
                  }
              </Button>
              <Menu
                id="cateogry-menu"
                anchorEl={categoryMenuAnchor}
                open={menuCategoryOpen}
                
                onClose={handleCloseMenuCategory}
                MenuListProps={{
                  'aria-labelledby': 'category_list',
                }}
                style={{height:"500px"}}
              >
                {
                  categories.map((x) => {
                    return (
                      <div className={classes.menuItem}>
                        <MenuItem onClick={()=>handleCategoryClick(x.CAT_ID)}  className={classes.categoryMenuItem} 
                          sx={[
                            {
                              '&:hover': {
                                color: 'green',
                                backgroundColor: 'white',
                                fontWeight:'bold'
                              },
                            }
                          ]}
                        >
                        <Avatar
                            alt="Remy Sharp"
                            src={`${BASE_URL}images/CATEGORIES/${x.CAT_ID}.png`}
                            sx={{ width: 25, height: 25, mr:1 }}
                            variant='square'
                          />
                          {x.CAT_NAME}
                        </MenuItem>  
                      </div>
                    );
                  })
                }
              </Menu>
            </div>
            <div className={classes.menuContainerGreen}>
              <Button style={{color:'green', fontWeight:'bold'}}>
                <LoyaltyIcon />
                Best Sellers
              </Button>
            </div>
            <div className={classes.menuContainer}>
              <Button style={{color:'green', fontWeight:'bold'}}>
                New Arrivals
              </Button>
            </div> 
            <div className={classes.menuContainerGreen}>
              <Button style={{color:'green', fontWeight:'bold'}}>
                <LoyaltyIcon />
                On SALE
              </Button>
            </div>
            
            
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavbarRenderer;
