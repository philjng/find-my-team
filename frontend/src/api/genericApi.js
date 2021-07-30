import axios from "axios";

let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = "/api";
} else {
  baseURL = "https://find-my-team.herokuapp.com";
}

export const genericApi = axios.create({
  baseURL: baseURL,
});
