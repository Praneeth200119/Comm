import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  mainTitle: {
    marginBottom: theme.spacing(8),
    paddingTop: theme.spacing(6)
  },
  cardContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    padding: theme.spacing(6), // Add spacing between arrows and cards
    transition: "transform 0.3s ease-in-out", // Add transition for moving cards
  },
  arrowsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  arrowButton: {
    backgroundColor: "#FF6600",
    color: 'white',
    height: 50,
    width: 50,
    margin: 'auto',
    "&:disabled": {
      color: 'white',
      backgroundColor: '#D98E66',
    },
  },
  leftArrow: {
    marginRight: theme.spacing(4), // Add spacing at the end of the screen for left arrow
  },
//   rightArrow: {
//     marginLeft: theme.spacing(4), // Add spacing at the end of the screen for right arrow
//   },
}));
