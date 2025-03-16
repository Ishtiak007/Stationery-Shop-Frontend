import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  role: "admin" | "user";
  exp: number;
}

export const verifyToken = (token: string): DecodedToken => {
  return jwtDecode(token);
};
