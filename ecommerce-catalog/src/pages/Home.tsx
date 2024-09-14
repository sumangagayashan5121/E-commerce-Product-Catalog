import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import useCategories from "../hooks/useCategories";
import useProducts from "../hooks/useProducts";
import { FilterFormValues } from "../types/products";
const placeholderImage =
  "https://via.placeholder.com/300x300?text=No+Image&color=grey";

const defaultFilters: FilterFormValues = {
  category: "",
  minPrice: "",
  maxPrice: "",
  search: "",
};

const Home = () => {
  const [filters, setFilters] = useState<FilterFormValues>(defaultFilters);
  const [page, setPage] = useState(1);
  const { categories, error: categoriesError } = useCategories();
  console.log(categories);

  const { products, loading, totalPages, error } = useProducts(filters, page);

  const onSubmitFilters = (newFilters: FilterFormValues) => {
    console.log(newFilters);
    setFilters(newFilters);
    setPage(1);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container style={{ marginTop: 50, marginBottom: 50 }} maxWidth="lg">
      <Box mb={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Product List
        </Typography>
      </Box>
      <Box mb={4} textAlign="right">
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/add"
          sx={{ mb: 3 }}
        >
          Create New Product
        </Button>
      </Box>

      <FilterSection
        onSubmit={onSubmitFilters}
        handleReset={handleReset}
        categories={categories}
      />

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: 3,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={placeholderImage}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/products/${product.id}`}
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Home;
