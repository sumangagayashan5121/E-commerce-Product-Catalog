import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import useLogin from "../hooks/useLogin";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof schema>;

const Login = () => {
  const { handleLogin, showPassword, handleClickShowPassword, generalError } =
    useLogin();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <Button onClick={handleClickShowPassword}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                ),
              }}
            />
          )}
        />
        {generalError && <Typography color="error">{generalError}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
