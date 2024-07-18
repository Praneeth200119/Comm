import { Navigate, useRoutes } from "react-router-dom";
import { appLinks } from "./appLinks";
import ShopByCategoriesRenderer from "../components/Shop-By-Category/Shop-By-Categories-Renderer";
import ShopByBrandRenderer from "../components/Shop-By-Brand/Shop-By-Brand-Renderer";
import GroceryItemCardRenderer from "../components/Grocery-Item-Card/Grocery-Item-Card-Renderer";
import NavBarRenderer from "../components/Components-Nav-Bar/Nav-Bar-Renderer";
import FooterRenderer from "../components/Components-Footer/Footer-Renderer";
import ProductDetailsRenderer from "../components/Components-Product-Details/Product-Details-Renderer";
import GoogleReviewsRenderer from "../components/Components-Google-Reviews/Google-Reviews-Renderer";
import BestSellersRenderer from "../components/Components-Best-Sellers/Best-Sellers-Renderer";
import KitchenHomeSupplyRenderer from "../components/Components-Kitchen-Home-Supply/Kitchen-Home-Supply-Renderer";
import { SignUp, SignInRenderer } from "../components/Components-User-Account";
import React from "react";
export const AppRoutes = () => {
	const elements = useRoutes([
		{
			path: appLinks.index,
			element: <ShopByCategoriesRenderer />,
		}
	]);

	return elements;
};
