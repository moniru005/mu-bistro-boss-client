
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";



const FoodCard = ({item}) => {
    const {name, image, price, recipe, _id} = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axios = useAxiosSecure();
    const [, refetch] = useCart();


    const handleAddToCart = () =>{
      if(user && user.email){
        const cartItem = {
          menuId: _id,
          email: user.email,
          name, image, price
        }

        axios.post('/carts', cartItem)
        .then(res => {
          console.log(res.data);
          if(res.data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${name} added to your cart`,
              showConfirmButton: false,
              timer: 1500
            });
            //refetch cart to update the cart items count
            refetch();

          }
        })

      }
      else{
        Swal.fire({
          title: "You are not Logged in",
          text: "Please login to add to the cart!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Login!"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', {state: {from: location}})
          }
        });
      }
    }
  return (
    <div className="card w-96 lg:w-80 bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4">$ {price}</p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
        <Link to={``}>
        <button 
        onClick={handleAddToCart} 
        className="btn btn-outline bg-slate-200 border-orange-400 border-0 border-b-4 mt-4">
          Add to Cart
        </button>
      </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
