import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// Styles for the component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: 300,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    itemQuantity: {
      display: "flex",
      alignItems: "center",
    },
    quantityInput: {
      width: 50,
      margin: theme.spacing(0, 1),
    },
    checkoutButton: {
      marginTop: "auto",
      width: "100%",
    },
    arrowIcon: {
      marginLeft: theme.spacing(1),
    },
  })
);

interface GroceryItem {
  id: number;
  name: string;
  quantity: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  groceryItems?: GroceryItem[];
  onIncreaseQuantity?: (id: number, quantity: number) => void;
  onDecreaseQuantity?: (id: number) => void;
}
const groceryItemsData: GroceryItem[] = [
  { id: 1, name: "Apples", quantity: 3 },
  { id: 2, name: "Bananas", quantity: 2 },
  { id: 3, name: "Milk", quantity: 1 },
];
const CartDrawerRenderer: React.FC<Props> = ({
  isOpen,
  onClose,
  groceryItems = groceryItemsData,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const classes = useStyles();

  const handleCheckout = () => {
    console.log("Checkout clicked");
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          <RemoveIcon />
        </IconButton>
      </div>
      <Typography variant="h6" align="center" gutterBottom>
        Cart
      </Typography>
      <List>
        {groceryItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction className={classes.itemQuantity}>
              <IconButton onClick={() => onDecreaseQuantity?.(item.id)}>
                <RemoveIcon />
              </IconButton>
              <TextField
                className={classes.quantityInput}
                variant="outlined"
                size="small"
                value={item.quantity}
                onChange={(e) =>
                  onIncreaseQuantity?.(item.id, parseInt(e.target.value))
                }
              />
              <IconButton onClick={() => onIncreaseQuantity?.(item.id,0)}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        className={classes.checkoutButton}
        onClick={handleCheckout}
      >
        Checkout
        <ArrowForwardIcon className={classes.arrowIcon} />
      </Button>
    </Drawer>
  );
};

export default CartDrawerRenderer;
