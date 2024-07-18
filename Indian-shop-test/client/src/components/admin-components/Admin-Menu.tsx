import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@material-ui/core/Divider/Divider';
import { Button } from '@mui/material';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { useNavigate } from 'react-router-dom';

import apiConfig from "../../api/client/endpoint";

const BASE_URL = apiConfig.BASE_URL;
//styles
const thisStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuDiv:{
        display:"flex",
        flexDirection:"row",
        padding:"5px",
        margin:"auto",
        background:"#f7f5f5",
        justifyContent:"center",
        alignItems:'center',
        gap:"8px"
    },
    taskBar:{
        display:"flex",
        flexGrow:1,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:"8px",
        paddingLeft:"10px"
        
    },
    menuIcon:{
        cursor:"pointer"
    }
  })
);

export default function MenuAppBar() {
  
  const classes=thisStyles();
  const navigate=useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick=(target:String)=>{
    navigate(`/admin/${target}`);
    handleClose();
  }
  
  return (
    <div className={classes.menuDiv}>
      <div className={classes.taskBar}>
        <Button
          onClick={()=>{handleMenuItemClick("inventory")}}
          style={{ padding:"10px", textAlign:"left", color:"#1a237e"}}
        >
            <InventoryRoundedIcon sx={{marginRight:'5px'}}/>Inventory
        </Button>
        <Button
          onClick={()=>{handleMenuItemClick("addproduct")}}
          style={{ padding:"10px", textAlign:"left", color:"#1a237e"}}
        >
         <AddBoxOutlinedIcon sx={{marginRight:'5px'}}/>Add Product
        </Button>


        {/* <IconButton onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton> */}
      </div>

        <Typography  style={{cursor:"pointer", paddingRight:"20px", color:"#ff5722"}}>
                Welcome Admin!
        </Typography>
        
        {/* <div className={classes.taskBar}>
            
            <Typography  onClick={()=>{navigate("/")}} style={{cursor:"pointer"}}>
                INDIAN SHOP
            </Typography>
            <Typography >
                Admin Activities
            </Typography>
        </div> */}
              {/* <Menu
                id="adminMenu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 30,
                  horizontal: 5,
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <MenuItem onClick={()=>{handleMenuItemClick("inventory")}}  style={{display:"block", padding:"10px", textAlign:"left"}}>Inventory</MenuItem>
                <MenuItem onClick={()=>{handleMenuItemClick("addproduct")}} style={{display:"block", padding:"10px", textAlign:"left"}} >Add Product</MenuItem>
              </Menu> */}
    </div>
  );
}