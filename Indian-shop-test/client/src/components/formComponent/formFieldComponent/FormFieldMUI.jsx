import React, {useEffect, useState} from 'react';
import validateFields from '../validationModule';
import { TextField, Select, FormControl, InputLabel, MenuItem, FormHelperText, Checkbox, ListItemText, Box, Chip } from '@mui/material';

export default function FormFieldMUI({fieldObject, setterFunction, errorUpdater}){
    const {fieldName}=fieldObject
    const {fieldLabel}=fieldObject;
    const {fieldType}=fieldObject;
    const {validationSchema}=fieldObject;

    const [errors,setErrors]=useState([]);
    const [fieldValue,setFieldValue]=useState("");
    const [selectedArray,setSelectedArray]=useState([]);

    const handleInputChange=(e)=>{
        const thisValue=e.target.value;
        const fieldName=e.target.name;
        let errorsResulted=validateFields(thisValue,validationSchema);
        setFieldValue(thisValue);
        setErrors(errorsResulted);
        setterFunction({[fieldName]:thisValue});
        errorUpdater(fieldName,errorsResulted.length);
    }
    const handleCheckboxChange=(e)=>{
        const thisValue=e.target.value;
        const fieldName=e.target.name;
        const errorsResulted=validateFields(thisValue,validationSchema);
        
        setSelectedArray(thisValue);
        setErrors(errorsResulted);
        
        setterFunction({[fieldName]:thisValue});
        errorUpdater(fieldName,errorsResulted.length);
    }
    const styles={
        formField:{
            'display':'flex',
            'flexDirection':'column',
            'width':'100%',
            'maxWidth':'500px',
            'justifyContent':'center',
            'alignItems':'center',
            'margin':'auto',
        },
        mainInputField:{
            'display':'flex',
            'width':'70%',
            'maxWidth':'300px',
            'justifyContent':'flex-start',
            'alignSelf':'center',
            'margin':'10px 0px',
        },
       
    }
    return(    
        <div style={styles.formField}>
            {fieldName &&
                <>
                        <div style={styles.mainInputField}>
                            {fieldType==="text" &&
                                <TextField
                                    size='small'
                                    error={errors.length>0}
                                    sx={{width:"100%",background:"white"}}
                                    value={fieldValue}
                                    onChange={(e)=>{handleInputChange(e)}}
                                    name={fieldName}
                                    label={`${fieldLabel} : ${validationSchema.notEmpty ? "*":""}`}
                                    InputLabelProps={{
                                        shrink: true,
                                        style:{color:"green"}
                                      }}
                                    variant="standard"
                                    helperText={errors.join(", ")}
                                />
                            }
                            {fieldType==="textBox" &&
                                <TextField
                                    size='small'
                                    error={errors.length>0}
                                    sx={{width:"100%",background:"white"}}
                                    value={fieldValue}
                                    onChange={(e)=>{handleInputChange(e)}}
                                    name={fieldName}
                                    label={`${fieldLabel} : ${validationSchema.notEmpty ? "*":""}`}
                                    InputLabelProps={{
                                        shrink: true,
                                        style:{color:"green"}
                                      }}
                                    variant="outlined"
                                    multiline
                                    helperText={errors.join(", ")}
                                />
                            }
                            {fieldType==="select" &&
                                <FormControl sx={{ minWidth: 120, width:"100%" }}>
                                    <InputLabel size="small" variant='standard' shrink style={{color:"green"}}>{`${fieldLabel} : ${validationSchema.notEmpty ? "*":""}`}</InputLabel>
                                    <Select
                                        size="small"
                                        value={fieldValue}
                                        label={`${fieldLabel} : ${validationSchema.notEmpty ? "*":""}`}
                                        onChange={(e)=>{handleInputChange(e)}}
                                        variant='standard'
                                        name={fieldName}
                                    >
                                        {
                                            fieldObject.options.map(
                                                (thisOption, _id)=>{
                                                    return(<MenuItem value={thisOption.value} key={_id} style={{display:"block",padding:"5px"}}>{thisOption.option}</MenuItem>)
                                                }
                                            )
                                        }
                                        
                                    </Select>
                                    <FormHelperText>{errors.join(", ")}</FormHelperText>
                                </FormControl>
                            }
                            {fieldType==="selectItems" &&
                                <FormControl sx={{ width: "100%" }} error={errors.length>0}>
                                    <InputLabel size="small" variant='standard' shrink style={{color:"green"}}>{`${fieldLabel} : ${validationSchema.notEmpty ? "*":""}`}</InputLabel>
                                        <Select
                                            multiple
                                            size="small"
                                            value={selectedArray}
                                            label={`${fieldLabel} : ${validationSchema.notEmpty ? "*":""}`}
                                            onChange={(e)=>{handleCheckboxChange(e)}}
                                            variant='standard'
                                            name={fieldName}    
                                            renderValue={(selectedArray) =>(
                                                        <Box sx={{display:"flex", flexWrap:"wrap", gap:"1px"}}>
                                                            {selectedArray.map(
                                                                (value)=>{return <Chip key={value} label={value} />}
                                                                )
                                                            }
                                                        </Box>
                                                    )}
                                        >
                                            {fieldObject.options.map(
                                                (thisOption, _id) => (
                                                    <MenuItem key={_id} value={thisOption.value} dense style={{display:"block",padding:"5px"}}>
                                                        <div style={{display:"flex", gap:"4px"}}>
                                                            <Checkbox checked={selectedArray.indexOf(thisOption.value) > -1} size="small"/>
                                                            <ListItemText primary={thisOption.option} />
                                                        </div>
                                                    </MenuItem>
                                                    )
                                                )
                                            }
                                        </Select>
                                        <FormHelperText>{errors.join(", ")}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                </>
            }
        </div>  
    )
}