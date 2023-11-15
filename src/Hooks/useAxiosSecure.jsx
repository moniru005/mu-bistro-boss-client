import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-server-blond-theta.vercel.app/",
});

const useAxiosSecure = () => {
  return axiosSecure;
};
export default useAxiosSecure;
