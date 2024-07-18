import React from "react";

import ShopByCategoriesRenderer from "../Shop-By-Category/Shop-By-Categories-Renderer";
import ShopByBrandRenderer from "../Shop-By-Brand/Shop-By-Brand-Renderer";
import GroceryItemCardRenderer from "../Grocery-Item-Card/Grocery-Item-Card-Renderer";
import NavBarRenderer from "../Components-Nav-Bar/Nav-Bar-Renderer";
import FooterRenderer from "../Components-Footer/Footer-Renderer";
import ProductDetailsRenderer from "../Components-Product-Details/Product-Details-Renderer";
import GoogleReviewsRenderer from "../Components-Google-Reviews/Google-Reviews-Renderer";
import BestSellersRenderer from "../Components-Best-Sellers/Best-Sellers-Renderer";
import KitchenHomeSupplyRenderer from "../Components-Kitchen-Home-Supply/Kitchen-Home-Supply-Renderer";
import { SignUp, SignInRenderer } from "../Components-User-Account";
import BannerRenderer from "../Components-Banner/Banner-Renderer";
import GroceryItemForm from "../Components-Grocery-Item/Grocery-Item-Form";
import ProductListingPageRenderer from "../Product-Listing-Page/Product-Listing-Page-Renderer";
import { Link } from "react-router-dom";

export default function HomeComponentRenderer() {


  return (
    <>
      <BannerRenderer />
      <ShopByCategoriesRenderer />
      <BestSellersRenderer />
      <GoogleReviewsRenderer />
      <KitchenHomeSupplyRenderer />
      <ShopByBrandRenderer />
      
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
