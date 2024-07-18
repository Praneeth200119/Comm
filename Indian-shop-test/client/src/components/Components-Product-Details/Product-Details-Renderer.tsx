import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SwipeableViews from "react-swipeable-views";

// Define styles for the component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingBottom: 100,
    },
    media: {
      height: 300,
      width: "auto",
      margin: "auto",
    },
    cardContent: {
      textAlign: "left",
    },
    addButton: {
      marginTop: theme.spacing(2),
      background: 'rgba(255, 102, 0, 0.10)',
      borderRadius: 4,
      border: '1px #FF6600 solid',
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityControl: {
      display: "flex",
      alignItems: "center",
    },
    quantityInput: {
      width: 50,
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  })
);

// Define the interface for the Product component props
interface IProductDetailsRenderer {
  name: string;
  description: string;
  images: string[]; // An array of image URLs
  price: number;
}

// Product component
const ProductDetailsRenderer: React.FC<IProductDetailsRenderer> = ({
  name,
  description,
  images,
  price,
}) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add your logic here to handle adding the product to the cart
    console.log(`Added ${quantity} ${name} to cart`);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) {
      value = 0;
    }
    setQuantity(value);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <BreadCrumb />
        <Grid container spacing={3}>
          <Grid container item xs={12} sm={5}>
            <ProductPage />
          </Grid>
          <Grid container item xs={12} sm={7}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" gutterBottom>
                {name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Price: ${price}
              </Typography>
              <div className={classes.quantityControl}>
                <IconButton aria-label="reduce" onClick={decreaseQuantity}>
                  <RemoveIcon />
                </IconButton>
                <TextField
                  className={classes.quantityInput}
                  variant="outlined"
                  size="small"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: "1", step: "1" }}
                />
                <IconButton aria-label="increase" onClick={increaseQuantity}>
                  <AddIcon />
                </IconButton>
              </div>
              <Button
                variant="contained"
                className={classes.addButton}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Grid>
        </Grid>
        <ProductInfo />
      </Grid>
    </div>
  );
};

export default ProductDetailsRenderer;


import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles2 = makeStyles({
  root: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '20px',
  },
  mainImage: {
    maxWidth: '100%',
  },
  thumbnail: {
    width: 80,
    height: 80,
    cursor: 'pointer',
    border: '2px solid transparent',
    '&.active': {
      borderColor: 'orange',
    },
  },
  thumbnailContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
});

const ProductPage: React.FC = () => {
  const classes = useStyles2();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const images = [
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/150x100',
    'https://via.placeholder.com/200x150',
    'https://via.placeholder.com/250x200',
    'https://via.placeholder.com/300x250',
  ];

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else {
      setActiveIndex((prevIndex) => Math.min(images.length - 1, prevIndex + 1));
    }
  };

  return (
    <div className={classes.root}>
      {/* Main Image */}
      <Grid container justifyContent="center" alignItems="center">
        <IconButton onClick={() => handleArrowClick('prev')} disabled={activeIndex === 0}>
          <ArrowBackIcon />
        </IconButton>
        <img src={images[activeIndex]} alt="Main Product" className={classes.mainImage} />
        <IconButton
          onClick={() => handleArrowClick('next')}
          disabled={activeIndex === images.length - 1}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Grid>

      {/* Thumbnails */}
      <div className={classes.thumbnailContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`${classes.thumbnail} ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

const useStyles3 = makeStyles({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 24,
    display: 'inline-flex',
    padding: 100
  },
  section: {
    width: '100%',
    position: 'relative',
  },
  title: {
    color: '#0D3823',
    fontSize: 28,
    fontFamily: 'Playfair Display',
    fontWeight: 900,
    wordWrap: 'break-word',
  },
  content: {
    color: '#323232',
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    fontWeight: 500,
    wordWrap: 'break-word',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    wordWrap: 'break-word',
  },
});

const ProductInfo: React.FC = () => {
  const classes = useStyles3();

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <Typography className={classes.title}>
          About the product
        </Typography>
        <Typography className={classes.content}>
          Fresh guavas are characterized by their cream-coloured flesh, which is crisp and slightly sweet in taste. All fruits are hand picked and of the best quality. Guavas go well with both sweet and savory dishes.
        </Typography>
      </div>
      <div className={classes.section}>
        <Typography className={classes.subtitle}>
          Storage Use:
        </Typography>
        <Typography className={classes.content}>
          Guavas can be stored in the refrigerator, but become softer and sweeter when left to ripen at room temperature. Ripe guavas are eaten fresh, while fruits that are still unripe are added to salads. Guavas are often used in making juices, smoothies and desserts, but can also be consumed spicy by sprinkling them with salt and chili powder.
        </Typography>
      </div>
      <div className={classes.section}>
        <Typography className={classes.subtitle}>
          Benefits:
        </Typography>
        <Typography className={classes.content}>
          Guavas are rich in vitamins A and C, folic acid, fiber, lycopene and other essential minerals. They can help with hyperacidity and promote digestion.
        </Typography>
      </div>
    </div>
  );
};


import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const BreadCrumb: React.FC = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb" style={{ padding: 50, paddingLeft: 100 }}>
      <Link color="inherit" href="/">
        Home
      </Link>
      <Link color="inherit" href="/products">
        Products
      </Link>
      <Typography color="textPrimary">Product Details</Typography>
    </Breadcrumbs>
  );
};
