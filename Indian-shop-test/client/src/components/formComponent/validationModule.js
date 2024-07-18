const notEmpty=(value,schemaObject)=>{
    return !(value.length===0)
}
const required=(value, schemaObject)=>{
    return true;
}
const isLength=(value, schemaObject)=>{
    const min=schemaObject.min;
    const max=schemaObject.max;
    if(min!==undefined)
        if(value.length<min || value.length >max)return false
    return true;
}
const pattern=(value,schemaObject)=>{
    return schemaObject.value.test(value);
}
const isEmail=(value,schemaObject={})=>{
    const regex=/^[a-zA-Z0-9\._\-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/
    return regex.test(value);
}
const isDate=(value,schemaObject={})=>{
    const regex=/^\d{4}-\d{2}-\d{2}$/;
    if(!regex.test(value)) return false;//check format
    //check for valid numbers for year, month and date
    const [year, month, day] = value.split('-').map(Number);
    if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > new Date(year, month, 0).getDate()) return false
    return true;
}

const isBefore=(value, schemaObject={})=>{
    
    if(!isDate(value)) return false;
    const dateToCompare=schemaObject.value;
    if(!isDate(dateToCompare)) return false;
    const includeOption=schemaObject.include || false;

    if(includeOption) return value<=dateToCompare;
    else return value<dateToCompare;
}

const isAfter=(value, schemaObject={})=>{
    
    if(!isDate(value)) return false;
    const dateToCompare=schemaObject.value;
    if(!isDate(dateToCompare)) return false;
    const includeOption=schemaObject.include || false;

    if(includeOption) return value>=dateToCompare;
    else return value>dateToCompare;
}

const functionsMapping={
                        notEmpty:notEmpty,
                        isLength:isLength,
                        required:required,
                        isEmail:isEmail,
                        isDate:isDate,
                        isBefore:isBefore,
                        isAfter:isAfter,
                        pattern:pattern
                    }

const validateFields=(inputValue,schema)=>{
    let errors=[];
    for(var schemaFunction in schema){
        if(inputValue===undefined){
            errors.push(`value is required.`);
            break;
        }
        if( !(schemaFunction in functionsMapping)){continue}
        let result= (functionsMapping[schemaFunction])(inputValue,schema[schemaFunction]);
        if(!result){
            errors.push(schema[schemaFunction]["errorMessage"] || "Invalid Input")
        }
    }
    return errors;
}
export default validateFields;