import { CONFIG } from "./config.js";

export function generateToken(code){
  return btoa(code + CONFIG.SECRET_KEY);
}
