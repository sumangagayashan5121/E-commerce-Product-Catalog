import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useCategories from "../hooks/useCategories";
import { IResponse } from "../types/response";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .number()
    .min(0, "Price must be greater than 0")
    .or(z.string().regex(/^\d*$/)),
  description: z.string().min(1, "Description is required"),
  category: z.number().min(1, "Category is required"),
});

type FormData = z.infer<typeof schema>;

const AddProduct = () => {
  const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
  const { categories, error: categoriesError } = useCategories();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<IResponse<null>>(
        `${BASE_API_URL}/api/products`,
        data,
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.status) {
        navigate("/");
      } else {
        setError(response.data.message || "Failed to add product");
      }
    } catch (err) {
      setError("Failed to add product");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
              required
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              type="number"
              {...field}
              error={!!errors.price}
              helperText={errors.price?.message}
              required
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              {...field}
              error={!!errors.description}
              helperText={errors.description?.message}
              required
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              margin="normal"
              label="Category"
              {...field}
              error={!!errors.category}
              helperText={errors.category?.message}
              required
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
