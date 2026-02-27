import { CONFIG } from "./config.js";

export async function callAPI(params){
  const res = await fetch(CONFIG.WEB_APP + params);
  return res.json();
}
