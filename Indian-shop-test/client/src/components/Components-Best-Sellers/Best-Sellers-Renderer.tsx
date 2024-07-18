import React, { useRef, useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Container,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GroceryItemCardRenderer from "../Grocery-Item-Card/Grocery-Item-Card-Renderer";
import { useStyles } from "./Best-Sellers.styles";
//api
import { useGetProductsByFilterAPI } from "../../api/productsAPI";

const BestSellersRenderer: React.FC = () => {
  const classes = useStyles();
  const [cards, setCards] = useState<any[]>([]); // products
  //  const cardRef = useRef<HTMLDivElement>(null);
  const [numCardsToShow, setNumCardsToShow] = useState(4); // Initial number of cards to show
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    updateBestSellers();
  }, []);
  const updateBestSellers = async () => {
    setCards(await useGetProductsByFilterAPI({ filter: "Bestsellers" }));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - numCardsToShow));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(cards.length - numCardsToShow, prevIndex + numCardsToShow)
    );
  };

  return (
    <>
      <div style={{display: 'flex'}}>
        <IconButton
          className={`${classes.arrowButton} ${classes.leftArrow}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
        <Container maxWidth="lg">
          <div className={classes.root}>
            <Typography variant="h4" className={classes.mainTitle} gutterBottom>
              Best Sellers
            </Typography>

            <Grid container spacing={8}>
              {cards
                .slice(currentIndex, currentIndex + numCardsToShow)
                .map((card, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={9}
                    md={6}
                    lg={3}
                    style={{ cursor: "pointer" }}
                  >
                    <GroceryItemCardRenderer product={card} />
                  </Grid>
                ))}
            </Grid>
          </div>  
        </Container>
        <IconButton
          className={`${classes.arrowButton}`}
          onClick={handleNext}
          disabled={cards.length - numCardsToShow <=0 || currentIndex === cards.length - numCardsToShow}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      </div>
    </>
  );
};

export default BestSellersRenderer;
