const mongoose =require("mongoose");
const {Schema, model}=mongoose;

const productSchema=new Schema({
    PROD_ID: {type:Number, required:true, unique:true },
    CAT_ID: {type:Number, required:true },
    CAT_NAME:{type:String, default:""},
    Name: {type:String, required:true},
    Brand:{type:String, default:""},
    NoofUnits: {type:Number, required:true},
    UnitWeight: {type:mongoose.Types.Decimal128, default:0},
    NetWeight: {type:mongoose.Types.Decimal128, default:0},
    Quantity: {type:Number, default:0},
    Price: {type:mongoose.Types.Decimal128, required:true},
    Discount: {type:mongoose.Types.Decimal128, default:0},
    DiscountedPrice: {type:mongoose.Types.Decimal128, required:true},
    PricePerUnitQuantity: {type:mongoose.Types.Decimal128, required:true},
    NoOfQuantitiesOnDiscountedPrice:{type:Number,required:true},
    Labels: {type:[String],default:[]},
    Description: {type:String,required:true},
    Information: {type:String,required:true},
    DietaryInfo: {type:[String],default:[]},
    PROD_IMG: {type:String,default:""}
});

const productModel=new model("Product",productSchema);
module.exports=productModel;