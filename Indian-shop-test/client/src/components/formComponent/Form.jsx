import React, {useEffect, useState} from 'react';
import FormField from './formFieldComponent/FormField';
import FormFieldMUI from './formFieldComponent/FormFieldMUI';

export default function Form({title, columns=1, fieldsArray, submitHandler}){
    const [fieldsValues,setFieldsValues]=useState({});
    const [errors,setErrors]=useState({});
    const [errorCount,setErrorCount]=useState(0);
    const [touched,setTouched]=useState([]);
    useEffect(()=>{
        let newErrorObject={};
        let newFieldValuesObject={};
        let newTouched=[];
        fieldsArray.forEach((fieldObject)=>{
            if(Object.keys(fieldObject.validationSchema).indexOf('notEmpty')>-1){
                newErrorObject={...newErrorObject,[fieldObject.fieldName]:1};
            }
            else{
                newTouched.push(fieldObject.fieldName);
                newFieldValuesObject={...newFieldValuesObject,[fieldObject.fieldName]:""};
            }
        });
        setTouched(newTouched);
        setErrors(newErrorObject);
        setFieldsValues(newFieldValuesObject);
    },[]);
    const updateFields=(fieldValueObject)=>{
        const fieldName=Object.keys(fieldValueObject)[0];
        if(touched.indexOf(fieldName)===-1){
            setTouched([...touched,Object.keys(fieldValueObject)[0]]);
        }
        setFieldsValues({...fieldsValues,...fieldValueObject});
    }
    const updateErrors=(fieldName,errorsNumber)=>{
        const newErrorsObject={...errors,[fieldName]:errorsNumber}
        setErrorCount(Object.values(newErrorsObject).reduce((acc,value)=>acc+value,0));
        setErrors(newErrorsObject);
    }
    const handleSubmit=()=>{
        submitHandler(fieldsValues);
    }
    const styles={
        form:{
            'display':'flex',
            'flexDirection':'column',
            'width':'100%',
            'justifyContent':'center',
            'alignItems':'center',
            'gap':'5px',
            'border':"1px solid black"
        },
        formTitle:{
            'display':'flex',
            'width':'100%',
            'justifyContent':'center',
            'alignItems':'center',
            'backgroundColor':'rgb(0,0,0)',
            'color':'white',
            'fontSize':'1.1em',
            'fontWeight':'bold',
            'paddingTop':'5px',
            'paddingBottom':'5px',
        },
        formRow:{
            'display':'flex',
            'flexDirection':'row',
            'width':'100%',
            'justifyContent':'center',
            'alignItems':'center',
        },
        submitButtonDiv:{
            'display':'flex',
            'flexDirection':'row',
            'width':'100%',
            'maxWidth':'400px',
            'justifyContent':'center',
            'alignItems':'center',
            'marginBottom':'5px'
        },
        submitButton:{
            'backgroundColor': 'rgb(44, 119, 199)',
            'color':'white',
            'fontWeight': 'bold',
            'fontSize':'1.1em',
            'border':'none',
            'borderRadius': '5px',
            'padding':'3px 10px'
        },
        disabledButton:{
            'backgroundColor': 'grey',
            'color':'white',
            'fontWeight': 'bold',
            'fontSize':'1.1em',
            'border':'none',
            'borderRadius': '5px',
            'padding':'3px 10px'
        }
    }
    const displayForFields=(formFieldsArray)=>{
        let result=[];
        for(let i=0;i<(formFieldsArray.length);i=i+columns){
            let forInnerFields=[];
            for(let j=0;j<columns;j++){
                if((i+j)<formFieldsArray.length) forInnerFields.push(formFieldsArray[i+j]);
                else forInnerFields.push({});
            }
            result.push(
                <div style={styles.formRow} key={i}>
                    {
                        forInnerFields.map((thisField,_id)=>{
                            return <FormFieldMUI key={`${i}_${_id}`} fieldObject={thisField} setterFunction={updateFields} errorUpdater={updateErrors}>
                            </FormFieldMUI>
                        })
                    }
                </div>
            )
        }
        return result;
    }
    return (
        <div style={styles.form}>
            <div style={styles.formTitle}>
                {title}
            </div>
            <>
                {
                    displayForFields(fieldsArray)
                }
            </>
            <div style={styles.submitButtonDiv}>
                <button
                    onClick={handleSubmit}
                    style={( touched.length===fieldsArray.length && errorCount===0) ? styles.submitButton : styles.disabledButton}
                    disabled={!(touched.length===fieldsArray.length && errorCount===0)}>
                        Submit
                </button>
            </div>
        </div>
    )
}