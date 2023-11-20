import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-server-blond-theta.vercel.app/",
});

const useAxiosSecure = () => {
  const {logOut} = useAuth();
  const navigate = useNavigate();
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token')
    // console.log('request stopped by interceptors', token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function(error){
    //do something request error
    return Promise.reject(error);
  })

  //intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async(error) => {
    const status = error.response.status
    // console.log('status error in the interceptor', status); 
    if(status === 401 || status === 403){
      await logOut();
      navigate('/login')
    }
    return Promise.reject(error);
  });
  return axiosSecure;
};
export default useAxiosSecure;
