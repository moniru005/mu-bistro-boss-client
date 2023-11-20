import { NavLink, Outlet } from "react-router-dom";
import {
  FaBook,
  FaCalendarAlt,
  FaHome,
  FaList,
  FaReceipt,
  FaShopify,
  FaShoppingCart,
  FaStarHalfAlt,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { LuContact, LuMenu } from "react-icons/lu";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();

  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div className="w-64 min-h-full bg-orange-400">
        <ul className="menu p-4 gap-y-2 text-base">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList /> Manage Items
                </NavLink>
              </li>
              
              <li>
                <NavLink to="/dashboard/manageBookings">
                  <FaBook />
                  Manage Bookings
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/users">
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="">
                <NavLink to="/dashboard/userHome">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/reservation">
                  <FaReceipt /> Reservation
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/paymentHistory">
                  <GiMoneyStack /> Payment History
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart /> My Cart ({cart.length})
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/review">
                  <FaStarHalfAlt />
                  Add Review
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/booking">
                  <FaCalendarAlt /> My Booking
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}
          <div className="divider"></div>

          <li className="">
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/order/salad">
              <LuMenu />
              Menu
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/shop">
              <FaShopify />
              Shop
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/contact">
              <LuContact />
              Contact
            </NavLink>
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
