import React from "react"
import { Chip} from "@mui/material";
export default function LabelChip(props:any){
    const label=props.label;
    const index=props.index;
    const theme=[
        {background:"#ff9900",color:"#FFFFFF"},
        {background:"#f59aba",color:"#FFFFFF"},
        {background:"#00ff00",color:"#FFFFFF"},
        {background:"#9C27B0",color:"#FFFFFF"},
        {background:"#E91E63",color:"#FFFFFF"},
        {background:"#C6FF00",color:"#000000"},
        {background:"#F4511E",color:"#FFFFFF"},
        {background:"#eeff00",color:"#000000"},
        {background:"#00ffaa",color:"#000000"},
        {background:"#00ffbb",color:"#000000"},
    ]
    return(
        <Chip label={label} variant="outlined" size={"small"} style={{margin:"1px",...theme[index], border:"0px"}}/>
    )

}