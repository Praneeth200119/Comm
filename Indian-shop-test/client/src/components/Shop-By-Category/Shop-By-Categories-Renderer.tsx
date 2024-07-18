import React, { useState, useEffect } from "react";
import { Grid, Typography, Container, Link } from "@material-ui/core";
import CategoryCardRenderer from "./Category-Card-Renderer";
import { shopByCategory } from "./Shop-By-Category.styles";
import {
  useGetAllCategoriesAPI,
  useCategoriesAPI,
} from "./../../api/productsAPI";
import { useNavigate } from "react-router-dom";

const ShopByCategoriesRenderer: React.FC = () => {
  const navigate = useNavigate();
  const classes = shopByCategory();
  const [categories, setCategories] = useState<any[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    // const response = await useGetAllCategoriesAPI();
    const response = await useCategoriesAPI();
    // const data = await response.data;
    setCategories(response);
  };
  const handleCategoryShop = (category: any) => {
    // console.log(category.category.CAT_ID);
    navigate(`/productList/category/${category.category.CAT_ID}`);
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Typography variant="h4" className={classes.mainTitle} gutterBottom>
          Shop By Categories
        </Typography>
        <Grid container spacing={2}>
          {categories.slice(0, showMore ? 12 : categories.length).map((category) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2}
                onClick={() => {
                  handleCategoryShop({ category });
                }}
                style={{ cursor: "pointer" }}
              >
                <CategoryCardRenderer data={category} />
              </Grid>
            );
          })}
          {categories.length > 12 && (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ cursor: "pointer" }}
            >
              <Link
                color="primary"
                style={{ float: "right" }}
                onClick={handleShowMore}
              >
                {showMore ? "Show more" : "Show less"}
              </Link>
            </Grid>
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default ShopByCategoriesRenderer;
