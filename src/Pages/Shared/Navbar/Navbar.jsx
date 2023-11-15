import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import { FaShoppingCart } from 'react-icons/fa';
import { LuMenu } from 'react-icons/lu';
import  './Navbar.css';
import useCart from "../../../Hooks/useCart";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("Logout successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const navOptions = (
    <>
      <div className="flex flex-col lg:flex-row md:flex-row items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/menu">Our Menu</Link>
        </li>
        <li>
          <Link to="/order/salad">Order Food</Link>
        </li>
        <li>
          <Link to="/dashboard/cart">
            <p className=" flex flex-row gap-2 bg-transparent lg:text-white border-none hover:text-black">
              <FaShoppingCart className="text-xl"></FaShoppingCart>
              <div className="badge badge-secondary">{cart.length}</div>
            </p>
          </Link>
        </li>
      

      {user ? (
        <>
          <div className="flex flex-row gap-2 items-center">
          <span>{user?.displayName}</span>
          <button className="btn btn-sm bg-transparent border-none text-white hover:text-slate-900" onClick={handleLogOut}>Logout</button>
          </div>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
      </div>
    </>
  );

  return (
    <>
      <div className="navbar fixed  z-10 bg-opacity-30  mx-auto max-w-screen-lg bg-black text-white justify-center items-center">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <LuMenu className="text-2xl"></LuMenu>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" menu menu-horizontal px-1">
            {navOptions}
            </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
