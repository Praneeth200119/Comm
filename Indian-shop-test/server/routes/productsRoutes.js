const express = require("express");
// const multer=require("multer");
// const { getBestSellers, getProductCategories, getProducts } = require("../DB/ProductsModule/productsDB.js");
// const { processAddProduct, processUpdate, processDelete, processGetProductsRequest, processGetCategoriesRequest } = require("../DB/ProductsModule/productsMiddleware.js");
const dbClient = require("../client/dbClient");

const router = express.Router();

//Get All products
router.get("/all", async (req, res) => {
  try {
    const products = await dbClient.getAllProducts();
    res.status(200).json({ status: "success", products: products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/allcategories", async (req, res) => {
  try {
    const categories = await dbClient.getProductCategories();
    res.status(200).json({ status: "success", categories: categories });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// router.get("/allcategories/:order", async (req, res) => {
//   try {
//     const categories = await getProductCategories({ sort: { CAT_ID: req.params.order } });
//     res.status(200).json({ status: "success", categories: categories });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// router.get("/bestsellers", async (req, res) => {
//   try {
//     const products = await getBestSellers({});
//     res.status(200).json({ status: "success", products: products });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// router.get("/bycategoryid/:id", async (req, res) => {
//   try {
//     const products = await getProducts({ CAT_ID: req.params.id });
//     if (products.length > 0)
//       res.status(200).json({ status: "success", products: products });
//     else
//       res.status(200).json({ status: "nil", products: products });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// router.get("/byproductid/:id", async (req, res) => {
//   try {
//     const products = await getProducts({ PROD_ID: req.params.id });
//     if (products.length > 0)
//       res.status(200).json({ status: "success", products: products });
//     else
//       res.status(200).json({ status: "nil", products: products });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// router.post("/add", processAddProduct, (req, res) => {
//   if (req.error) {
//     if (req.error.code === 11000) {
//       res.status(200).json({ status: "fail", errorMessage: "Duplicate Product Id provided." });
//     }
//   }
//   else {
//     res.status(200).json({ "status": "success", newId: req.newProductId });
//   }
//   res.end();
// });
// router.post("/updateproduct", processUpdate, (req, res) => {
//   if (req.status === 'success') res.status(200).json({ 'status': 'success' });
//   else res.status(200).json({ 'status': 'fail' });
//   res.end();
// })
// router.post("/delete", processDelete, (req, res) => {
//   res.status(200).json(req.result);
//   res.end();
// })
//getCategories: {id,name}, getBestSellers: , getProductsByCategoryId, getProductByProductId, getProducts : addProduct, editProduct, deleteProduct,
//post requests
//=>/products/getproducts=>{filterType:string (all,bestSellers,byCategoryId,byProductId),filterValue:string,sortby:{fieldName:'asc' || 'desc'},limit:{from:,to}}

// router.post("/getproducts", processGetProductsRequest, (req, res) => {
//   const products = req.products;
//   if (products.length > 0)
//     res.status(200).json({ 'status': 'success', products: products });
//   else res.status(404).json({ 'status': 'fail', products: [] });
// })

router.post("/getproducts", async (req, res) => {
  try {
    const products = await dbClient.getAllProducts();
    res.status(200).json({ status: "success", products: products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/getcategories", async (req, res) => {
  try {
    const categories = await dbClient.getProductCategories();
    res.status(200).json({ status: "success", categories: categories });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/getProductsByCategoryId", async (req, res) => {
  try {
    const categoryId = req.body.categoryId;
    const products = await dbClient.getProductsByCategoryId(categoryId);
    res.status(200).json({ status: "success", products: products });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/addProduct", async (req, res) => {
  try {
    const productObject = req.body.product;
    const newProductId = await dbClient.addProduct(productObject);
    res.status(200).json({ status: "success", newProductId: newProductId });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/updateProduct", async (req, res) => {
  try {
    const productObject = req.body.product;
    const productDocumentId=req.body.productDocumentId;
    const modifiedProductCount = await dbClient.updateProduct(productDocumentId,productObject);
    res.status(200).json({ status: "success", count: modifiedProductCount });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/updateMultipleProducts", async (req, res) => {
  try {
    const modificationArray=req.body.modificationArray;
    let modifiedProductDocumentIds=[]
    for(const modificationObject of modificationArray){
      const productObject = modificationObject.productObjectModification;
      const productDocumentId=modificationObject.productDocumentId;
      const modifiedProductCount = await dbClient.updateProduct(productDocumentId,productObject);
      if(modifiedProductCount>0) modifiedProductDocumentIds.push(productDocumentId)
    }
    res.status(200).json({ status: "success", modifiedProductDocumentIds: modifiedProductDocumentIds });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/deleteProduct", async (req, res) => {
  try {
    const productObject = req.body.productDocumentId;
    const deleteProductCount = await dbClient.updateProduct(productObject);
    res.status(200).json({ status: "success", count: deleteProductCount });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/getProductsByFilter", async (req, res) => {
  try {
    const filter = req.body.filter;
    const products = await dbClient.getProductsByFilter(filter);
    res.status(200).json({ status: "success", products: products });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/getBrands", async (req, res) => {
  try {
    const brands = await dbClient.getBrands();
    res.status(200).json({ status: "success", brands: brands });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//=>/products/categories => {sort:asc/desc}
// router.post("/getcategories", processGetCategoriesRequest, (req, res) => {
//   const categories = req.categories || [];
//   if (categories.length > 0)
//     res.status(200).json({ 'status': 'success', categories: categories });
//   else res.status(404).json({ 'status': 'fail', categories: [] });
//   res.end();
// })
module.exports = router;
