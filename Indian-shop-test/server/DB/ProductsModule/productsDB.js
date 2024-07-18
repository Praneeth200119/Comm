const mongoose=require('mongoose');
const productModel =require("./productsModel.js");
const products=require("../../mockdata/products.json")
const {getDetails}=require("../../images/base64Images.js");

const getProducts=async(filterObject,options={})=>{
    //Dep: productModel
    const query=productModel.find(filterObject);
    if(options.sort) query.sort(options.sort);
    if(options.limit) query.limit(options.limit);
    return await query.exec();
  }
const getProductCategories=async(options={})=>{
    //Dep: productModel
    const query=productModel.find({},"CAT_ID CAT_NAME PROD_IMG");
    if(options.sort) query.sort(options.sort);
    if(options.limit) query.limit(options.limit);
    const result=await query.exec();
    var uniquecategoryObjects=[]
    const uniqueCategoryIds=[];
    for (let categoryObject of result){
        const id=categoryObject.CAT_ID;
        const name=categoryObject.CAT_NAME;
        if(uniqueCategoryIds.indexOf(id)===-1){
            uniqueCategoryIds.push(id);
            uniquecategoryObjects.push({CAT_ID:id,CAT_NAME:name,PROD_IMG:categoryObject.PROD_IMG});
        }
    }
    return uniquecategoryObjects;
}
const getBestSellers=async ()=>{
    //Dep: productModel, getProducts
    return await productModel.find({Labels:"Bestsellers"});
}
const insertProduct=async (productObject)=>{
    //Dep: productModel
    try{
        const product=await productModel.create(productObject);
        return {status:"success",newProductId:product.PROD_ID}
    }catch (e){
        console.log(e);
        return {status:"fail",error:e}
    }
}
const pushProducts=async (limit=1)=>{
    let count=1;
    let i=0;
    while (count<=limit){
        const thisProduct=products.Inventory[i];
        let thisCatId=thisProduct.CAT_ID;
        while(thisCatId>8){
            thisCatId=thisCatId-8;
        }
        thisProduct.CAT_ID=thisCatId;
        count++;
        let details=getDetails(thisProduct.CAT_ID);
        thisProduct.CAT_NAME=details.CAT_NAME;
        thisProduct.PROD_IMG=details.base64Image;
        console.log(count-1)
        console.log(await insertProduct(thisProduct));

        
        i++;
    }
}
function mongoosePush(){
    const connectString="mongodb+srv://krishnaraodemudamma:cVKRP58Co5WPp8LS@shoppingapp.kjexwsq.mongodb.net/shopping-app?retryWrites=true&w=majority&appName=ShoppingApp";
    try {
        mongoose.connect(connectString).then(() => {
            console.log(" Mongoose is connected");
            pushProducts(50);
        });
    } catch (e) {
        console.log("could not connect");
        console.log(e);
    }
}
const updateProduct=async (productId, modifyObject)=>{
    try{
        const products=await productModel.updateOne({PROD_ID:productId},modifyObject)
        if(products.acknowledged)
            return {status:"success"}
        else return {status:"fail"}
    }catch (e){
        return {status:"fail"}
    }
}
const deleteProduct=async (productId)=>{
    try{
        const deletedCount=(await productModel.deleteOne({PROD_ID:productId})).deletedCount;
        if(deletedCount>0) return {status:'success',}
        else return {status:'fail',errorMessage:"couldn't find the productId"}
    }catch{
        return {status:'fail',errorMessage:'unknownerror'};
    }
}
module.exports={insertProduct, getBestSellers, getProductCategories, getProducts, updateProduct, deleteProduct};