import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import apiConfig from "../../api/client/endpoint";

const BASE_URL = apiConfig.BASE_URL;
const useStyles = makeStyles((theme) => ({
  cardStyles: {
    maxWidth: 180,
    maxHeight: 120,
    borderRadius: 13,
    height: 180,
    width: 180,
    backgroundColor: "#F2F2F2",
  },
  imageStyles: {
    height: 104,
    width: 104,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    "object-fit":"fill"
  },
  categoryTitle: {
    fontFamily: "Proxima Nova",
    fontSize: 16,
    fontWeight: 700,
    textAlign: "left",
    paddingLeft: 40,
  },
  categoryTitleArea: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const BrandCardRenderer = (data: any) => {
  return (
    <Card className={useStyles().cardStyles}>
      <CardMedia
        component="img"
        className={useStyles().imageStyles}
        image={`${BASE_URL}images/BRANDS/${data.data.filename}`}
        alt="image"
      />
      
    </Card>
  );
};

export default BrandCardRenderer;
