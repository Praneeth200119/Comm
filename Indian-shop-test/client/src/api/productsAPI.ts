import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiConfig from "./client/endpoint";
import api from "./client/webClient";

// Get Products API => returns all the products
export const useGetProductsAPI = (): Promise<any> => {
  const url = apiConfig.GET.GET_PRODUCTS;

  return api.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(
    (resp) => {
      let response = resp.data;
      return response;
    }
  ).catch(
    (error) => {
      console.log(error);
      return [];
    }
  );
};

// Get All Categories API
export const useGetAllCategoriesAPI = (): Promise<any> => {
  const url = apiConfig.GET.GET_CATEGORIES;

  return api.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(
    (resp) => {
      let response = resp;
      return response;
    }
  ).catch(
    (error) => {
      console.log(error);
      return [];
    }
  );
};

// Categories API
type category = {
  CAT_ID: number,
  CAT_NAME: string,
  PROD_IMG: string
};

export const useCategoriesAPI = (): Promise<category[]> => {
  const url = apiConfig.POST.CATEGORIES;

  return api.post("/products/getcategories", { sort: "asc" }).then(
    (categories) => {
      if (categories.data.status === "success") {
        return categories.data.categories;
      } else {
        return [];
      }
    }
  ).catch(
    (error) => {
      console.log(error);
      return [];
    }
  );
};

// Get Products by Filter API-> returns only visible products
export const useGetProductsByFilterAPI = (filterObject: any): Promise<any[]> => {
  const url = apiConfig.POST.PRODUCTSBYFILTER;
  return api.post(url, filterObject).then(
    (response) => {
      
      if (response.data.status === "success") {
        return response.data.products.filter((product:any)=>{return product.ProductVisibility=="Yes"});
      } else {
        return [];
      }
    }
  ).catch(
    (error) => {
      console.log(error);
      return [];
    }
  );
};

// Get Products by Category ID API -> returns only visible products
export const useGetProductsByCategoryIDAPI = (catId: any): Promise<any[]> => {
  const url = apiConfig.POST.PRODUCTSBYCATID;

  return api.post(url, { "categoryId": catId }).then(
    (response) => {
      if (response.data.status === "success") {
        console.log(response.data.products);
        return response.data.products.filter((product:any)=>product.ProductVisibility=="Yes");
      } else {
        return [];
      }
    }
  ).catch(
    (error) => {
      console.log(error);
      return [];
    }
  );
};

// Get Products by Category API
export const useGetProductsByCategoryAPI = (categoryId: any): Promise<any[]> => {
  const url = apiConfig.POST.PRODUCTS;

  return api.post(url, { filterType: "byCategoryId", filterValue: categoryId }).then(
    (response) => {
      if (response.data.status === "success") {
        return response.data.products;
      } else {
        return [];
      }
    }
  ).catch(
    (error) => {
      console.log(error);
      return [];
    }
  );
};

export const  useGetBrandsAPI = async () => {
	const url = apiConfig.POST.BRANDS;

	try{
		const categories=await api.post(url);
		if(categories.data.status==="success"){
			return categories.data.brands;
		}
		else{
			return [];
		}
	}catch(error){
		console.log(error);
		return [];
	}
};
export const useUpdateOneProductAPI=async (productDocumentId:any,productObject:any)=>{
  const url = apiConfig.POST.UPDATEONEPRODUCT;

  return api.post(url, { productDocumentId:productDocumentId,product: productObject }).then(
    (response) => {
      if (response.data.status === "success") {
        return true;
      } else {
        return false;
      }
    }
  ).catch(
    (error) => {
      console.log(error);
      return false;
    }
  );
}
export const useUpdateMultipleProductsAPI=async (arrayOfModificationObjects:any)=>{
  const url = apiConfig.POST.UPDATEMULTIPLEPRODUCTS;

  return api.post(url, { modificationArray:arrayOfModificationObjects }).then(
    (response) => {
      if (response.data.status === "success") {
        return response.data.modifiedProductDocumentIds;
      } else {
        return [];
      }
    }
  ).catch(
    (error) => {
      console.log(error);
      return [];
    }
  );
}
export const useDeleteOneProductAPI=async (productDocumentId:any)=>{
  const url = apiConfig.POST.UPDATEONEPRODUCT;

  return api.post(url, { productDocumentId: productDocumentId }).then(
    (response) => {
      if (response.data.status === "success") {
        return true;
      } else {
        return false;
      }
    }
  ).catch(
    (error) => {
      console.log(error);
      return false;
    }
  );
}