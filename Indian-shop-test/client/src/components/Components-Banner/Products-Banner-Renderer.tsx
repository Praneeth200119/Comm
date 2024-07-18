
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
const backgroundImage = 'url("../assets/images/Homepage_Banner.png")';

const useStyles = makeStyles((theme) => ({
    banner: {
        width: "100%",
        height: 250,
        // backgroundImage: backgroundImage, Not working need to fix it
        background: "linear-gradient(78deg, #0D3823 0%, #8DEDBE 100%)",
    },
}));

const ProductsBannerRenderer: React.FC = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.banner} elevation={0}>
        </Paper>
    );
};

export default ProductsBannerRenderer;
