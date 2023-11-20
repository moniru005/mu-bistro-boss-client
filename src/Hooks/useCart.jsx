import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axios = useAxiosSecure();
  const {user} = useAuth();

  const {data: carts = [], refetch } = useQuery({
    queryKey: ['carts', user],
    queryFn: async () => {
      const res = await axios.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });
  return [carts, refetch];
};

export default useCart;
