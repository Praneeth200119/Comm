export function multiply(numbers:number[]){
    let value=1;
    numbers.forEach(num=>value=value*num);
    return value;
}
export function add(numbers:number[]){
    let value=0;
    numbers.forEach(num=>value=value+num);
    return value;
}
export function subtract(a:number,b:number){
    return a-b;
}
export function devide(a:number,b:number){
    return a/b;
}
export function percentile(a:number,b:number){
    return a%b;
}
export function percentage(a:number,b:number){
    return multiply([devide(a,b),100]);
}
export function roundOff1(number:number){
    const roundedNumber = Math.round(number * 1000) / 1000;
    return parseFloat(roundedNumber.toFixed(3));
}
export function calculate(equation:any,data:any){
    const functionName=Object.keys(equation)[0];
    const values:Array<any>=equation[functionName];
    if(functionName=="multiply"){
        let args:number[]=[];
        values.forEach((value)=>{
            if(typeof(value)=="object"){args.push(calculate(value,data))}
            else if(typeof(value)=="string"){args.push(data[value])}
            else(args.push(value))
        })
        return multiply(args)
    }
    else if(functionName=="add"){
        let args:number[]=[];
        values.forEach((value)=>{
            if(typeof(value)=="object"){args.push(calculate(value,data))}
            else if(typeof(value)=="string"){args.push(data[value])}
            else(args.push(value))
        })
        return add(args)
    }
    else if(functionName=="devide"){
        let args:number[]=[];
        values.forEach((value)=>{
            if(typeof(value)=="object"){args.push(calculate(value,data))}
            else if(typeof(value)=="string"){args.push(data[value])}
            else(args.push(value))
        })
        return devide(args[0],args[1])
    }
    else if(functionName=="subtract"){
        let args:number[]=[];
        values.forEach((value)=>{
            if(typeof(value)=="object"){args.push(calculate(value,data))}
            else if(typeof(value)=="string"){args.push(data[value])}
            else(args.push(value))
        })
        return subtract(args[0],args[1])
    }
    else
        return 0
}
