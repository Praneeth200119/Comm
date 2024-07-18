import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { categoryCard } from "./Shop-By-Category.styles";
import apiConfig from "../../api/client/endpoint";

const BASE_URL = apiConfig.BASE_URL;

const CategoryCardRenderer = (data: any) => {
  const classes = categoryCard();
  return (
    <Card className={classes.cardStyles}>
      <CardMedia
        component="img"
        className={classes.imageStyles}
        // image={data.data.image}
        alt="img"
        image={`${BASE_URL}images/CATEGORIES/${data.data.CAT_ID}.png`}
        style={{
          objectFit:"contain"
        }}
      // src={`data:image/png;base64, ${data.data.image}`}
      />
      <CardContent className={classes.categoryTitleArea}>
        <Typography className={classes.categoryTitle}>{data.data.CAT_NAME}</Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCardRenderer;
