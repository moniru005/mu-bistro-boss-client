import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "bistro-boss-server-blond-theta.vercel.app/",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
