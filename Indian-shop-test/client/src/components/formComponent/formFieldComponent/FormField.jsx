import React, {useEffect, useState} from 'react';
import validateFields from '../validationModule';
import { TextField } from '@mui/material';

export default function FormField({fieldObject, setterFunction, errorUpdater}){
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
        let newChecked=[];
        if (e.target.checked) {
            newChecked=[...selectedArray, thisValue];
        } else {
            newChecked=selectedArray.filter((item) => item !== thisValue);
        }
        const errorsResulted=validateFields(newChecked,validationSchema);
        
        setSelectedArray(newChecked);
        setErrors(errorsResulted);
        
        setterFunction({[fieldName]:newChecked});
        errorUpdater(fieldName,errorsResulted.length);
    }
    const styles={
        formField:{
            'display':'flex',
            'flexDirection':'column',
            'width':'100%',
            'maxWidth':'800px',
            'justifyContent':'center',
            'alignItems':'center',
            'margin':'auto',
        },
        inputFieldDiv:{
            'display':'flex',
            'flexDirection':'row',
            'justifyContect':'center',
            'alignItems':'center',
            'width':'90%',
        },
        formFieldLabel:{
            'display':'flex',
            'width':'30%',
            'maxWidth':'300px',
            'justifyContent':'flex-start',
            'alignSelf':'center',
            'margin':'10px 0px',
        },
        mainInputField:{
            'display':'flex',
            'width':'70%',
            'maxWidth':'300px',
            'justifyContent':'flex-start',
            'alignSelf':'center',
            'margin':'10px 0px',
        },
        inputElement:{
            'padding':'4px 10px',
            'fontSize':'1em',
            'border':'1px solid black',
            'borderRadius':'4px',
            'width':'95%',
            'maxWidth':'300px',
            'marginLeft':'5%',
        },
        selectElement:{
            'padding':'4px 10px',
            'fontSize':'1em',
            'border':'1px solid black',
            'borderRadius':'4px',
            'width':'95%',
            'maxWidth':'300px',
            'marginLeft':'5%',
        },
        errorMessageDiv:{
            'display':'flex',
            'flexDirection':'column',
            'justifyContect':'left',
            'alignItems':'center',
            'width':'90%'
        },
        errorMessage:{
            'width':'65%',
            'marginLeft':'35%',
            'fontSize':'0.75em',
            'color':'red',
        },
        selectItemsDiv:{
            'display':'flex',
            'flexDirection':'column',
            'justifyContect':'flexStart',
            'alignItems':'center',
            'width':'65%',
            'marginLeft':'5%'
        },
        checkOption:{
            'display':'flex',
            'flexDirection':'row',
            'justifyContect':'flexStart',
            'alignItems':'center',
            'width':'100%',
            'gap':'10px',
        },
        requiredField:{
            'fontSize':'1em',
            'color':'red'
        }

    }
    return(    
        <div style={styles.formField}>
            {fieldName &&
                <>
                    <div style={styles.inputFieldDiv}>
                        <div style={styles.formFieldLabel}>
                            {fieldLabel} : {validationSchema.notEmpty && <span style={styles.requiredField}>*</span>}
                        </div>
                        <div style={styles.mainInputField}>
                            {fieldType==="text" &&
                                // <TextField />
                                <input type={fieldType} style={styles.inputElement} onChange={(e)=>{handleInputChange(e)}} name={fieldName}></input>
                            }
                            {fieldType==="select" &&
                                <select
                                    style={styles.selectElement}
                                    name={fieldName}
                                    onChange={(e)=>{handleInputChange(e)}}
                                    >
                                    {
                                        (fieldObject.options).map((thisOption,_id)=>{
                                            return <option value={thisOption.value} key={_id}>{thisOption.option}</option>
                                        })
                                    }
                                </select>
                            }
                            {fieldType==="selectItems" &&
                                <div style={styles.selectItemsDiv}>
                                    {
                                    fieldObject.options.map((item,_id)=>{
                                        return <div style={styles.checkOption} key={_id}>
                                            <input
                                                type='checkbox'
                                                onChange={(e)=>{handleCheckboxChange(e)}}
                                                name={fieldName}
                                                value={item.value}
                                            />
                                            <span>{item.option}</span>
                                            </div>
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div style={styles.errorMessageDiv}>
                            {errors.map((errorMessage,_id)=><div key={_id} style={styles.errorMessage}>{errorMessage}</div>)}
                    </div>
                </>
            }
        </div>  
    )
}