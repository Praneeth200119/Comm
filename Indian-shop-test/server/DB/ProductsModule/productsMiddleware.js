const { getBestSellers, getProductCategories, getProducts } =require("./productsDB.js");
const { insertProduct, updateProduct, deleteProduct } = require("./productsDB.js");

const processGetProductsRequest=async (req,res,next)=>{
    console.log(req.body);
    const requestBody=req.body;
    const requestType=requestBody.filterType;
    const sortBy=requestBody.sortby || {};
    const limit=requestBody.limit || {}
    let limitStart=limit.from || 1;
    limitStart=limitStart-1; //convert to index of array
    const limitEnd=limit.to || false;

    if(requestType==='all'){
        try{
            let products=[];
            if(limitEnd) products=await getProducts({},{sort:sortBy,limit:limitEnd});
            else products=await getProducts({},{sort:sortBy});
            if(limitStart>limitEnd) products=[];
            req.products=products.slice(limitStart);
        }catch (err){
            res.status(500).json({ status:"fail",errorMessage: "Internal Server Error" });
        }
    }
    else if(requestType==='bestSellers'){
        try{
            let products=[];
            if(limitEnd) products=await getProducts({Labels:"Bestsellers"},{sort:sortBy,limit:limitEnd});
            else products=await getProducts({Labels:"Bestsellers"},{sort:sortBy});
            if(limitStart>limitEnd) products=[];
            req.products=products.slice(limitStart);
        }catch (err){
            res.status(500).json({ status:"fail",errorMessage: "Internal Server Error" });
        }
    }
    else if(requestType==='byCategoryId'){
        const catId=requestBody.filterValue || false;
        if(catId){
            try{
                let products=[];
                if(limitEnd) products=await getProducts({CAT_ID:catId},{sort:sortBy,limit:limitEnd});
                else products=await getProducts({CAT_ID:catId},{sort:sortBy});
                if(limitStart>limitEnd) products=[];
                req.products=products.slice(limitStart);
            }catch (err){
                res.status(500).json({ status:"fail",errorMessage: "Internal Server Error" });
            }
        }
        else return res.status(404).json({ status:"fail",errorMessage: "Category Id not provided" })
    }
    else if(requestType==='byProductId'){
        const productId=requestBody.filterValue || false;
        if(productId){
            try{
                req.products=await getProducts({PROD_ID:productId});
            }catch (err){
                res.status(500).json({ status:"fail",errorMessage: "Internal Server Error" });
            }
        }
        else return res.status(404).json({ status:"fail",errorMessage: "Product Id not provided" });
    }
    else{
        res.status(404).json({ status:"fail",errorMessage: "Bad Request" })
    }
    next();
}
const processGetCategoriesRequest=async (req,res,next)=>{
    const requestBody=req.body;
    const sortBy=requestBody.sort || 'asc';
    const limit=requestBody.limit || {}
    let limitStart=limit.from || 1;
    limitStart=limitStart-1; //convert to index of array
    const limitEnd=limit.to || false;

    try{
        let categories=[];
        if(limitEnd) categories=await getProductCategories({sort:{CAT_ID:sortBy},limit:limitEnd});
        else categories=await getProductCategories({sort:{CAT_ID:sortBy}});
        if(limitStart>limitEnd) categories=[];
        req.categories=categories.slice(limitStart);
    }catch (err){
        res.status(500).json({ status:"fail",errorMessage: "Internal Server Error" });
    }
    next();
}
const processAddProduct=async (req,res,next)=>{
    const result=await insertProduct(req.body.productObject);
    if(result.status==="success"){
        req.newProductId=result.newProductId;
    }
    else{
        req.error=result.error;
    }
    next();
}
const processUpdate=async (req,res,next)=>{
    const updateObject=req.body.updateObject;
    if('PROD_ID' in updateObject) return res.status(404).json({'status':'fail','errorMessage':'cannot modify PROD_ID'})
    const result=await updateProduct(req.body.productId,req.body.updateObject);
    if(result.status="success") req.status='success'
    else req.status="fail";
    next();
}
const processDelete=async (req,res,next)=>{
    req.result=await deleteProduct(req.body.productId);
    next();
}
module.exports={processAddProduct, processUpdate, processDelete, processGetProductsRequest, processGetCategoriesRequest};