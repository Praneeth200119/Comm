import React from "react";
import ShopByCategoriesRenderer from "./components/Shop-By-Category/Shop-By-Categories-Renderer";
import ShopByBrandRenderer from "./components/Shop-By-Brand/Shop-By-Brand-Renderer";
import GroceryItemCardRenderer from "./components/Grocery-Item-Card/Grocery-Item-Card-Renderer";

import FooterRenderer from "./components/Components-Footer/Footer-Renderer";
import ProductDetailsRenderer from "./components/Components-Product-Details/Product-Details-Renderer";
import GoogleReviewsRenderer from "./components/Components-Google-Reviews/Google-Reviews-Renderer";
import BestSellersRenderer from "./components/Components-Best-Sellers/Best-Sellers-Renderer";
import KitchenHomeSupplyRenderer from "./components/Components-Kitchen-Home-Supply/Kitchen-Home-Supply-Renderer";
import { SignUp, SignInRenderer } from "./components/Components-User-Account";
import BannerRenderer from "./components/Components-Banner/Banner-Renderer";
import GroceryItemForm from "./components/Components-Grocery-Item/Grocery-Item-Form";
import ProductListingPageRenderer from "./components/Product-Listing-Page/Product-Listing-Page-Renderer";
import { Link, Outlet } from "react-router-dom";

import HomeComponentRenderer from "./components/Components-Home/Home-Component-Renderer";

export default function App() {


  return (
    <>

      
      <HomeComponentRenderer />
      
      {/* <ProductDetailsRenderer
        name={"Product Name"}
        description={"Product Description"}
        images={[
          "https://i5.walmartimages.com/asr/90cdb9fd-c2d6-4f10-90c4-bbc16c6963a2.8590ae0e3e7ab073316455a9dd9cfd87.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
          "https://i5.walmartimages.com/asr/90cdb9fd-c2d6-4f10-90c4-bbc16c6963a2.8590ae0e3e7ab073316455a9dd9cfd87.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
          "https://i5.walmartimages.com/asr/90cdb9fd-c2d6-4f10-90c4-bbc16c6963a2.8590ae0e3e7ab073316455a9dd9cfd87.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        ]}
        price={10.99}
      /> */}
      {/* <GroceryItemForm /> */}
      {/* <ProductListingPageRenderer /> */}
    </>
  )
}
