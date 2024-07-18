import React, {useState, useEffect, useCallback} from "react";

import FilterListIcon from '@mui/icons-material/FilterList';

import GetTableRow from "./GetTableRow";

import "./Inventory.css";
import { calculate, roundOff1 } from "./calculations";
import { Button, IconButton, MenuItem, Select, TextField, Modal, Dialog, DialogContent, DialogActions, DialogContentText, Grid } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search';

import { useGetProductsAPI, useUpdateOneProductAPI, useDeleteOneProductAPI, useUpdateMultipleProductsAPI } from "../../api/productsAPI";
import { Typography } from "@material-ui/core";
import TaskIcon from '@mui/icons-material/Task';
import Badge from '@mui/material/Badge';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { green, red, pink } from '@mui/material/colors';
import { updateParameter } from "typescript";
interface filterValuesObejct{
    [key:string]:"string"
}

export default function Inventory(){
    const [discrepancies,setDiscrepancies]=useState<any>([]);
    const [viewDiscrepancy,setViewDiscrepancy]=useState(false);
    const toggleViewDiscrepancies=()=>{
        const nextStatus=!viewDiscrepancy;
        setViewDiscrepancy(nextStatus);
        if(nextStatus)
            updateProductsToShow(filterValues,discrepancies)
        else   
            updateProductsToShow(filterValues);
    }
    const [productFields,setProductFields]=useState([
        {field:"_id",key:true,title:"Doc Id",type:"display", style:{ width:"80px",textAlign:"center"},columnVisible:false},
        {field:"PROD_ID",title:"Prod Id",type:"display",toolbar:["search","sort"], style:{ width:"80px",textAlign:"left"},columnVisible:true},
        {field:"Name",title:"Product Name",type:"display",toolbar:["search"], style:{width:"300px",textAlign:"left"},columnVisible:true},
        {field:"CAT_NAME",title:"Category Name",type:"display",toolbar:["select","sort"],selectOptions:["Snacks","Milk"], style:{width:"150px",textAlign:"left"},columnVisible:true},
        {field:"Brand",title:"Brand",type:"display",toolbar:["select"],selectOptions:["Maggi","Heritage"], style:{width:"125px",textAlign:"left"},columnVisible:true},
        {field:"NoofUnits",title:"No of Units",type:"number", size:3, style:{textAlign:"right"},columnVisible:true},
        {field:"Units",title:"Units",type:"display", style:{textAlign:"right"},columnVisible:true},
        {field:"NetWeight",title:"Net Weight",type:"number", style:{textAlign:"right"},columnVisible:true},
        {field:"Quantity",title:"Qty.",type:"number", style:{textAlign:"right",size:1},columnVisible:true},
        {field:"Price",title:"Price",type:"number", toolbar:["sort"], style:{ textAlign:"right"},columnVisible:true},
        {field:"Discount",title:"Disc. %",type:"number", toolbar:["sort"], style:{ textAlign:"center"},columnVisible:true},
        {field:"NoOfQuantitiesOnDiscountedPrice",title:"Qty. for Disc.",type:"number", style:{textAlign:"center"},columnVisible:true},
        {field:"Labels",title:"Labels",type:"multiSelect",selectOptions:["Best Sellers","New Arrivals","On Sale"],toolbar:["multiselect"], style:{ width:"200px",textAlign:"left"},columnVisible:true},
        {field:"DiscountedPrice",title:"Disc. Price",type:"calc",calc:{"multiply":["Price",{"devide":[{"subtract":[100,"Discount"]},100]}]},columnVisible:true},
        {field:"PricePerUnitQuantity",title:"Price/Qty.",type:"calc",calc:{"devide":["DiscountedPrice","NetWeight"]},style:{textAlign:"right"},columnVisible:true},
        {field:"ProductVisibility",title:"Visibility",type:"switch",toolbar:["select"],selectOptions:["Yes","No"],columnVisible:true}
    ]);
    const [products,setProducts]=useState([
                    {
                        "PROD_ID":"1234",
                        "Cat_Name":"Snacks",
                        "Name":"Instant Masala Noodles",
                        "Brand":"Maggi",
                        "NoofUnits":"1",
                        "Units":"kg",
                        "NetWeight":"0.56",
                        "Quantity":"50",
                        "Price":"3.77",
                        "Discount":"10",
                        "NoOfQuantitiesOnDiscountedPrice":"23",
                        "Labels":["Best Sellers", "On Sale"],
                        "DiscountedPrice":"3.393",
                        "PricePerUnitQuantity":"6.058",
                        "ProductVisibility":"yes"
                    },
                    {
                        "PROD_ID":"1235",
                        "Cat_Name":"Milk",
                        "Name":"Milk Powder",
                        "Brand":"Heritage",
                        "NoofUnits":"1",
                        "Units":"l",
                        "NetWeight":"0.89",
                        "Quantity":"2",
                        "Price":"3.77",
                        "Discount":"10",
                        "NoOfQuantitiesOnDiscountedPrice":"23",
                        "Labels":["Best Sellers"],
                        "DiscountedPrice":"3.393",
                        "PricePerUnitQuantity":"6.058",
                        "ProductVisibility":"no"
                    },{
                        "PROD_ID":"1236",
                        "Cat_Name":"Milk",
                        "Name":"Milk Packet",
                        "Brand":"Heritage",
                        "NoofUnits":"1",
                        "Units":"l",
                        "NetWeight":"0.89",
                        "Quantity":"2",
                        "Price":"3.77",
                        "Discount":"10",
                        "NoOfQuantitiesOnDiscountedPrice":"23",
                        "Labels":["Best Sellers"],
                        "DiscountedPrice":"3.393",
                        "PricePerUnitQuantity":"6.058",
                        "ProductVisibility":"no"
                    }
                ]);
    
    useEffect(
        ()=>{fetchProducts();},[]
    )
    const fetchProducts=async ()=>{
        const productsReceived=await useGetProductsAPI();

        let categoriesArray:any=[];
        let brandsArray:any=[];
        let labelsArray:any=[];
        let discrepancyArray:any=[];
        const modifiedProducts=productsReceived.products?.map(
            (product:any)=>{
                const cat=product.CAT_NAME;
                const brand=product.Brand;
                const labels=product.Labels?.split(", ");
                if(categoriesArray.indexOf(cat)<0){
                    categoriesArray.push(cat);
                }
                if(brandsArray.indexOf(brand)<0){
                    brandsArray.push(brand);
                }
                labels.map(
                    (label:any)=>{
                        if(labelsArray.indexOf(label)<0){
                            labelsArray.push(label);
                        }
                    }
                )
                const alteredProductObject={...product,
                                                Discount:Math.round(product.Discount*100),
                                                Labels:labels,
                                                Price:parseFloat((product.Price)?.toFixed(2)),
                                                PricePerUnitQuantity:parseFloat((product.PricePerUnitQuantity)?.toFixed(3)),
                                                NetWeight:parseFloat((product.NetWeight)?.toFixed(3)),
                                            }
                if(checkForDiscrepency(product)){
                    discrepancyArray.push(alteredProductObject);
                }
                return alteredProductObject;
            }
        )
        updateOptionsInFields(categoriesArray.sort(),brandsArray.sort(),labelsArray);
        setProducts(modifiedProducts?modifiedProducts:[]);
        setDiscrepancies(discrepancyArray);
    }
    const updateOptionsInFields=(categoriesArray:string[],brandsArray:string[],labelsArray:string[])=>{
        let newArray:any[]=[];
        productFields.forEach(field=>{
            if(field.field==="CAT_NAME"){
                newArray.push({...field,selectOptions:categoriesArray})
            }
            else if(field.field==="Brand"){
                newArray.push({...field,selectOptions:brandsArray})
            }
            else if(field.field==="Labels"){
                newArray.push({...field,selectOptions:labelsArray})
            }
            else newArray.push(field);
        })
        setProductFields(newArray);
    }
    const checkForDiscrepency=(rowData:any)=>{
        return rowData.Quantity<rowData.NoOfQuantitiesOnDiscountedPrice
    }
    const [productsToShow,SetProductsToShow]=useState<any>([])//products for display => after filter, sort
    const [filterValues,setFilterValues]=useState<filterValuesObejct>({});//object {"filedName":"fieldValue"}-filters applied
    const [keysChecked,setKeysChecked]=useState<any[]>([]);//the values of the key field for which the rows are checked
    const [sortField,setSortField]=useState<any[]>([]);//the field on which sorting is applied latest
    const [editingRows,setEditingRows]=useState(0);//number of rows in edit state
    
    //messagebox
    const [message,setMessage]=useState<string | null>(null);
    const [messageBoxColor,setMessageBoxColor]=useState("#B2FF59");
    //end
    //table pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
        setKeysChecked([]);
      };
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    //end of pagination
    
    useEffect(
        ()=>{
            updateProductsToShow(filterValues);
        },[products]
    )
    //one key field - for identifying the row object
    const getKeyFieldName=()=>{
        let keyField="";
        productFields.some(
            (fieldObject)=>{
                if(fieldObject.key){
                    keyField=fieldObject.field;
                    return true
                }
            }
        )
        return keyField;
    }
    const keyFieldName=getKeyFieldName();
    //updates rowData based on keyFieldName
    const updateProducts=(rowData:any)=>{
        const keyField=getKeyFieldName();
        setProducts(
            (prevProducts)=>
                prevProducts.map(
                    (product:any) => (product[keyField]==rowData[keyField]) ? rowData : product
                )
        )
    }
    //editFunction after receiving rowdata from getRowTable
    const editFunction=useCallback( async (rowData:any)=>{
        productFields.map(
            (field)=>{
                if(field.type=="calc"){
                    const expression=field.calc;
                    rowData[field.field]=roundOff1(calculate(expression,rowData))
                }
            }
        )
        const copyOfRowData={...rowData};
        delete copyOfRowData._id;
        copyOfRowData.Labels=rowData.Labels.join(", ");
        copyOfRowData.Discount=rowData.Discount/100;
        const status=await useUpdateOneProductAPI(rowData._id,copyOfRowData);
        if(status) {
            showMessage(`Successfulyy Updated the Product: ${rowData.Name}`);
            updateProducts(rowData);
        }
        else {
            showMessage(`Unable to update the Product: ${rowData.Name}. Try after some time or contact admin`,2000,"error");
        }
        
    },[]);
    const showMessage=(message:string,duration=2000,style:string="success")=>{
        if(style=="error") setMessageBoxColor("#FB8C00");
        setMessage(message);
        setTimeout(()=>{
            setMessage(null);
            setMessageBoxColor("#B2FF59");
        },duration)
    }
    //deleteFunction to receive rowdata from getRowTable
    const deleteFunction=useCallback(async (rowData:any)=>{
        const status=await useDeleteOneProductAPI(rowData._id);
        if(status) {
            showMessage(`Successfulyy Deleted the Product: ${rowData.Name}`);
        }
        else {
            showMessage(`Unable to Delete the Product: ${rowData.Name}. Try after some time or contact admin`,2000,"error");
        }
        fetchProducts();
    },[]);
    //checkFunction to received rowdata from getRowTable
    const checkFunction=useCallback((keyValue:any,status:"checked" | "not-checked")=>{
        let newArray=[];
        if(status=="checked"){
            newArray=[...keysChecked,keyValue];
        }
        else{
            newArray=keysChecked.filter(value=>value!=keyValue);
        }
        setKeysChecked(newArray);
    },[]);
    //updates filterValuesObject, updates products to show based on new Filters
    const updateFilterValues=(fieldName:any,fieldValue:any)=>{
        const filterValuesObjectNew:filterValuesObejct={...filterValues,[fieldName]:fieldValue};
        setFilterValues(filterValuesObjectNew);
        updateProductsToShow(filterValuesObjectNew,viewDiscrepancy?discrepancies:products);
    }
    const getComparisionType=(field:string)=>{
        let searchType=null;
        productFields.some(
            (fieldObject)=>{
                if(fieldObject.field==field){
                    fieldObject.toolbar?.map(
                        (tool)=>{
                            if(tool=="search") searchType= "search"
                            else if(tool=="select") searchType="select"
                            else if(tool=="multiselect") searchType= "multiselect"
                        }
                    )
                    return true
                }
                else return false
            }
        )
        return searchType
    }
    const popOutKeyValue=(keyValue:any)=>{
        setKeysChecked(prev=>prev.filter(key=>key!=keyValue))
    }
    //filters given Array of objects based on given field and value and updates keysChecked 
    const filterArray=(array:any,field:string,value:any)=>{
        const comparisionType=getComparisionType(field);
        if(comparisionType=="search"){
            return array.filter(
                (object:any)=>{
                    // return object[field].indexOf(value) !=-1
                    const result=object[field].toString().toUpperCase().includes(value.toLocaleUpperCase());
                    if(!result) popOutKeyValue(object[keyFieldName]);
                    return result;
                }
            );
        }
        else if(comparisionType=="select"){
            if(value=="all") return array
            return array.filter(
                (object:any)=>{
                    const result=object[field].indexOf(value) !=-1;
                    if(!result) popOutKeyValue(object[keyFieldName]);
                    return result
                }
            )
        }
        else return array
    }
    //updates products to display based on the filtervaluesobject
    const updateProductsToShow=(filterValuesObject:filterValuesObejct, filteredProducts=products)=>{
        Object.keys(filterValuesObject).forEach(
            (field)=>{
                filteredProducts=filterArray(filteredProducts,field,filterValuesObject[field]);
            }
        )
        setPage(0);
        setKeysChecked([]);
        SetProductsToShow(filteredProducts);
    }
    //returns sorted products based on fieldname and sort order
    const sortTheProducts=(array:any[],field:string, sortOrder:number=0)=>{
        if(typeof(array[0][field])=="number")
            return array.sort((a,b)=>((a[field] - b[field])*sortOrder));
        return array.sort((a,b)=>(a[field].localeCompare(b[field]))*sortOrder);
    }
    const onSortClicked=(field:string,sortOrder:number)=>{
        SetProductsToShow((prev:any[])=>sortTheProducts(prev,field,sortOrder));
        setSortField([field,sortOrder]);
    } 
    //check all and uncheck all in the page
    const checkAllInPage=()=>{
        const keyFieldName=getKeyFieldName();
        let finalArray:any=[];
        productsToShow.slice((page*rowsPerPage),(page*rowsPerPage)+rowsPerPage).forEach(
            (productObject:any)=>{
                finalArray.push(productObject[keyFieldName]);
            }
        )
        setKeysChecked(finalArray);
    }
    const unCheckAll=()=>{
        setKeysChecked([])
    }
    //updates total no. of editing rows
    const updateEditingRows=useCallback((status:boolean)=>{
        if(status) setEditingRows((prev)=>prev+1)
        else setEditingRows((prev)=>prev-1)
    },[]);
    //bulkupdation
    const [bulkUpdateState,setBulkUpdateState]=useState(false);
    const [formField,setFormField]=useState('');
    const [formString,setFormString]=useState("");
    const [formType,setFormType]=useState("");
    const [formOptions,setFormOptions]=useState<string[]>([]);
    
    const handleBulkUpdateDivOpen=(formString:string,fieldName:string,fieldType:string,formOptions:string[]=[])=>{
        setFormField(fieldName);
        setFormString(formString);
        setFormType(fieldType);
        setFormOptions(formOptions)
        setBulkUpdateState(true);
    }
    const handleBulkUpdateDivClose=()=>{
        setBulkUpdateState(false);
    }
    const bulkUpdateField=async (fieldName:string,value:number)=>{
        if(formType=="number"){
            value=value/100*100
        }
        const keyFieldName=getKeyFieldName();
        let finalArray:any=[];
        productsToShow.slice((page*rowsPerPage),(page*rowsPerPage)+rowsPerPage).map(
            (productObject:any)=>{
                const keyId=productObject[keyFieldName];
                
                if(keysChecked.indexOf(keyId)>-1){
                    let newProductObject={...productObject,[fieldName]:value};
                    const productModificationObject:any={[fieldName]:fieldName==="Discount"?value/100:value};

                    productFields.map((fieldObject:any)=>{
                        if(fieldObject.type=="calc"){
                            // const expression=fieldObject.calc;
                            const calculatedValue=roundOff1(calculate(fieldObject.calc,newProductObject));
                            newProductObject[fieldObject.field]=calculatedValue;
                            productModificationObject[fieldObject.field]=calculatedValue;
                        }
                    })
                    finalArray.push({productDocumentId:keyId,productObjectModification:productModificationObject})
                }
            }
        )
        // console.log(finalArray);
        const response=await useUpdateMultipleProductsAPI(finalArray);
        if(response.length==finalArray.length){
            showMessage("All requests are Processed!")
        }
        else{
            const modifiedObjects=response.join(", ");
            showMessage(`Able to modify : ${modifiedObjects}`, 3000);
        }
        fetchProducts();
    }
    //end
    const actions:{action:string,func:Function}[]=[
        {action:"edit",func:editFunction},
        {action:"delete",func:deleteFunction},
        {action:"check",func:checkFunction}
    ];
    return (
        <div>
            <div
                style={{
                    display:"flex",
                    margin:"10px",
                    
                    justifyContent:"center",
                    alignContent:"center",
                }}
            >
                <div style={{flex:1,alignContent:"center"}}>
                    <Badge badgeContent={discrepancies.length} color="error" style={{marginRight:"50px"}}>
                        
                        <Button onClick={toggleViewDiscrepancies}>
                        {!viewDiscrepancy && <VisibilityIcon sx={{marginRight:"5px"}}/>}
                        {viewDiscrepancy && <VisibilityOffIcon sx={{marginRight:"5px"}}/>}
                            Descrepancies
                        </Button>
                    </Badge>
                    <Badge badgeContent={keysChecked.length} color="success" style={{marginRight:"20px"}}>
                        <TaskIcon />
                    </Badge>
                    <Button style={{margin:"7px", color:"#FF4081"}} variant="outlined" onClick={()=>handleBulkUpdateDivOpen("Discount","Discount","number")} disabled={keysChecked.length===0?true:false}>Update Discount</Button>
                    <Button style={{margin:"7px", color:"#E040FB"}} variant="outlined" onClick={()=>handleBulkUpdateDivOpen("Quantity","Quantity","number")} disabled={keysChecked.length===0?true:false}>Update Qty.</Button>
                    <Button style={{margin:"7px", color:"#FF9800"}} variant="outlined" onClick={()=>handleBulkUpdateDivOpen("Price","Price","number")} disabled={keysChecked.length===0?true:false}>Update Price.</Button>
                    <Button style={{margin:"7px", color:"#00C853"}} variant="outlined" onClick={()=>handleBulkUpdateDivOpen("Product Visibility","ProductVisibility","select",["Yes","No"])} disabled={keysChecked.length===0?true:false}>Update Visibility</Button>
                </div>
                <TablePagination
                    component="div"
                    count={productsToShow.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[]}
                />
            </div>
            <Dialog
                open={bulkUpdateState}
                onClose={handleBulkUpdateDivClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries((formData as any).entries());
                      const formValue = formJson.formValue;
                    //   updateDiscount(discount);
                      bulkUpdateField(formField,formValue);
                      handleBulkUpdateDivClose();
                    },
                  }}
            >
                <DialogContent>
                    <DialogContentText>
                        Enter {formString} to Update for the selected Products:
                    </DialogContentText>
                    {formType!="select" &&
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="formValue"
                            name="formValue"
                            label={formString}
                            type={formType}
                            inputProps={{ step: "0.001" }}
                            fullWidth
                            variant="standard"
                        />
                    }
                    {formType=="select" &&

                        <TextField
                            select
                            autoFocus
                            required
                            margin="dense"
                            id="formValue"
                            name="formValue"
                            label={formString}
                            fullWidth
                            defaultValue={formOptions[0]}
                            // onChange={(e) => setValue(e.target.value)}
                            variant="outlined"
                            sx={{
                                "& .MuiInputBase-root":{
                                    padding:"7px",
                                    paddingLeft:"10px"
                                }
                            }}
                            >
                            {formOptions.map((option) => (
                                <MenuItem style={{display:"block", padding:"5px"}} key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBulkUpdateDivClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>  
            </Dialog>
            {
                message &&
                <div
                    style={{
                        textAlign:"center",
                        fontSize:"1.2em",
                        marginTop:"10px",
                        marginBottom:"10px",
                        background:"#C6FF00",
                        padding:"10px"
                    }}
                >
                    {message}
                </div>
            }
            <div className="productsDisplayDiv">
                <table>
                    <thead>
                        <tr>
                            <th style={{width:"100px"}}>
                                <div>
                                    <div>
                                        Actions
                                    </div>
                                    <div>
                                        <DoneAllIcon sx={{color:green[500], marginRight:"6px", marginTop:"5px", cursor:"pointer"}} fontSize="small" onClick={checkAllInPage}/>
                                        <RemoveDoneIcon sx={{color:pink["A400"], cursor:"pointer"}} fontSize="small" onClick={unCheckAll}/>
                                    </div>
                                </div>
                            </th>
                            {
                                productFields.map(
                                    (field,index)=> {
                                        if(!field.columnVisible){
                                            return <></>
                                        }
                                        return (
                                                <th key={index}>
                                                    <div style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"flex-start"}}>
                                                        <div style={{display:"flex",flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
                                                            <div style={{flex:1}}>{field.title}</div>
                                                            <div>
                                                                {
                                                                    field.toolbar?.map(
                                                                        (tool,index)=>{
                                                                            if(tool=="sort"){
                                                                                let targetSortOrder=1;
                                                                                let rotateAngle=180;
                                                                                let color="white";
                                                                                if(sortField[0]==field.field){
                                                                                    color="#00ff00";
                                                                                    if(sortField[1]==1){
                                                                                        targetSortOrder=-1;
                                                                                        rotateAngle=0;
                                                                                    }
                                                                                   
                                                                                }
                                                                                return(
                                                                                    <IconButton
                                                                                        key={index}
                                                                                        style={{height:"10px", width:"10px", marginLeft:"10px"}}
                                                                                        size="medium"
                                                                                        onClick={()=>onSortClicked(field.field,targetSortOrder)}
                                                                                        disabled={editingRows>0}
                                                                                    >
                                                                                        <FilterListIcon
                                                                                            fontSize="small"
                                                                                            key={index}
                                                                                            style={{color:color, transform:`rotate(${rotateAngle}deg)`}}
                                                                                            
                                                                                        />
                                                                                    </IconButton>
                                                                                )
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {
                                                                field.toolbar?.map(
                                                                    (tool,index)=>{
                                                                        if(tool=="search"){
                                                                            return (
                                                                                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                                                                    <TextField
                                                                                        size="small"
                                                                                        variant="outlined"

                                                                                        sx={{background:"white",marginTop:"5px", borderRadius:"5px",width:`${field.style?.width}`,
                                                                                        "& .MuiInputBase-input":{
                                                                                            padding:"4px", fontSize:"0.8em"
                                                                                        }
                                                                                        }}
                                                                                        key={index}
                                                                                        value={filterValues[field.field]?filterValues[field.field]:""}
                                                                                        onChange={(e)=>{updateFilterValues(field.field,e.target.value)}}
                                                                                        disabled={editingRows>0}
                                                                                    />
                                                                                    <SearchIcon
                                                                                        style={{position:"relative", left:"-25px", top:"3px", zIndex:10, color:"black" }}
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        else if(tool=="select"){
                                                                            return(
                                                                                <Select
                                                                                    key={index}
                                                                                    size="small"
                                                                                    value={filterValues[field.field]?filterValues[field.field]:"all"}
                                                                                    onChange={(e)=>{updateFilterValues(field.field,e.target.value)}}
                                                                                    sx={{background:"white", marginTop:"5px",width:`${field.style?.width}`,
                                                                                    "& .MuiSelect-select":{
                                                                                        padding:"2px", fontSize:"0.8em"
                                                                                    }
                                                                                    }}
                                                                                    disabled={editingRows>0}
                                                                                >
                                                                                    <MenuItem value={"all"} style={{display:"block", padding:"5px", textAlign:"left"}}>All</MenuItem>
                                                                                    {
                                                                                        field.selectOptions?.map(
                                                                                            (option,index)=>{
                                                                                                return (<MenuItem value={option} key={index}  style={{display:"block", padding:"5px", textAlign:"left"}}>{option}</MenuItem>)
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                </Select>
                                                                            )
                                                                        }
                                                                    }
                                                                )
                                                            }
                                                        </div>
                                                    </div> 
                                                </th>)
                                    }
                                )
                            } 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productsToShow.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map(
                                (thisProduct:any, index:any)=>{
                                    return(
                                        <GetTableRow
                                            tableRowData={thisProduct}
                                            fieldsData={productFields}
                                            actions={actions}
                                            
                                            key={thisProduct._id}
                                            editFreezeFunction={updateEditingRows}
                                            checkStatus={keysChecked.indexOf(thisProduct[keyFieldName])>-1}
                                        />
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}