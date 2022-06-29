import { User } from "~/interfaces/user";
import { http } from "~/lib/http";
import { MutationFn } from "~/utils/query";
import { LoginDto, RegisterDto } from "./schemas";

export const profile = async () => {
  const { data } = await http.get<User>("/auth/profile");
  return data;
};

type LoginToken = {
  accessToken: string;
};
export const login: MutationFn<LoginToken, LoginDto> = async (input) => {
  const { data } = await http.post<LoginToken>("/auth/login", input);
  return data;
};

export const register: MutationFn<User, RegisterDto> = async (input) => {
  const { confirmPassword, ...registerData } = input;

  const { data } = await http.post<User>("/auth/register", registerData);
  return data;
};

export const logout: MutationFn = async () => {
  /** noop logout mutation fn */
};
