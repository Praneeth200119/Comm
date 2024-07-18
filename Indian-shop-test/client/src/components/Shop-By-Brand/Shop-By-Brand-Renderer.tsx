import React, { useRef, useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Container
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GroceryItemCardRenderer from "../Grocery-Item-Card/Grocery-Item-Card-Renderer";
import BrandCardRenderer from "./Brand-Card-Renderer";
import {  useGetBrandsAPI } from "./../../api/productsAPI";

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  mainTitle: {
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(6)
  },
  
 
  brandsDiv:{
    display:"flex",
    flexDirection:"row",
    overflow:"hidden",
    position:"relative",
    gap:"16px",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  innerBrandsDiv:{
    "&:hover":{
      cursor:"pointer"
    }
  }
}));


const ShopByBrandRenderer: React.FC = () => {
  const classes = useStyles();
  
  const [brands, setBrands] = useState<any[]>([]);

  //relating display of brands
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [stopScrolling,setStopScrolling]=useState(false);
  const [brandWidth,setBrandWidth]=useState(200);
  
  //brands scrolling
  const innerDiv=useRef<HTMLDivElement>(null);
  const brandsDiv=useRef<HTMLDivElement>(null);
  
  useEffect(()=>{
    const brandsScroller=
      setInterval(()=>
      {
        setCurrentPositionIndex((prevIndex)=>{
          if(!stopScrolling && innerDiv.current && brandsDiv.current){    
              if(prevIndex*30>(innerDiv.current.offsetWidth)){
                innerDiv.current.style.transition="";
                return (brandsDiv.current.offsetWidth/-30)
              }
            else {
              innerDiv.current.style.transition="transform 0.3s linear";
              return prevIndex+1
            }
          }
          else{
            return prevIndex
          }
        }
        )
      },300);
    return (()=>clearInterval(brandsScroller));
  });
  
  useEffect(() => {
    fetchBrands();
  }, []);
  
  const fetchBrands = async () => {
    const response = await useGetBrandsAPI();
    console.log(response);
    setBrands(response);
  };

  return (
    <div style={{ padding: "100px" }}>
      {/* <Container> */}
        <div className={classes.root}>
          <Typography variant="h4" className={classes.mainTitle}>
            Shop By Brands
          </Typography>
          
            <div
              className={classes.brandsDiv}
              ref={brandsDiv}
            >
            <div
              className={classes.innerBrandsDiv}
              ref={innerDiv}
              onMouseOver={()=>setStopScrolling(true)}
              onMouseOut={()=>setStopScrolling(false)}
              style={{
                display:"flex",
                flexDirection:"row",
                gap:"16px",
                transition:"transform 0.3s linear",
                transform:`translate(${-currentPositionIndex*30}px)`,
              }} 
            >
              {
                brands
                .map((card, index) => (
                  <div
                    key={index}
                    style={{width:`${brandWidth}`}}
                    onClick={()=>{alert(`${card.name}`)}}
                  >
                    <BrandCardRenderer data={card} />
                  </div>
                  
                ))
              }
            </div>
            </div>
          </div>
        
    </div>
  );
};

export default ShopByBrandRenderer;
