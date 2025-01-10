import client from ".";
import { SigninFormData, SignupFormData } from "../types/auth";
import { convertJsonToFormData } from "../utils/formData";

export const signUp = async (data: SignupFormData) => {
  const formData = convertJsonToFormData(data);
  const reqParams = new URLSearchParams(data);
  const response = await client.post("/auth/register?" + reqParams, formData);
  if (response.data?.data?.token) {
    localStorage.setItem("token", response.data.data.token);
  }
};

export const signIn = async (data: SigninFormData) => {
  const formData = convertJsonToFormData(data);
  const reqParams = new URLSearchParams(data);
  const response = await client.post("/auth/login?" + reqParams, formData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
};

export const getUserData = async () => {
  try {
    const response = await client.get("/test-auth");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};
