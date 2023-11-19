import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSignIn = () =>{
    googleSignIn()
    .then(result =>{
        console.log(result.user);
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(res =>{
            console.log(res.data);
            navigate('/')
        })
    })
  }
  return (
    <div>
      <button onClick={handleSignIn} className="btn bg-transparent border-none">
        <FaGoogle className="text-2xl"></FaGoogle>
        <p className="-ml-2">oogle</p>
      </button>
    </div>
  );
};

export default SocialLogin;
