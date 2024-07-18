
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, Typography, Button } from "@material-ui/core";
import Brightness5Icon from '@mui/icons-material/Brightness5';
const backgroundImage = 'url("../assets/images/Homepage_Banner.png")';
import apiConfig from "../../api/client/endpoint";
const BASE_URL = apiConfig.BASE_URL;

const useStyles = makeStyles((theme) => ({
  banner: {
    width: "100%",
    height: 540,
    // backgroundImage: backgroundImage, Not working need to fix it
    background: "linear-gradient(78deg, #0D3823 0%, #8DEDBE 100%)",
  },
  content: {
    padding: theme.spacing(4),
    textAlign: "center",
  },
  button: {
    marginTop: theme.spacing(2),
  },
  container: {
    width: 658.17,
    height: 338,
    position: 'relative',
  },
  textContainer: {
    width: 524,
    left: 0,
    top: 0,
    position: 'absolute',
    color: 'white',
    fontSize: 64,
    fontFamily: 'Playfair Display',
    fontWeight: 800,
    lineHeight: 95,
    wordWrap: 'break-word',
    paddingTop: theme.spacing(13),
  },
  buttonContainer: {
    width: 95,
    height: 24,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
    left: 0,
    top: 255,
    position: 'absolute',
    background: '#FF6600',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    display: 'inline-flex',
    marginLeft: theme.spacing(12)
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    wordWrap: 'break-word',
  },
  starCircle: {
    position: 'relative',
    display: 'inline-block',
    top: theme.spacing(34),
    left: theme.spacing(22),
  },
  icon: {
    color: '#FF6600',
    fontSize: 48,
    height: 180,
    width: 180,
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-28.50deg)', // Rotate the text 45 degrees
    color: '#FFFFFF', // White text color
    fontSize: '0.8em', // Adjust the font size as needed
    fontWeight: 'bold',
    fontFamily: 'Playfair Display',
  },
}));

const BannerRenderer: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <img src={`${BASE_URL}images/banner.png`} style={{width:"100%", height:"400px"}}/>
    </>
    // <Paper className={classes.banner} elevation={0}>
    //   <Box className={classes.content}>
    //     <div className={classes.container}>
    //       <div className={classes.textContainer}>
    //         <Typography variant="h3">Fresh & Healthy<br />Vegetables</Typography>
    //       </div>
    //       <div className={classes.buttonContainer}>
    //         <Button className={classes.buttonText}>
    //           Shop Now
    //         </Button>
    //       </div>
    //       < div className={classes.starCircle} >
    //         <Brightness5Icon className={classes.icon} />
    //         <div className={classes.text}>
    //           <Typography variant="h5">50%</Typography>
    //           <Typography variant="h6">OFF</Typography>
    //         </div>
    //       </div >
    //     </div>
    //   </Box>
    // </Paper>
  );
};

export default BannerRenderer;
