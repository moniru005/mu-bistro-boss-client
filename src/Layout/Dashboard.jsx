import { NavLink, Outlet } from "react-router-dom";
import { FaCalendarAlt, FaHome, FaReceipt, FaShopify, FaShoppingCart, FaStarHalfAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { LuContact, LuMenu } from "react-icons/lu";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart();
  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div className="w-64 min-h-full bg-orange-400">
        <ul className="menu p-4 gap-y-2 text-base">
          <li className="">
            <NavLink to="/dashboard/userHome"><FaHome/>User Home</NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/reservation"><FaReceipt/>Reservation</NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/payment"><GiMoneyStack/>Payment History</NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/cart"><FaShoppingCart/>My Cart ({cart.length})</NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/review"><FaStarHalfAlt/>Add Review</NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/booking"><FaCalendarAlt/>My Booking</NavLink>
          </li>
          <div className="divider"></div> 

          <li className="">
            <NavLink to="/dashboard/userHome"><FaHome/>Home</NavLink>
          </li>
          <li className="">
            <NavLink to="/order/salad"><LuMenu/>Menu</NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/shop"><FaShopify/>Shop</NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/contact"><LuContact/>Contact</NavLink>
          </li>

        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
