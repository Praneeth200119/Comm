import React, {useRef,useState, useEffect} from "react";
import { Menu, MenuItem, Switch, Chip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {TextField, Autocomplete} from "@mui/material";

import LabelChip from "./LabelChip";

export default function MultiSelectComponent(props:any){
    const optionsArray=props.options;
    // const fieldName=props.fieldName;
    const editState=props.editState;

    const ref=useRef<HTMLDivElement>(null)
    const [valuesArray,setValuesArray]=useState<any>([]);
    useEffect(
        ()=>{
            setValuesArray(props.values);
        },[props]
    )

    const [open, setOpen] = useState(false);
    const handleClick=()=>{
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
    }
    const onMultiSelectChange=(e:React.ChangeEvent<any>)=>{
        const option=e.target.name;
        const selectedOptions=valuesArray;
        let newSelectedOptions:any=[];
        if(e.target.checked){
            newSelectedOptions=[...selectedOptions,option];
            setValuesArray([...selectedOptions,option])
        }
        else{
            newSelectedOptions=selectedOptions.filter((thisOption:any)=>thisOption!=option);
            setValuesArray(newSelectedOptions)
        }
        props.onChangeFunction(newSelectedOptions,props.fieldName)
    }
    return(
        <>
            <div style={{display:"flex", alignContent:"flex-end"}}>
                <div style={{flex:1, flexDirection:"column"}}>
                    {/* {valuesArray.join(", ")} */}
                    {
                        valuesArray.map(
                            (value:any,_id:any)=>{
                                return <LabelChip label={value} index={optionsArray.indexOf(value)}/>
                            }
                        )
                    }
                </div>
                <div ref={ref} onClick={handleClick} style={{fontSize:"10px", cursor:"pointer", display:`${editState?"":'none'}`}} >
                    <EditIcon fontSize="small"/>
                </div>
            </div>
            <Menu
                anchorEl={ref.current}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: -130,
                }}
            >
            {
                optionsArray.map(
                    (option:any,index:any)=>{
                        return(
                            <MenuItem key={index}  style={{display:"block", padding:"5px", textAlign:"left",}}>
                                <div style={{display:"flex", flexDirection:"row"}}>
                                <div style={{flex:1}}>{option}</div>
                                <input
                                    type="checkbox" 
                                    name={option}
                                    checked={valuesArray.indexOf(option)>-1 ? true: false}
                                    onChange={(e)=>{onMultiSelectChange(e)}}
                                />
                                </div>
                            </MenuItem>
                        )
                    }
                )
            } 
            </Menu>
        </>)
    
}