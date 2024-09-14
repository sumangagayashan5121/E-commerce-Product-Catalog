import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useProductDetail from "../hooks/useProductDetail";
const placeholderImage =
  "https://via.placeholder.com/300x300?text=No+Image&color=grey";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, error } = useProductDetail(id);

  if (loading) {
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={placeholderImage}
            // alt={product?.name}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "12px",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: "none",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {product?.name}
              </Typography>

              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "#1976d2",
                  color: "white",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  mb: 3,
                  fontWeight: "bold",
                }}
              >
                ${product?.price}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Additional Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product?.description}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
