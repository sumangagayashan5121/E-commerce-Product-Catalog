import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { login as loginAction } from "../store/authSlice";
import { IResponse } from "../types/response";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const useLogin = () => {
  const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const response = await axios.post<IResponse<{ token: string }>>(
        `${BASE_API_URL}/api/auth/login`,
        data
      );

      const resData = response.data;

      if (resData.status) {
        const { token } = resData.data;
        dispatch(loginAction(token));
        navigate("/", { replace: true });
      } else {
        setGeneralError(resData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setGeneralError("Invalid credentials. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return {
    handleLogin,
    showPassword,
    handleClickShowPassword,
    generalError,
  };
};

export default useLogin;
