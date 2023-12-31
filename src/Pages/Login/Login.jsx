import { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import image1 from "../../assets/others/authentication1.png";


import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisables] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from.pathname || "/";
  console.log("state in the location login page", location.state);

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged In",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    // console.log(value);
    if (validateCaptcha(user_captcha_value) === true) {
      setDisables(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col md:flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-center">Login now!</h1>
            <img src={image1} alt="" />
            
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  ref={captchaRef}
                  placeholder="Type the captcha above"
                  className="input input-bordered"
                  
                />
                <button
                  onClick={handleValidateCaptcha}
                  className="btn btn-outline btn-xs mt-4"
                >
                  Validate
                </button>
              </div>
              <div className="form-control mt-6">
                <button disabled={false} className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
            <p className="flex mx-auto">
              New here?
              <Link className="ml-2 text-yellow-600" to="/signUp">
                Create an Account
              </Link>
            </p>
            <div className="divider uppercase text-xs font-medium">Social Login</div>
            <div className="pb-6 mx-auto">
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
