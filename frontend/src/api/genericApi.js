import axios from "axios";

//Comment back when .env file is figured out

let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3001";
} else {
  baseURL = "https://find-my-team.herokuapp.com";
}
// let baseURL = "http://localhost:3001";

export const genericApi = axios.create({
  baseURL: baseURL,
});
