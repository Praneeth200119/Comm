import React from "react"
import Form from "../../formComponent/Form"
import {Grid} from "@mui/material"
export default function AddProduct(){
    const title="Add Product";
    const fieldsArray=[
        {fieldName:"Name", fieldLabel:"Product Name", fieldType:"text", validationSchema:{notEmpty:true,required:true}},
        {fieldName:"Cat_Name", fieldLabel:"Category Name", fieldType:"select", options:[{option:"Snacks",value:"Snacks"},{option:"Milk",value:"Milk"}], validationSchema:{notEmpty:true,required:true}},
        {fieldName:"Brand", fieldLabel:"Brand Name", fieldType:"select", options:[{option:"Maggi",value:"Maggi"},{option:"Heritage",value:"Heritage"}], validationSchema:{notEmpty:true,required:true}},
        {fieldName:"NoofUnits", fieldLabel:"No. of Units", fieldType:"text", validationSchema:{notEmpty:true,required:true, pattern:{value:/[0-9]+/,errorMessage:"Expect only Integers"}}},
        {fieldName:"Units", fieldLabel:"Units", fieldType:"select", options:[{option:"kg",value:"kg"},{option:"l",value:"l"},{option:"Nos",value:"Nos"}], validationSchema:{notEmpty:true,required:true}},
        {fieldName:"UnitWeight", fieldLabel:"Unit Weight", fieldType:"text", validationSchema:{notEmpty:true,required:true}},
        {fieldName:"NetWeight", fieldLabel:"Net Weight", fieldType:"text", validationSchema:{notEmpty:true,required:true}},
        {fieldName:"Quantity", fieldLabel:"Quantity", fieldType:"text", validationSchema:{notEmpty:true,required:true}},
        {fieldName:"Price", fieldLabel:"Price", fieldType:"text", validationSchema:{notEmpty:true,required:true}},
        {fieldName:"Discount", fieldLabel:"Discount", fieldType:"text", validationSchema:{notEmpty:true,required:true}},
        {fieldName:"NoOfQuantitiesOnDiscountedPrice", fieldLabel:"Qt. for Discount", fieldType:"text", validationSchema:{notEmpty:true,required:true}},
        {fieldName:"ProductVisibility", fieldLabel:"Product Visibility", fieldType:"select", options:[{option:"Yes",value:"Yes"},{option:"No",value:"No"}], validationSchema:{notEmpty:true,required:true}},
        {fieldName:"Labels", fieldLabel:"Labels", fieldType:"selectItems", options:[{option:"Best Sellers",value:"Best Sellers"},{option:"New Arrivals",value:"New Arrivals"},{option:"On Sale",value:"On Sale"}], validationSchema:{notEmpty:{value:true,errorMessage:"required"}}},
        {fieldName:"DietaryInfo", fieldLabel:"Dietary Infor.", fieldType:"selectItems", options:[{option:"Vegan",value:"Vegan"},{option:"Guten Free",value:"Guten Free"}], validationSchema:{notEmpty:{value:true,errorMessage:"required"}}},
        {fieldName:"Description", fieldLabel:"Description", fieldType:"textBox", validationSchema:{notEmpty:true,required:true}},
    ]
    const submitHandler=(data:any)=>{
        console.log(data);
    }
    return(
        <div
            style={{
                display:"flex",
                justifyContent:"center",
                margin:"auto",
                marginTop:'10px',
                marginBottom:'10px',
                width:"90%"
            }}
        >
                <Grid
                    sx={{width:{xs:"100%",sm:'80%',md:'60%',lg:'60%',xl:'50%'}}}
                    style={{background:"white"}}
                >
                    <Form fieldsArray={fieldsArray} columns={2} title={title} submitHandler={submitHandler}/>
                </Grid>
            
            {/* Will be coming soon */}
        </div>
    )
}