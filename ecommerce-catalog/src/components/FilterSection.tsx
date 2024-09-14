import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Category } from "../types/category";
import { FilterFormValues } from "../types/products";

interface FilterSectionProps {
  onSubmit: (data: FilterFormValues) => void;
  handleReset: () => void;
  categories: Category[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  onSubmit,
  handleReset,
  categories,
}) => {
  const { control, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: {
      category: "",
      minPrice: "",
      maxPrice: "",
      search: "",
    },
  });

  return (
    <Box mb={4} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Category"
              {...field}
              value={field.value || ""}
              onChange={(e) => field.onChange(Number(e.target.value) || "")}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="minPrice"
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              label="Min Price"
              {...field}
              sx={{ minWidth: 200, mx: 2 }}
            />
          )}
        />

        <Controller
          name="maxPrice"
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              label="Max Price"
              {...field}
              sx={{ minWidth: 200 }}
            />
          )}
        />
      </Box>

      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <TextField label="Search" variant="outlined" {...field} fullWidth />
        )}
      />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="outlined" onClick={handleReset} sx={{ mr: 2 }}>
          Reset
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
};

export default FilterSection;
