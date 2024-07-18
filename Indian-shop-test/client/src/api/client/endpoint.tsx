const apiConfig = {
	// BASE_URL: "https://3.66.63.30:3000/",
	// BASE_URL: "http://3.79.130.16:3000/",
	// BASE_URL: "https://18.198.91.78:8080/",
	BASE_URL: "https://indianshopmilano.com/",
	// BASE_URL: "https://localhost:8080/",
	GET: {
		GET_PRODUCTS: "/products/all",
		GET_CATEGORIES: "/products/allcategories",
	},
	POST: {
		PRODUCTS: "/products/getproducts",
		CATEGORIES: "/products/categories",
		PRODUCTSBYFILTER: "/products/getProductsByFilter",
		PRODUCTSBYCATID: "/products/getProductsByCategoryId",
		BRANDS: "/products/getBrands",
		UPDATEONEPRODUCT:"/products/updateProduct",
		UPDATEMULTIPLEPRODUCTS:"/products/updateMultipleProducts",
		DELETEONEPRODUCT:"/products/deleteProduct",
		DELETEMULTIPLEPRODUCTS:"/products/deleteMultipleProducts"
	},
	PUT: {
	},
	DELETE: {

	},
};

export default apiConfig;
